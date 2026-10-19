import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { Timeline } from "@/components/home/timeline";
import { ContentContainer } from "@/components/layout/content-container";
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
        <Timeline />
      </ContentContainer>
    </PageContainer>
  );
}
