import { MailIcon } from "lucide-react";
import { cacheLife } from "next/cache";
import { useTranslations } from "next-intl";
import { contentWidthClassName } from "@/components/layout/content-container";
import { SocialIcon } from "@/components/social-icon";
import { buttonVariants } from "@/components/ui/button";
import { email, github, linkedin } from "@/constants/contact";
import { cn } from "@/lib/utils";

const linkClassName = buttonVariants({ variant: "nav", size: "bare" });

// Cached since Cache Components won't prerender a bare `new Date()`
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer
      className={cn(
        contentWidthClassName,
        "flex items-center justify-between pb-8 text-muted-foreground text-sm",
      )}
    >
      <p>
        © <CurrentYear /> Daniel Moura
      </p>
      <div className="flex items-center gap-4">
        {[linkedin, github].map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={linkClassName}
          >
            <SocialIcon icon={icon} />
          </a>
        ))}
        <a
          href={`mailto:${email}`}
          aria-label={t("email")}
          className={linkClassName}
        >
          <MailIcon />
        </a>
      </div>
    </footer>
  );
}
