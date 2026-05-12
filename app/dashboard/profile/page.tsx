import type { Metadata } from "next";
import { Suspense } from "react";
import { verifySession } from "@/app/lib/dal";
import { db } from "@/app/lib/db";
import { logout } from "@/app/actions/auth";
import { NameForm } from "./_components/name-form";

export const metadata: Metadata = {
  title: "Профиль",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-lg">
      <h1 className="text-3xl font-semibold">Профиль</h1>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileData />
      </Suspense>
    </div>
  );
}

async function ProfileData() {
  const { userId } = await verifySession();
  const user = await db.user.findUnique({ where: { id: userId } });

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Имя</span>
          <NameForm currentName={user?.name ?? null} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Email</span>
          <span className="text-sm">{user?.email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-500 uppercase tracking-wide">Город</span>
          <span className="text-sm">{user?.city ?? "—"}</span>
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
    </>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="h-3 w-16 rounded bg-black/10 dark:bg-white/10" />
          <div className="h-9 w-full rounded-lg bg-black/5 dark:bg-white/5" />
        </div>
      ))}
    </div>
  );
}
