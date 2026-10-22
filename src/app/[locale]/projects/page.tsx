import { useTranslations } from "next-intl";
import { BackToTop } from "@/components/layout/back-to-top";
import { ContentContainer } from "@/components/layout/content-container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { ProjectTimeline } from "@/components/projects/project-timeline";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Projects() {
  const t = useTranslations("FeaturedProjects");

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <div className="flex flex-col gap-12">
          <hgroup className="flex flex-col gap-6">
            <PageTitle>{t("allProjects")}</PageTitle>
            <p className="text-muted-foreground [text-box:trim-both_cap_alphabetic]">
              {t("allProjectsSubtitle")}
            </p>
          </hgroup>
          <ProjectTimeline />
        </div>
      </ContentContainer>
      <Footer />
      <BackToTop />
    </PageContainer>
  );
}
