"use client";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

const inputCls =
  "rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 w-full";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    login,
    undefined
  );

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="email" name="email" placeholder="Email" required className={inputCls} />
      <input type="password" name="password" placeholder="Пароль" required className={inputCls} />
      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm font-medium transition-colors hover:opacity-80 disabled:opacity-50"
      >
        {pending ? "Вход..." : "Войти"}
      </button>
    </form>
  );
}
