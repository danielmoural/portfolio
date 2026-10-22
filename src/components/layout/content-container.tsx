import { cn } from "@/lib/utils";

// Shared with the footer so it lines up with the content column
export const contentWidthClassName = "mx-auto w-full lg:w-[65vw]";

export function ContentContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      // Grows on short pages, keeping the footer after it at the bottom
      className={cn(
        contentWidthClassName,
        "flex flex-1 flex-col gap-24",
        className,
      )}
      {...props}
    />
  );
}
