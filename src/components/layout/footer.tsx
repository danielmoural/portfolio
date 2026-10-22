import { cacheLife } from "next/cache";
import { SocialLinks } from "@/components/social-links";

// Cached since Cache Components won't prerender a bare `new Date()`
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="flex items-center justify-between pb-8 text-muted-foreground text-sm">
      <p>
        © <CurrentYear /> Daniel Moura
      </p>
      <SocialLinks />
    </footer>
  );
}
