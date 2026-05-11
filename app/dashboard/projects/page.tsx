import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Проекты</h1>
        <button className="rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium transition-colors hover:opacity-80">
          + Новый проект
        </button>
      </div>
      <p className="text-zinc-500 dark:text-zinc-400">
        Проекты появятся здесь.
      </p>
    </div>
  );
}
