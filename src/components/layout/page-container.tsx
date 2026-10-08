import { cn } from "@/lib/utils";

export function PageContainer({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("mx-auto flex w-[90%] flex-col md:w-[70%]", className)}
      {...props}
    />
  );
}
