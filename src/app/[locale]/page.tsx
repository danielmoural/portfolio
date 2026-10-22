import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { BackToTop } from "@/components/layout/back-to-top";
import { ContentContainer } from "@/components/layout/content-container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageContainer } from "@/components/layout/page-container";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function Home() {
  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <Hero />
        <FeaturedProjects />
      </ContentContainer>
      <Footer />
      <BackToTop />
    </PageContainer>
  );
}
