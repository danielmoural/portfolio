import { cn } from "@/lib/utils";

export function PageContainer({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "mx-auto flex min-h-svh w-[90%] flex-col gap-24",
        className,
      )}
      {...props}
    />
  );
}
