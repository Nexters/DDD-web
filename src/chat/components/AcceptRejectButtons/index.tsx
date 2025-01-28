import { css } from "styled-components";
import ChipButton from "../ChipButton";

type Props = {
  onAccept: () => void;
  onReject: () => void;
};

export default function AcceptRejectButtons({ onAccept, onReject }: Props) {
  return (
    <div
      css={css`
        display: flex;
        gap: 8px;
      `}
    >
      <ChipButton label="좋아 타로 볼래" color="primary02" onClick={onAccept} />
      <ChipButton label="아니 얘기 더 들어봐" color="grey30" onClick={onReject} />
    </div>
  );
}
