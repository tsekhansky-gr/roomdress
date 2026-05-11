import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Дашборд",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-3xl font-semibold">Обзор</h1>
      <Suspense fallback={<p className="text-zinc-500">Загрузка проектов...</p>}>
        <ProjectList />
      </Suspense>
    </div>
  );
}

async function ProjectList() {
  return (
    <section>
      <p className="text-zinc-500 dark:text-zinc-400">Проекты появятся здесь.</p>
    </section>
  );
}
