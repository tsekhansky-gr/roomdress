"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Обзор" },
  { href: "/dashboard/projects", label: "Проекты" },
  { href: "/dashboard/settings", label: "Настройки" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={[
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-black/10 dark:bg-white/10 text-foreground"
                : "text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground",
            ].join(" ")}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
