import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { underlinedLinkClassName } from "@/components/home/external-link";
import { ProjectList } from "@/components/projects/project-list";
import { projects } from "@/constants/projects";
import { Link } from "@/i18n/navigation";

export function FeaturedProjects() {
  const t = useTranslations("FeaturedProjects");

  return (
    <section id="projects" className="flex flex-col gap-8">
      <h2 className="font-bold text-2xl text-primary">{t("title")}</h2>
      <ProjectList
        variant="featured"
        titleAs="h3"
        items={projects.filter((project) => project.featured)}
      />
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
