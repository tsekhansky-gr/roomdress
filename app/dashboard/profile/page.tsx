import type { Metadata } from "next";
import { verifySession } from "@/app/lib/dal";
import { db } from "@/app/lib/db";
import { logout } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Профиль",
};

export default async function ProfilePage() {
  const { userId } = await verifySession();
  const user = await db.user.findUnique({ where: { id: userId } });

  return (
    <div className="flex flex-col gap-8 p-8 max-w-lg">
      <h1 className="text-3xl font-semibold">Профиль</h1>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Имя</span>
          <span className="text-sm">{user?.name ?? "—"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Email</span>
          <span className="text-sm">{user?.email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Аккаунт создан</span>
          <span className="text-sm">
            {user?.createdAt.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </section>

      <form action={logout}>
        <button
          type="submit"
          className="rounded-full border border-black/15 dark:border-white/15 px-5 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:border-black/30 dark:hover:border-white/30 hover:text-foreground transition-colors"
        >
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
