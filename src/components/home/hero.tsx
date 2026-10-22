import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tilt } from "@/components/home/tilt";
import { buttonVariants } from "@/components/ui/button";

const email = "contact@danielmoura.dev";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/danielmoural",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/danielmoural",
    icon: "linkedin",
  },
] as const;

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="about" className="flex flex-col gap-8 py-6 text-justify">
      <div className="flex flex-col-reverse items-center gap-12 md:flex-row">
        <div className="flex flex-1 flex-col gap-8">
          <h1 className="font-bold text-4xl text-primary">Daniel Moura</h1>
          <p>
            {t.rich("intro", {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </p>
          <p>{t("bio")}</p>
        </div>
        <Tilt className="relative size-48 shrink-0 overflow-hidden rounded-full shadow-2xl shadow-black/45 md:size-64">
          {/* Hairline drawn over the photo's own edge, separating it from the dot pattern */}
          <Image
            src="/profile-picture.jpeg"
            alt="Daniel Moura"
            fill
            priority
            sizes="(min-width: 768px) 16rem, 12rem"
            className="rounded-full object-cover object-[46%_50%] outline-2 -outline-offset-2 outline-foreground/10"
          />
        </Tilt>
      </div>
      <div className="flex flex-col gap-3">
        <p>{t("findMe")}</p>
        <div className="flex gap-3">
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "link",
                size: "bare",
                // Bottom border instead of text-decoration so the line also
                // runs under the icon; muted, brightening to primary on hover
                className:
                  "gap-1.5 rounded-none pb-0.5 border-primary/40! border-b duration-300 hover:border-primary! hover:no-underline!",
              })}
            >
              {/* Masked so the logo follows the link's text color, hover included */}
              <span
                aria-hidden="true"
                className="size-4 bg-current mask-contain mask-center mask-no-repeat"
                style={{ maskImage: `url(/icons/${icon}-black.svg)` }}
              />
              {label}
              <ArrowUpRightIcon
                aria-hidden="true"
                className="-ml-0.5 size-3.5"
              />
            </a>
          ))}
        </div>
        <p>{t("mailMe", { email })}</p>
      </div>
    </section>
  );
}
