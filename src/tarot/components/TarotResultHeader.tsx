import HeaderContent from "@/shared/components/HeaderContent";
import styled from "styled-components";
import React from "react";
import ArrowLeft from "@/shared/assets/icons/arrow-left.svg";
import { useRouter } from "next/navigation";

const TarotResultHeader = () => {
  const router = useRouter();
  // const handleBackRouting=()=>{

  // }

  return (
    <HeaderContent startAction={<ArrowLeft onClick={() => router.back()} />}>
      <HeaderHeadText>타로결과</HeaderHeadText>
    </HeaderContent>
  );
};

export default TarotResultHeader;

const HeaderHeadText = styled.h1`
  color: ${({ theme }) => theme.colors.grey90};
  ${({ theme }) => theme.fonts.subHead3};
`;
