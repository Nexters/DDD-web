import React from "react";
import { Slot } from "@radix-ui/react-slot";
import styled, { css } from "styled-components";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "positive" | "negative" | "secondary";
  size?: "default" | "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={className} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export default Button;
