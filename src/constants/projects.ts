import type { Project } from "@/types/project";

// Stand-ins until real projects are written up: [year, contributors, featured]
const placeholders: [number, number, boolean][] = [
  [2025, 7, true],
  [2025, 0, true],
  [2024, 0, false],
  [2023, 3, false],
  [2023, 0, false],
  [2022, 0, false],
  [2021, 5, false],
  [2020, 0, false],
  [2019, 2, false],
  [2019, 0, false],
  [2018, 0, false],
];

export const projects: Project[] = [
  {
    id: "portfolio",
    description: "portfolio",
    title: "Portfolio",
    href: "https://github.com/danielmoural/portfolio",
    year: 2026,
    featured: true,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "next-intl"],
  },
  ...placeholders.map(
    ([year, people, featured], index): Project => ({
      id: `placeholder-${index}`,
      description: people ? "placeholderTeam" : "placeholderSolo",
      title: "[Project name]",
      href: "https://github.com/danielmoural",
      year,
      featured,
      tags: Array.from({ length: 3 + (index % 3) }, () => "[Tech]"),
      // No GitHub usernames, so no real person's avatar loads for a placeholder
      contributors: people
        ? Array.from({ length: people }, (_, n) => ({
            name: `[Name ${n + 1}]`,
          }))
        : undefined,
    }),
  ),
];
