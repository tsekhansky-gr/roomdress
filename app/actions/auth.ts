"use server";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { db } from "@/app/lib/db";
import { createSession, deleteSession } from "@/app/lib/session";

// ── Schemas ──────────────────────────────────────────────────────────────────

const LoginSchema = z.object({
  email: z.email({ error: "Введите корректный email." }),
  password: z.string().min(1, { error: "Введите пароль." }),
});

const SignupSchema = z.object({
  name: z.string().min(2, { error: "Имя должно быть не менее 2 символов." }).trim(),
  city: z.string().min(2, { error: "Укажите город." }).trim(),
  email: z.email({ error: "Введите корректный email." }),
  password: z.string().min(8, { error: "Пароль должен быть не менее 8 символов." }),
});

export type AuthState = { error?: string } | undefined;

// ── Login ─────────────────────────────────────────────────────────────────────

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors.email?.[0] ?? validated.error.flatten().fieldErrors.password?.[0] };
  }

  const { email, password } = validated.data;

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Неверный email или пароль." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

// ── Signup ────────────────────────────────────────────────────────────────────

export async function signup(_state: AuthState, formData: FormData): Promise<AuthState> {
  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    city: formData.get("city"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    return { error: Object.values(errors).flat()[0] as string };
  }

  const { name, city, email, password } = validated.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Этот email уже зарегистрирован." };
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await db.user.create({ data: { name, city, email, password: hashed } });

  await createSession(user.id);
  redirect("/dashboard");
}

// ── Logout ────────────────────────────────────────────────────────────────────

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}
