"use client";
import { useActionState } from "react";
import { updateCity, type ProfileState } from "@/app/actions/profile";

const inputCls =
  "rounded-lg border border-black/10 dark:border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-foreground/20 w-full";

export function CityForm({ currentCity }: { currentCity: string | null }) {
  const [state, action, pending] = useActionState<ProfileState, FormData>(
    updateCity,
    undefined
  );

  return (
    <form action={action} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          name="city"
          defaultValue={currentCity ?? ""}
          placeholder="Ваш город"
          required
          minLength={2}
          className={inputCls}
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-80 disabled:opacity-50"
        >
          {pending ? "..." : "Сохранить"}
        </button>
      </div>
      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600 dark:text-green-400">Город обновлён.</p>}
    </form>
  );
}
