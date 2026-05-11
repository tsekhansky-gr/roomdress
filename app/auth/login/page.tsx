import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Войти",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center">Вход в Roomdress</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            required
            className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
          <button
            type="submit"
            className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
          >
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
