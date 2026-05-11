import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Настройки",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-3xl font-semibold">Настройки</h1>
      <section className="flex flex-col gap-4 max-w-md">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Имя</label>
          <input
            type="text"
            placeholder="Ваше имя"
            className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            className="rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
        <button className="self-start rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-80">
          Сохранить
        </button>
      </section>
    </div>
  );
}
