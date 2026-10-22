import { ImageIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { ExternalLink } from "@/components/home/external-link";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Contributor, Project } from "@/types/project";

const maxAvatars = 3;
// Up to this many people are all named; past it, two names and "N others"
const maxNamed = 3;

// "featured" is the roomy home page section; "compact" is the projects page,
// with smaller thumbnails and tighter spacing
const variants = {
  featured: {
    list: "gap-10",
    article: "md:flex-row md:gap-8",
    image: "md:w-60",
    imageSizes: "(min-width: 768px) 15rem, 90vw",
    text: "gap-3 md:pt-1",
    description: "",
    tags: "pt-1",
    badge: "secondary",
  },
  compact: {
    list: "gap-8",
    article: "sm:flex-row sm:gap-6",
    image: "sm:w-44",
    imageSizes: "(min-width: 640px) 11rem, 90vw",
    text: "gap-2",
    description: "text-[0.9375rem]",
    tags: "pt-0.5",
    badge: "outline",
  },
} as const;

type ProjectListProps = {
  variant: keyof typeof variants;
  // Project titles sit one level below the heading of the page or section
  titleAs: "h2" | "h3";
  items: Project[];
};

export function ProjectList({
  variant,
  titleAs: Title,
  items,
}: ProjectListProps) {
  const t = useTranslations("FeaturedProjects");
  const styles = variants[variant];

  return (
    <ul className={cn("flex flex-col", styles.list)}>
      {items.map((project) => (
        <li key={project.id}>
          <article className={cn("flex flex-col gap-4", styles.article)}>
            {/* Not stretched, so a taller text column can't break the aspect ratio */}
            <ProjectImage
              project={project}
              sizes={styles.imageSizes}
              className={cn("w-full self-start", styles.image)}
            />
            <div
              className={cn(
                "flex min-w-0 flex-1 flex-col items-start",
                styles.text,
              )}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Title>
                  <ExternalLink href={project.href} className="text-base!">
                    {project.title}
                  </ExternalLink>
                </Title>
                {project.contributors && (
                  <BuiltWith
                    contributors={project.contributors}
                    contributorsUrl={project.contributorsUrl}
                  />
                )}
              </div>
              <p className={styles.description}>
                {t.rich(`projects.${project.description}.description`, {
                  highlight: (chunks) => (
                    <span className="text-primary">{chunks}</span>
                  ),
                })}
              </p>
              <ul
                aria-label={t("technologies")}
                // Pushed to the bottom, in line with the image's bottom edge
                // however short the description is
                className={cn("mt-auto flex flex-wrap gap-1.5", styles.tags)}
              >
                {project.tags.map((tag, index) => (
                  // Placeholder tags repeat, so the position keeps keys unique
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  <li key={`${tag}-${index}`}>
                    <Badge variant={styles.badge}>{tag}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

type ProjectImageProps = {
  project: Project;
  sizes: string;
  className?: string;
};

function ProjectImage({ project, sizes, className }: ProjectImageProps) {
  return (
    <div
      className={cn(
        "relative aspect-16/10 shrink-0 overflow-hidden rounded-lg border bg-muted",
        className,
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <ImageIcon aria-hidden="true" className="size-6" />
        </div>
      )}
    </div>
  );
}

type BuiltWithProps = {
  contributors: Contributor[];
  contributorsUrl?: string;
};

function BuiltWith({ contributors, contributorsUrl }: BuiltWithProps) {
  const t = useTranslations("FeaturedProjects");
  const format = useFormatter();

  const named =
    contributors.length > maxNamed ? contributors.slice(0, 2) : contributors;
  const others = contributors.length - named.length;
  const personClassName =
    "text-foreground transition-colors hover:text-primary";

  const people = named.map(({ name, github }) =>
    github ? (
      <a
        key={github}
        href={`https://github.com/${github}`}
        target="_blank"
        rel="noopener noreferrer"
        className={personClassName}
      >
        {name}
      </a>
    ) : (
      <span key={name} className="text-foreground">
        {name}
      </span>
    ),
  );
  if (others > 0) {
    const label = t("others", { count: others });
    people.push(
      contributorsUrl ? (
        <a
          key="others"
          href={contributorsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={personClassName}
        >
          {label}
        </a>
      ) : (
        <span key="others">{label}</span>
      ),
    );
  }

  return (
    <div className="flex items-center gap-2.5 text-muted-foreground text-sm">
      {/* Decorative, the names next to it say who they are */}
      <AvatarGroup aria-hidden="true">
        {contributors.slice(0, maxAvatars).map(({ name, github }) => (
          <Avatar key={github ?? name} size="sm">
            {github && (
              <AvatarImage
                src={`https://github.com/${github}.png?size=48`}
                alt=""
              />
            )}
            <AvatarFallback>
              <UserIcon className="size-3.5" />
            </AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>
      <p>
        {t("builtWith")} {format.list(people)}
      </p>
    </div>
  );
}
