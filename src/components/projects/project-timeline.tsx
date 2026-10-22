import { ProjectList } from "@/components/projects/project-list";
import { projects } from "@/constants/projects";
import type { Project } from "@/types/project";

function groupByYear(items: Project[]) {
  const groups = new Map<number, Project[]>();
  for (const project of items) {
    groups.set(project.year, [...(groups.get(project.year) ?? []), project]);
  }
  return [...groups].sort(([a], [b]) => b - a);
}

export function ProjectTimeline() {
  return (
    // The line runs down the left edge, from md up, behind each year's dot,
    // fading out over its last 6rem
    <ol className="relative flex flex-col gap-12 md:before:absolute md:before:inset-y-0 md:before:left-0 md:before:w-px md:before:bg-border md:before:[mask-image:linear-gradient(to_bottom,black_calc(100%-6rem),transparent)]">
      {groupByYear(projects).map(([year, items]) => (
        <li
          key={year}
          className="grid gap-4 md:grid-cols-[4.5rem_1fr] md:gap-12"
        >
          {/* Not stretched, so it has room to stick while its year's projects
              scroll past; the dot sits on the line and travels with it */}
          <h2 className="self-start text-muted-foreground text-sm md:sticky md:top-8 md:pl-5 md:before:absolute md:before:top-1/2 md:before:-left-[3px] md:before:size-[7px] md:before:-translate-y-1/2 md:before:rounded-full md:before:bg-primary">
            <time dateTime={String(year)}>{year}</time>
          </h2>
          <ProjectList variant="compact" titleAs="h3" items={items} />
        </li>
      ))}
    </ol>
  );
}
