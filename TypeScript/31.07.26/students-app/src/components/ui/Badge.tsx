import type { ReactNode } from "react";

type BadgeVariant = "grade" | "status" | "department" | "default";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
