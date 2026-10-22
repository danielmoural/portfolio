import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tilt } from "@/components/home/tilt";
import { BackToTop } from "@/components/layout/back-to-top";
import { ContentContainer } from "@/components/layout/content-container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function About() {
  const t = useTranslations("About");

  return (
    <PageContainer>
      <Header />
      <ContentContainer className="gap-8">
        <PageTitle>{t("title")}</PageTitle>
        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-start">
          <p className="flex-1">{t("placeholder")}</p>
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
      </ContentContainer>
      <Footer />
      <BackToTop />
    </PageContainer>
  );
}
