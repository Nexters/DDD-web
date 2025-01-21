import type { CSSProp } from 'styled-components';

/**
 * TypeScript 환경에서 css prop을 사용하기 위한 타입 선언
 * @see {@link https://styled-components.com/docs/api#usage-with-typescript}
 */
declare module 'react' {
  interface Attributes {
    css?: CSSProp | undefined;
  }
}
