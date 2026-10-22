import { ArrowRightIcon, ImageIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { type Messages, useFormatter, useTranslations } from "next-intl";
import {
  ExternalLink,
  underlinedLinkClassName,
} from "@/components/home/external-link";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

type Contributor = {
  name: string;
  github?: string;
};

type Project = {
  // Key of the project's description under FeaturedProjects.projects
  id: keyof Messages["FeaturedProjects"]["projects"];
  title: string;
  href: string;
  // Screenshot in public/; a placeholder box is shown until there is one
  image?: string;
  tags: string[];
  // Other people who worked on it, left out for solo projects
  contributors?: Contributor[];
  // Where "N others" leads, e.g. the repository's contributors graph
  contributorsUrl?: string;
};

const projects: Project[] = [
  {
    id: "portfolio",
    title: "Portfolio",
    href: "https://github.com/danielmoural/portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "next-intl"],
  },
  {
    id: "placeholderTeam",
    title: "[Project name]",
    href: "https://github.com/danielmoural",
    tags: ["[Tech]", "[Tech]", "[Tech]"],
    // No GitHub usernames, so no real person's avatar loads for a placeholder
    contributors: Array.from({ length: 7 }, (_, index) => ({
      name: `[Name ${index + 1}]`,
    })),
  },
  {
    id: "placeholderSolo",
    title: "[Project name]",
    href: "https://github.com/danielmoural",
    tags: ["[Tech]", "[Tech]", "[Tech]", "[Tech]"],
  },
];

const maxAvatars = 3;
// Up to this many people are all named; past it, two names and "N others"
const maxNamed = 3;

export function FeaturedProjects() {
  const t = useTranslations("FeaturedProjects");

  return (
    <section id="projects" className="flex flex-col gap-8">
      <h2 className="font-bold text-2xl text-primary">{t("title")}</h2>
      <ul className="flex flex-col gap-10">
        {projects.map((project) => (
          <li key={project.id}>
            <article className="flex flex-col gap-4 md:flex-row md:gap-8">
              {/* Not stretched, so a taller text column can't break the aspect ratio */}
              <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden rounded-lg border bg-muted md:w-60 md:self-start">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 768px) 15rem, 90vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground">
                    <ImageIcon aria-hidden="true" className="size-6" />
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-start gap-3 md:pt-1">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h3>
                    <ExternalLink href={project.href} className="text-base!">
                      {project.title}
                    </ExternalLink>
                  </h3>
                  {project.contributors && (
                    <BuiltWith
                      contributors={project.contributors}
                      contributorsUrl={project.contributorsUrl}
                    />
                  )}
                </div>
                <p>
                  {t.rich(`projects.${project.id}.description`, {
                    highlight: (chunks) => (
                      <span className="text-primary">{chunks}</span>
                    ),
                  })}
                </p>
                <ul
                  aria-label={t("technologies")}
                  // Pushed down to line up with the image's bottom edge
                  className="mt-auto flex flex-wrap gap-1.5 pt-1"
                >
                  {project.tags.map((tag, index) => (
                    // Placeholder tags repeat, so the position keeps keys unique
                    // biome-ignore lint/suspicious/noArrayIndexKey: static list
                    <li key={`${tag}-${index}`}>
                      <Badge variant="secondary">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Link
        href="/projects"
        className={underlinedLinkClassName("group self-start")}
      >
        {t("allProjects")}
        <ArrowRightIcon aria-hidden="true" />
      </Link>
    </section>
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
