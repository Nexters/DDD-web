import { ColorsTypes } from "@/shared/lib/styledComponents/theme";
import { ComponentProps } from "react";
import { css, useTheme } from "styled-components";

type Props = {
  label: string;
  color: keyof Pick<ColorsTypes, "primary02" | "grey30">;
} & ComponentProps<"button">;

export default function ChipButton({ label, color, ...restProps }: Props) {
  const theme = useTheme();

  const componentTheme = (() => {
    switch (color) {
      case "primary02":
        return {
          borderColor: theme.colors.primary02,
          color: theme.colors.primary03,
          font: theme.fonts.subHead3,
        };
      case "grey30":
        return {
          borderColor: theme.colors.grey30,
          color: theme.colors.grey90,
          font: theme.fonts.body3,
        };
      default:
        const _exhausted: never = color;
        throw new Error(`처리되지 않은 색상 타입입니다. ${_exhausted}`);
    }
  })();

  return (
    <button
      css={css`
        border: 1px solid ${componentTheme.borderColor};
        padding: 8px 12px;
        border-radius: 60px;
        ${componentTheme.font}
        color: ${componentTheme.color};
      `}
      {...restProps}
    >
      {label}
    </button>
  );
}
