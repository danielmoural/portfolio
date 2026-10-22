import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "@/components/home/external-link";
import { Tilt } from "@/components/home/tilt";

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
    <section
      id="about"
      className="flex flex-col-reverse items-center gap-12 text-justify md:flex-row md:items-start"
    >
      {/* Text boxes trimmed to cap height and baseline, so line-height adds
          nothing to the gaps and the name's letters start at the photo's top */}
      <div className="flex flex-1 flex-col gap-12 [&_:is(h1,p)]:[text-box:trim-both_cap_alphabetic]">
        <h1 className="font-bold text-4xl text-primary">Daniel Moura</h1>
        <div className="flex flex-col gap-8">
          <p>
            {t.rich("intro", {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </p>
          <p>{t("bio")}</p>
          <div className="flex flex-col gap-3">
            <p>{t("findMe")}</p>
            <div className="flex gap-3">
              {socials.map(({ label, href, icon }) => (
                <ExternalLink key={label} href={href}>
                  {/* Masked so the logo follows the link's text color, hover included */}
                  <span
                    aria-hidden="true"
                    className="size-4 bg-current mask-contain mask-center mask-no-repeat"
                    style={{ maskImage: `url(/icons/${icon}-black.svg)` }}
                  />
                  {label}
                </ExternalLink>
              ))}
            </div>
            <p>{t("mailMe", { email })}</p>
          </div>
        </div>
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
    </section>
  );
}
