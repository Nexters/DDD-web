import { css } from "styled-components";

export const theme = {
  fonts: {
    headline3: css`
      font-size: 28px;
      font-style: normal;
      font-weight: 700;
      line-height: 40px;
    `,
    headline2: css`
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 32px;
    `,
    headline1: css`
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
    `,
    subHead4: css`
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 26px;
    `,
    // 다지안 확인 대기
    subHead3: css`
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
    `,
    // 다지안 확인 대기
    subHead2: css`
      font-size: 15px;
      font-style: normal;
      font-weight: 700;
      line-height: 23px;
    `,
    subHead1: css`
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
    `,
    body4: css`
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
    `,
    body3: css`
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    `,
    body2: css`
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 23px;
    `,
    body1: css`
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    `,
    caption: css`
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
    `,
  },

  colors: {
    white: "#FFF",
    black: "#000",
    grey00: "#F6F8FA",
    grey10: "#EAEEF2",
    grey20: "#D0D7DE",
    grey30: "#AFB8C1",
    grey40: "#8C959F",
    grey50: "#6E7781",
    grey60: "#57606A",
    grey70: "#434A53",
    grey80: "#32383F",
    grey90: "#24292F",

    //변동 가능성 있음
    primary01: "#DEDBFF",
    primary02: "#B4ACFF",
    primary03: "#7A6DF0",
  },
};

export type ColorsTypes = typeof theme.colors;
export type FontsTypes = typeof theme.fonts;
