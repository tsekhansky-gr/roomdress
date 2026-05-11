import type { Metadata } from "next";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Войти",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center">Вход в Roomdress</h1>
        <LoginForm />
      </div>
    </main>
  );
}
