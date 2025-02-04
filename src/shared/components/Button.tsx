import React, { ReactNode } from "react";
import { ColorsTypes } from "../lib/styledComponents/theme";

import styled, { css } from "styled-components";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: keyof Pick<ColorsTypes, "grey70" | "grey10">;
  children: ReactNode;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, children, disabled, ...props }, ref) => {
    return (
      <BaseButton color={color} className={className} ref={ref} disabled={!!disabled} {...props}>
        {children}
      </BaseButton>
    );
  }
);
Button.displayName = "Button";

export default Button;

const BaseButton = styled.button<{
  color: keyof Pick<ColorsTypes, "grey70" | "grey10">;
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  user-select: none;
  vertical-align: top;
  text-align: center;

  width: 100%;
  border-radius: 8px;
  padding: 19px 27px;
  ${({ theme }) => theme.fonts.subHead2};
  ${({ theme, color }) => css`
    background-color: ${theme.colors[color]};
    color: ${color === "grey70" ? theme.colors.white : theme.colors.black};
  `}

  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;
