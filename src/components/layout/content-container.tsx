import { cn } from "@/lib/utils";

export function ContentContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col gap-16 lg:w-[60vw]",
        className,
      )}
      {...props}
    />
  );
}
