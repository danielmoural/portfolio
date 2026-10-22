import { MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SocialIcon } from "@/components/social-icon";
import { buttonVariants } from "@/components/ui/button";
import { email, github, linkedin } from "@/constants/contact";
import { cn } from "@/lib/utils";

const linkClassName = buttonVariants({ variant: "nav", size: "bare" });

export function SocialLinks({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const t = useTranslations("SocialLinks");

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {[linkedin, github].map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={linkClassName}
        >
          <SocialIcon icon={icon} className={iconClassName} />
        </a>
      ))}
      <a
        href={`mailto:${email}`}
        aria-label={t("email")}
        className={linkClassName}
      >
        <MailIcon className={iconClassName} />
      </a>
    </div>
  );
}
