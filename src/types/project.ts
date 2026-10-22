import type { Messages } from "next-intl";

export type Contributor = {
  name: string;
  github?: string;
};

export type Project = {
  id: string;
  // Key of the project's description under FeaturedProjects.projects
  description: keyof Messages["FeaturedProjects"]["projects"];
  title: string;
  href: string;
  // Groups the projects page timeline
  year: number;
  // Shown on the home page as well as the projects page
  featured?: boolean;
  // Screenshot in public/; a placeholder box is shown until there is one
  image?: string;
  tags: string[];
  // Other people who worked on it, left out for solo projects
  contributors?: Contributor[];
  // Where "N others" leads, e.g. the repository's contributors graph
  contributorsUrl?: string;
};
