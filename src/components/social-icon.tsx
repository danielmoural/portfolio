import { cn } from "@/lib/utils";
import type { SocialIconName } from "@/types/social";

export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialIconName;
  className?: string;
}) {
  return (
    // Masked so the logo follows the link's text color, hover included
    <span
      aria-hidden="true"
      className={cn(
        "size-4 bg-current mask-contain mask-center mask-no-repeat",
        className,
      )}
      style={{ maskImage: `url(/icons/${icon}-black.svg)` }}
    />
  );
}
