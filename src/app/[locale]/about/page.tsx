import { useTranslations } from "next-intl";
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
        <p>{t("placeholder")}</p>
      </ContentContainer>
      <Footer />
      <BackToTop />
    </PageContainer>
  );
}
