"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";

type MobileMenuProps = {
  label: string;
  links: { href: string; label: string }[];
};

export function MobileMenu({ label, links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="nav"
            size="bare"
            aria-label={label}
            className="sm:hidden"
          />
        }
      >
        {/* Shell command instead of a word, so it isn't translated */}
        [cd]
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-auto min-w-40 gap-0 p-1.5"
      >
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex gap-0.5 rounded-sm px-2 py-1.5 font-medium hover:text-primary"
              >
                <span aria-hidden="true">/</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
