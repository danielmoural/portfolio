import { cn } from "@/lib/utils";

export function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      // Trimmed to cap height and baseline like the home page's name, so the
      // gap below the header looks the same on every page
      className={cn(
        "font-bold text-4xl text-primary [text-box:trim-both_cap_alphabetic]",
        className,
      )}
      {...props}
    />
  );
}
