import Link from "next/link";
import { NavLinks } from "./_components/nav-links";

export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
  return (
    <div className="flex flex-1 min-h-0">
      <aside className="w-56 shrink-0 border-r border-black/10 dark:border-white/10 flex flex-col gap-6 p-4">
        <Link
          href="/dashboard"
          className="text-base font-semibold tracking-tight px-1"
        >
          Roomdress
        </Link>
        <NavLinks />
      </aside>
      <main className="flex flex-1 flex-col min-w-0 overflow-y-auto">
        {props.children}
      </main>
    </div>
  );
}
