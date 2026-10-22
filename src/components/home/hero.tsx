import { useTranslations } from "next-intl";
import { LocationCard } from "@/components/home/location-card";
import { SocialLinks } from "@/components/social-links";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      id="about"
      className="flex flex-col-reverse items-center gap-12 text-justify md:flex-row md:items-start"
    >
      {/* Text boxes trimmed to cap height and baseline, so line-height adds
          nothing to the gaps */}
      <div className="flex flex-1 flex-col gap-12 [&_:is(h1,p)]:[text-box:trim-both_cap_alphabetic]">
        {/* Icons sit on the name's baseline, about as tall as its lowercase
            letters, so they line up with the bulk of the name rather than
            its capitals */}
        <div className="flex items-baseline gap-6">
          <h1 className="font-bold text-4xl text-primary">Daniel Moura</h1>
          <SocialLinks
            className="text-muted-foreground"
            iconClassName="size-5"
          />
        </div>
        <div className="flex flex-col gap-8">
          <p>
            {t.rich("intro", {
              highlight: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </p>
          <p>{t("bio")}</p>
        </div>
      </div>
      <LocationCard
        // CARTO's basemap keys are meant for the browser; restrict it by domain
        apiKey={process.env.CARTO_API_KEY ?? ""}
        className="w-full shrink-0 md:w-72"
      />
    </section>
  );
}
