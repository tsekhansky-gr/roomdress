"use server";
import { redirect } from "next/navigation";
import * as z from "zod";
import { createSession, deleteSession } from "@/app/lib/session";

const LoginSchema = z.object({
  email: z.email({ error: "Введите корректный email." }),
  password: z.string().min(6, { error: "Пароль должен быть не менее 6 символов." }),
});

export type LoginState = { error?: string } | undefined;

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    return { error: Object.values(errors).flat()[0] as string };
  }

  const { email, password } = validated.data;

  // TODO: replace with DB lookup + bcrypt.compare
  const isValid = email === "test@roomdress.com" && password === "password123";

  if (!isValid) {
    return { error: "Неверный email или пароль." };
  }

  await createSession("user-1");
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/auth/login");
}
