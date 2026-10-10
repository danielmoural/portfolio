import { GlobeIcon } from "lucide-react";
import Link from "next/link";
import { ThemePicker } from "@/components/layout/theme-picker";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
];

export function SiteNav() {
  return (
    <nav aria-label="Main" className="flex items-center gap-5">
      <ul className="flex items-center gap-5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <ThemePicker />
      <Button variant="nav" size="bare" aria-label="Change language">
        <GlobeIcon />
      </Button>
    </nav>
  );
}
