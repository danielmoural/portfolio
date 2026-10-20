import { ArrowUpRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function underlinedLinkClassName(className?: string) {
  return buttonVariants({
    variant: "link",
    size: "bare",
    // Bottom border instead of text-decoration so the line also runs under
    // icons; muted, brightening to primary on hover
    className: cn(
      "gap-1.5 rounded-none pb-0.5 border-primary/40! border-b duration-300 hover:border-primary! hover:no-underline!",
      className,
    ),
  });
}

export function ExternalLink({
  className,
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={underlinedLinkClassName(className)}
      {...props}
    >
      {children}
      <ArrowUpRightIcon aria-hidden="true" className="-ml-0.5 size-3.5" />
    </a>
  );
}
