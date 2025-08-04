import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "text-neutral-500 flex h-10 w-full px-5 py-2 border-neutral-300 rounded-3xl border border-input bg-background text-sm md:text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
