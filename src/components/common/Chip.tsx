import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const chipVariants = cva(
  "inline-flex items-center justify-center h-[34px] px-3.5 rounded-full text-sm font-medium transition-colors cursor-pointer select-none whitespace-nowrap border-1.5",
  {
    variants: {
      variant: {
        default: "bg-grey-100 text-grey-700 border-transparent hover:bg-grey-200",
        active: "bg-primary-100 text-primary-700 border-primary-300 font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  active?: boolean;
}

export function Chip({ className, variant, active, ...props }: ChipProps) {
  return (
    <div
      className={cn(chipVariants({ variant: active ? "active" : variant, className }))}
      {...props}
    />
  );
}
