import type { Metadata } from "next";
import { SignupForm } from "./_components/signup-form";

export const metadata: Metadata = {
  title: "Регистрация",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-center">Создать аккаунт</h1>
        <SignupForm />
      </div>
    </main>
  );
}
