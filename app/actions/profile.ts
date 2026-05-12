"use server";
import * as z from "zod";
import { refresh } from "next/cache";
import { db } from "@/app/lib/db";
import { verifySession } from "@/app/lib/dal";

const NameSchema = z.object({
  name: z.string().min(2, { error: "Имя должно быть не менее 2 символов." }).trim(),
});

const CitySchema = z.object({
  city: z.string().min(2, { error: "Укажите город (мин. 2 символа)." }).trim(),
});

export type ProfileState = { error?: string; success?: boolean } | undefined;

export async function updateName(_state: ProfileState, formData: FormData): Promise<ProfileState> {
  const { userId } = await verifySession();

  const validated = NameSchema.safeParse({ name: formData.get("name") });
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors.name?.[0] };
  }

  await db.user.update({ where: { id: userId }, data: { name: validated.data.name } });

  refresh();
  return { success: true };
}

export async function updateCity(_state: ProfileState, formData: FormData): Promise<ProfileState> {
  const { userId } = await verifySession();

  const validated = CitySchema.safeParse({ city: formData.get("city") });
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors.city?.[0] };
  }

  await db.user.update({ where: { id: userId }, data: { city: validated.data.city } });

  refresh();
  return { success: true };
}
