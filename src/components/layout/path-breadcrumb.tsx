"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function PathBreadcrumb() {
  const segments = usePathname().split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-0 text-base text-foreground">
        <BreadcrumbItem>
          <BreadcrumbLink
            render={<Link href="/" />}
            className="text-primary hover:text-primary/40"
          >
            ~
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator className="mx-0.5">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href={href} />}
                  className="hover:text-primary"
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
        <BreadcrumbSeparator className="mx-0.5">/</BreadcrumbSeparator>
        <li className="ml-1 inline-flex items-center" aria-hidden="true">
          <span className="h-4 w-2 bg-primary motion-safe:animate-blink" />
        </li>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
