import ThirdPrize from "@/shared/assets/icons/third-prize.svg";
import FirstPrize from "@/shared/assets/icons/first-prize.svg";
import SecondPrize from "@/shared/assets/icons/second-prize.svg";
import styled from "styled-components";
interface PopularQuestionPrize {
  prize: number;
}

const PopularQuestionPrizeIcon = ({ prize }: PopularQuestionPrize) => {
  return (
    <>
      {prize === 1 ? (
        <FirstPrize />
      ) : prize === 2 ? (
        <SecondPrize />
      ) : prize === 3 ? (
        <ThirdPrize />
      ) : (
        <NumberStyle> {prize} </NumberStyle>
      )}
    </>
  );
};

export default PopularQuestionPrizeIcon;

const NumberStyle = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.fonts.subHead2};
  color: ${({ theme }) => theme.colors.grey70};
`;
