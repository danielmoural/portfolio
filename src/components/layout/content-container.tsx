import { cn } from "@/lib/utils";

export function ContentContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      // Grows on short pages, keeping the footer after it at the bottom
      className={cn(
        "mx-auto flex w-full flex-1 flex-col gap-24 lg:w-[65vw]",
        className,
      )}
      {...props}
    />
  );
}
