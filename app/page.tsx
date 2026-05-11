export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full text-center flex flex-col gap-8">
        <h1 className="text-5xl font-semibold tracking-tight">Roomdress</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          AI-платформа для дизайна интерьеров. Каркас инициализирован.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/dashboard"
            className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition-colors hover:opacity-80"
          >
            Открыть дашборд
          </a>
          <a
            href="/auth/login"
            className="rounded-full border border-black/10 dark:border-white/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          >
            Войти
          </a>
        </div>
      </div>
    </main>
  );
}
