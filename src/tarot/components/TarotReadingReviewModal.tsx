"use client";

import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState } from "react";
import { css } from "styled-components";
interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

enum ReviewScore {
  BAD = "0",
  NOT_BAD = "1",
  GOOD = "2",
}

export default function TarotReadingReviewModal({ isOpen, onOpenChange }: Props) {
  const [selectedReview, setSelectedReview] = useState<ReviewScore | undefined>(undefined);

  const handleReviewScoreChange = (value: ReviewScore) => {
    setSelectedReview(value);
  };

  const handleReviewClick = () => {
    // TODO: 리뷰 보내기
  };

  return (
    <Modal.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          css={css`
            display: flex;
            flex-direction: column;
            gap: 24px;
          `}
        >
          <div css={css``}>
            <Modal.Title
              css={css`
                margin-bottom: 4px;
              `}
            >
              답변이 어땠는지 알려주세요
            </Modal.Title>
            <Modal.Description
              css={css`
                color: ${({ theme }) => theme.colors.grey60};
                ${({ theme }) => theme.fonts.body1};
              `}
            >
              솔직한 리뷰를 선택해 주세요.
              <br />
              보내주신 리뷰는 타로냥 홈에 노출될 예정이에요.
            </Modal.Description>
          </div>

          <RadioGroup.Root
            value={selectedReview}
            onValueChange={handleReviewScoreChange}
            css={css`
              display: flex;
              gap: 8px;
              justify-content: center;

              & > [role="radio"] {
                display: flex;
                padding: 0px 10px 8px 10px;
                flex-direction: column;
                align-items: center;
                border-radius: 8px;
              }
              & > [role="radio"][data-state="checked"] {
                outline: 2px solid ${({ theme }) => theme.colors.primary03};
              }
              & > [role="radio"][data-state="unchecked"] {
                background-color: ${({ theme }) => theme.colors.grey10};
                opacity: 0.4;
              }
            `}
          >
            <RadioGroup.Item value={ReviewScore.BAD}>
              <CatEmoji />
              <p
                css={css`
                  ${({ theme }) => theme.fonts.body1};
                  color: ${({ theme }) => theme.colors.grey60};
                `}
              >
                별로
              </p>
            </RadioGroup.Item>
            <RadioGroup.Item value={ReviewScore.NOT_BAD}>
              <CatEmoji />
              <p
                css={css`
                  ${({ theme }) => theme.fonts.body1};
                  color: ${({ theme }) => theme.colors.grey60};
                `}
              >
                완전 만족
              </p>
            </RadioGroup.Item>{" "}
            <RadioGroup.Item value={ReviewScore.GOOD}>
              <CatEmoji />
              <p
                css={css`
                  ${({ theme }) => theme.fonts.body1};
                  color: ${({ theme }) => theme.colors.grey60};
                `}
              >
                완전 만족
              </p>
            </RadioGroup.Item>
          </RadioGroup.Root>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
            `}
          >
            <Modal.Close asChild>
              <Button
                type="button"
                color="grey70"
                onClick={handleReviewClick}
                css={css`
                  flex-shrink: initial;
                  height: 54px;
                `}
              >
                의견 보내기
              </Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Button
                type="button"
                color="grey10"
                css={css`
                  flex-shrink: initial;
                  height: 54px;
                `}
              >
                나중에 하기
              </Button>
            </Modal.Close>
          </div>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
}

const CatEmoji = () => {
  return (
    <svg width="61" height="60" viewBox="0 0 61 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1079_20782)">
        <path
          d="M20.8986 47.6074C20.8986 47.6074 10.559 44.309 12.0691 33.2509C12.0691 33.2509 12.618 26.2762 17.8471 21.6416C17.8471 21.6416 18.7928 12.2403 21.8828 11.5718C24.9728 10.9033 27.2019 19.0152 27.2019 19.0152L33.7039 18.3547C33.7039 18.3547 34.7471 10.635 37.8578 9.85485C41.2615 9.00564 42.6674 18.5536 42.6674 18.5536C42.6674 18.5536 49.3467 23.5821 50.1113 30.5999C51.267 41.1824 42.7668 45.3757 42.7668 45.3757C42.7668 45.3757 40.3123 47.3796 35.8045 48.4488"
          fill="#0D1926"
        />
        <path
          d="M34.0124 18.1843L34.3896 16.1803L35.0166 13.7852L35.9678 11.4507L38.137 10.2584L40.6232 11.0177L41.1596 13.7571L42.5136 16.1392L42.8696 18.6032L40.641 18.3534L38.6365 16.902L36.2032 17.513L34.0124 18.1843Z"
          fill="#EAEEF2"
        />
        <path
          d="M17.8305 21.1046L17.9813 18.8025L19.092 16.179L19.4492 13.2836L21.8425 12.0075L23.8973 12.4516L25.1638 14.5165L26.1645 16.7304L26.8923 18.7872L24.6515 19.3862L22.4202 20.4337L19.9811 20.6077L17.8305 21.1046Z"
          fill="#EAEEF2"
        />
        <path
          d="M42.3296 35.1255L41.4488 37.7423L39.6554 39.7764L37.4194 41.4175L34.7787 42.3491L32.0276 42.9712L29.2215 42.7188L26.4339 42.3709L23.8386 41.2532L21.6918 39.4062L20.968 36.7611L21.4337 34.1095L23.2636 32.0477L25.6324 30.6319L28.1863 29.4976L30.9672 29.1359L33.7722 29.0773L36.5102 29.6692L39.0181 30.8677L41.171 32.5901L42.3296 35.1255Z"
          fill="#EAEEF2"
        />
        <path
          d="M27.3727 29.1188C27.42 31.3279 25.0319 31.8469 23.1586 31.5911C21.2852 31.3353 19.6741 30.2375 20.1844 28.1372C20.6314 26.3009 22.1679 24.9514 24.0412 25.2072C26.0377 25.4798 27.33 27.1556 27.3727 29.1188Z"
          fill="white"
        />
        <path
          d="M43.0721 27.8064C43.0211 29.6968 40.6381 30.7781 38.7421 30.6882C36.4456 30.5764 35.4216 29.1716 35.7822 27.4489C36.2237 25.3337 38.173 23.9152 40.0517 24.1717C41.9304 24.4283 43.123 25.916 43.0728 27.8011L43.0721 27.8064Z"
          fill="white"
        />
        <path
          d="M33.655 31.1379L33.4904 31.5843L33.1504 31.9577L32.6928 32.1951L32.1993 32.3349L31.701 32.4304L31.2059 32.4228L30.7052 32.3762L30.2525 32.1781L29.8238 31.9233L29.6256 31.4982L29.7843 31.0946L30.1965 30.911L30.6233 30.7403L31.0805 30.6664L31.5442 30.6643L32.0196 30.5765L32.5072 30.5995L32.9899 30.5782L33.4197 30.7841L33.655 31.1379Z"
          fill="#0D1926"
        />
        <path
          d="M40.1029 26.7244L40.2059 27.2074L40.2579 27.7052L40.1907 28.1976L40.0125 28.664L39.7998 29.1038L39.3727 29.3563L38.8574 29.2968L38.3923 29.0697L38.0058 28.7062L37.7295 28.2541L37.5758 27.7424L37.3756 27.2516L37.3407 26.7889L37.3272 26.329L37.3686 25.8658L37.5417 25.4369L37.7033 25.0119L37.9109 24.6095L38.3255 24.448L38.7941 24.6102L39.2069 24.901L39.5287 25.2993L39.8247 25.7268L39.9745 26.2271L40.1029 26.7244Z"
          fill="black"
        />
        <path
          d="M25.7921 28.0918L25.7186 28.5507L25.5662 28.9879L25.3778 29.4092L25.1089 29.7814L24.7993 30.1317L24.4091 30.3946L23.9402 30.4342L23.5446 30.2166L23.2043 29.9139L23.0107 29.4949L22.93 29.0477L22.8379 28.6044L22.7969 28.1463L22.8323 27.6877L22.9654 27.2315L23.0083 26.7576L23.1989 26.3201L23.4048 25.8903L23.7212 25.53L24.1689 25.4058L24.6204 25.4129L25.0484 25.5531L25.3553 25.9004L25.5504 26.3087L25.7272 26.7308L25.814 27.1734L25.8925 27.6366L25.7921 28.0918Z"
          fill="black"
        />
        <path
          d="M21.1154 47.1406C20.4389 46.8246 19.7616 46.5141 19.0851 46.1981C18.9671 46.1439 18.8544 46.0903 18.7364 46.036C18.7311 46.0353 18.9405 46.1784 18.7472 46.0375C18.3896 45.7815 18.0069 45.5493 17.6371 45.3025C17.1615 44.9922 16.7098 44.707 16.2933 44.323L15.3643 43.4601C15.2052 43.3075 15.0462 43.155 14.8756 43.0063C14.8418 42.9744 14.8041 42.9311 14.7696 42.9046C14.4811 42.7016 15.0776 43.0447 14.8761 43.0827C14.77 43.1009 13.9081 41.2276 13.8138 41.0402C13.5501 40.5353 13.394 40.0015 13.2058 39.4633C13.0798 39.1081 12.9923 38.6708 12.8092 38.3351C12.6793 38.0883 12.8542 38.4448 12.815 38.5321C12.861 38.4348 12.8314 38.2127 12.8353 38.1042C12.8743 37.3789 12.9127 36.659 12.9464 35.933C12.9801 35.207 13.0189 34.4436 13.0555 33.6962C13.0839 33.0894 13.2521 32.4963 13.3768 31.9026C13.4888 31.3618 13.6016 30.8156 13.7136 30.2748L13.9749 29.0401C14.018 28.8443 14.0618 28.6431 14.0995 28.4465C14.1373 28.2499 14.1757 28.2879 14.1061 28.3983C14.7895 27.2267 15.3625 25.9855 15.9286 24.7543C16.0681 24.4517 16.346 24.0534 16.4074 23.7238C16.4488 23.5004 16.0879 23.9473 16.2815 23.8865C16.4127 23.8444 16.5592 23.69 16.6733 23.6129C17.2765 23.1882 17.9999 22.8017 18.537 22.3026C18.8241 22.0365 18.8273 21.6934 18.8824 21.3302L19.1116 19.8512C19.2107 19.205 19.343 18.5961 19.5002 17.9633C19.873 16.4712 20.1472 14.982 20.4137 13.47L20.1513 13.914C20.8478 13.2458 21.5449 12.5722 22.236 11.9033L21.5596 11.9854L23.8107 13.0288L23.4509 12.6689C24.0804 13.769 24.7006 14.8569 25.2707 15.9924C25.8407 17.128 26.1352 18.2859 26.4858 19.5115C26.567 19.7952 26.9263 19.9587 27.1988 19.9196C29.453 19.6222 31.7016 19.5258 33.9657 19.3552C34.2574 19.3351 34.5079 19.0585 34.5466 18.7748C34.6626 17.8856 34.7418 16.9859 34.8945 16.1071C35.0302 15.3133 35.3646 14.5411 35.4682 13.7428C35.5098 13.4378 35.2031 14.1265 35.4268 13.8462C35.5708 13.6696 35.6779 13.4444 35.8021 13.2541C36.0737 12.8223 36.3659 12.3988 36.6176 11.9534C36.6894 11.8269 36.5833 11.965 36.5453 12.0035C36.5954 11.9558 36.6555 11.9149 36.7103 11.8733C36.9171 11.7162 37.1193 11.553 37.3208 11.3951L38.31 10.6197L37.6336 10.7018L38.786 11.2463C39.0113 11.3534 39.2297 11.4704 39.4564 11.5668C39.5032 11.5841 39.5915 11.6561 39.6411 11.652C39.7396 11.6491 39.4373 11.4279 39.4591 11.5072C39.5063 11.7208 41.0324 13.6412 41.0949 13.6225C41.0202 13.6505 40.9417 13.0673 41.0025 13.6208L41.0846 14.4171C41.1351 14.9256 41.162 15.4472 41.2461 15.9494C41.3763 16.7523 41.865 17.566 42.1775 18.312C42.49 19.058 43.093 19.7128 43.586 20.3745C44.0791 21.0361 44.7648 21.6041 45.3659 22.1932C45.4189 22.244 45.6935 22.5487 45.5919 22.4149C45.4902 22.281 45.7439 22.6592 45.7886 22.7307C46.1063 23.1994 46.4247 23.6627 46.7423 24.1313C47.2011 24.8046 47.6111 25.5149 48.0455 26.2066C48.0772 26.2546 48.1081 26.3079 48.1389 26.3611C48.1968 26.4563 48.0207 26.1487 48.0988 26.2957C48.1946 26.4723 48.2905 26.649 48.3863 26.8256C48.639 27.2909 48.8674 27.7746 49.1437 28.2267C49.1745 28.28 49.2001 28.3325 49.2302 28.3912C49.2388 28.4087 49.1653 28.1479 49.213 28.3179C49.267 28.5216 49.3034 28.7338 49.3513 28.942C49.4622 29.4479 49.5297 29.9914 49.6916 30.4824C49.7921 30.7851 49.7437 30.3805 49.7228 30.5739C49.6935 30.788 49.6903 31.0111 49.6718 31.2267C49.633 31.7502 49.5935 32.2791 49.5547 32.8027C49.4925 33.6175 49.3921 34.4325 49.2978 35.2429C49.2035 36.0533 48.9304 36.8557 48.7298 37.6461C48.6918 37.8045 48.59 38.0305 48.6954 37.7777C48.6232 37.9478 48.5501 38.1232 48.4778 38.2933L47.8416 39.7984C47.7934 39.9118 47.6242 40.2322 47.7982 39.9561C47.715 40.0865 47.6165 40.2093 47.5233 40.3329L46.5279 41.7127C46.0636 42.3581 45.4457 42.8898 44.8831 43.4563C44.7882 43.5524 44.5851 43.6828 44.5354 43.8069C44.5339 43.8176 44.8332 43.6622 44.7323 43.6429C44.6841 43.6363 44.56 43.7066 44.5142 43.7222L42.9159 44.3272C42.1339 44.6239 41.446 45.0697 40.7236 45.489C40.534 45.5995 40.3445 45.7099 40.1549 45.8203C39.9182 45.957 40.3243 45.778 40.0574 45.8561C39.5403 46.009 39.0362 46.2673 38.534 46.4713C37.7666 46.7809 37.1205 47.1997 36.4158 47.6487L35.4608 48.2544C34.7264 48.7211 35.5452 49.7925 36.2788 49.3311C37.0124 48.8697 37.7366 48.3579 38.4933 47.927C38.2984 48.0367 38.479 47.9523 38.6466 47.8825L39.414 47.5729C39.8354 47.4014 40.2861 47.2558 40.6951 47.0554C41.4949 46.6684 42.2103 46.101 43.0108 45.7087C42.7655 45.8278 43.0186 45.7316 43.1504 45.6841L43.9668 45.3758C44.3921 45.2158 44.878 45.0913 45.2831 44.8795C45.6006 44.7102 45.8644 44.3754 46.1119 44.1203C46.4915 43.7359 46.8865 43.3591 47.2568 42.9626C47.807 42.3671 48.2609 41.6386 48.7228 40.971C49.1847 40.3035 49.471 39.4048 49.8008 38.6266C50.1306 37.8483 50.2826 36.9749 50.4876 36.1524C50.8889 34.5715 50.9011 32.8448 51.0194 31.2198C51.0836 30.3508 50.875 29.6026 50.6863 28.7481C50.6195 28.4391 50.5731 28.1002 50.4498 27.8053C50.2513 27.342 49.9575 26.8984 49.7187 26.4515C48.9002 24.9385 47.9555 23.5119 46.988 22.093C46.493 21.3657 45.8761 20.8126 45.2458 20.1976C45.1013 20.058 44.9508 19.9229 44.8123 19.7786C44.6885 19.6472 44.8746 19.8416 44.8607 19.8234C44.8153 19.7572 44.7583 19.6949 44.7136 19.6234C44.3838 19.164 44.0311 18.7123 43.6944 18.2629C43.6212 18.1602 43.4181 17.8108 43.5529 18.1018C43.4862 17.9509 43.4257 17.7955 43.3644 17.6453L42.6859 16.0261C42.6611 15.9682 42.5266 15.5954 42.5674 15.7755C42.6083 15.9555 42.5488 15.473 42.5415 15.4066L42.3627 13.6811C42.3285 13.3329 42.3244 13.0434 42.1301 12.7497C41.8594 12.3366 41.5186 11.9574 41.2174 11.5674C40.9856 11.2686 40.7672 10.9116 40.4989 10.6405C40.1922 10.3315 39.7007 10.1771 39.3168 9.99386L38.1644 9.44939C37.9491 9.34911 37.6713 9.3875 37.4881 9.5315C36.8715 10.0143 36.069 10.4609 35.5716 11.069C35.2447 11.466 35.0011 11.9725 34.7349 12.4051C34.5253 12.7417 34.2676 13.0719 34.1508 13.4485C33.6171 15.1203 33.4307 16.845 33.2053 18.5753L33.7862 17.9949C31.5213 18.1709 29.2727 18.2673 27.0192 18.5593L27.7323 18.9674C27.4918 18.1331 27.3251 17.238 27.0099 16.4317C26.7188 15.6886 26.2963 14.9494 25.913 14.2428C25.6997 13.8483 25.4636 13.4617 25.2435 13.0772C25.0411 12.7225 24.8485 12.2164 24.5564 11.9202C24.2642 11.6241 23.7117 11.4778 23.3431 11.302L22.0973 10.723C21.9027 10.631 21.5835 10.6528 21.4209 10.8051C20.8179 11.3879 20.2149 11.9708 19.6066 12.5529C19.3613 12.792 19.1516 12.9705 19.0612 13.3126C18.9546 13.7342 18.91 14.1806 18.8354 14.6066C18.5839 16.0498 18.1539 17.4414 17.8817 18.8763C17.7131 19.7911 17.5967 20.7239 17.4549 21.6423L17.7172 21.1983L16.342 22.1664C15.9441 22.4447 15.4185 22.7 15.1737 23.1355C14.6636 24.0363 14.3252 25.0369 13.8457 25.9529C13.5347 26.5538 13.1709 27.142 12.9012 27.7594C12.7196 28.1708 12.666 28.6433 12.5739 29.0778C12.338 30.2069 12.1027 31.3306 11.8668 32.4597C11.6532 33.5047 11.6567 34.5574 11.6044 35.6189C11.5812 36.0683 11.5573 36.523 11.5341 36.9724C11.5084 37.5195 11.3704 38.1713 11.5097 38.7083C11.7406 39.6122 12.083 40.6185 12.5099 41.4456L13.4902 43.3296C13.706 43.7462 13.9925 44.0034 14.336 44.3229C14.8147 44.7699 15.2754 45.269 15.7921 45.6776C16.3088 46.0862 16.8922 46.4058 17.4322 46.763C18.4126 47.4094 19.4971 47.8519 20.5637 48.3465C21.3536 48.7106 21.883 47.4689 21.0931 47.1048L21.1154 47.1406Z"
          fill="#4B546D"
        />
        <path
          d="M27.5738 29.191C27.48 29.598 27.4145 29.998 27.3329 30.3957C27.0212 30.6421 26.7333 30.9136 26.4262 31.1661L25.4084 31.6323C25.4009 31.6476 24.2846 31.7569 24.2725 31.7661C23.5698 31.6811 22.5755 31.4963 21.8748 31.357C21.5165 31.1063 21.1338 30.8741 20.7755 30.6235C20.5189 30.2667 20.2448 29.9185 19.9821 29.5664L19.9772 29.5221L19.9071 28.1986L19.9108 28.1718C19.9424 28.0998 20.3823 26.835 20.4431 26.7888L21.2564 25.744L21.289 25.7048L21.372 25.6562L22.5139 24.9997L22.5672 24.9688L22.6619 24.9545L23.9769 24.747L24.0601 24.7365C24.4932 24.8393 24.9172 24.968 25.3435 25.0808C25.7025 25.3261 26.0541 25.5867 26.4002 25.8466C26.6515 26.2026 26.9088 26.554 27.1311 26.9224C27.2602 27.2944 27.3894 27.6664 27.5017 28.0416C27.5362 28.428 27.56 28.8129 27.573 29.1963L27.5738 29.191ZM27.049 29.2011C26.9383 28.8534 26.8437 28.5079 26.7538 28.1685L26.7757 28.2478C26.6079 27.9196 26.4515 27.5874 26.2951 27.2553L26.3523 27.3558C26.1197 27.0623 25.8804 26.7788 25.6593 26.4815L25.7699 26.5893C25.4607 26.3781 25.1462 26.1661 24.8438 25.9449L24.9971 26.0203C24.6351 25.9164 24.267 25.817 23.9072 25.697L24.1013 25.7126L22.7751 25.8423L22.923 25.7971L21.7254 26.3423L21.8356 26.2538L20.891 27.1825L20.9394 27.1074L20.3095 28.2863L20.3212 28.2006L20.2278 29.5237L20.2045 29.455C20.4268 29.8234 20.643 30.1964 20.8714 30.5602C21.13 30.7427 21.5815 31.1097 21.8785 31.3302L23.065 31.5849C23.4046 31.6531 23.9275 31.6972 24.2693 31.7494C24.2586 31.7479 25.4294 31.5588 25.3737 31.5676L26.3535 31.0198C26.5005 30.8218 26.8711 30.4635 27.0819 30.1979L27.0366 30.2898C27.0435 29.92 27.0603 29.557 27.0543 29.2018L27.049 29.2011Z"
          fill="black"
        />
        <path
          d="M43.2419 27.8192C43.0961 28.2083 42.9984 28.6038 42.8495 28.9761L41.997 29.7484C41.652 29.9193 41.317 30.0971 40.9773 30.2688C40.6167 30.3941 40.2522 30.5079 39.8955 30.6445L38.7486 30.7387C38.3204 30.6802 37.8968 30.6279 37.4679 30.5747C37.0998 30.3555 36.7218 30.1294 36.3476 29.9147C36.3316 29.9125 36.3185 29.8889 36.3092 29.8767L35.5839 28.8399L35.5569 28.7981L35.5557 28.727L35.5333 27.4536L35.5362 27.4322L35.5435 27.3787L35.8566 26.2437C36.0659 25.8689 36.3572 25.5324 36.5972 25.1726C36.8826 24.879 37.1734 24.5862 37.4681 24.3047C37.5387 24.2271 37.5433 24.2332 37.6455 24.2035C38.0428 24.0888 38.4331 23.9458 38.8336 23.8478L40 23.6909C40.0946 23.6765 40.1014 23.6666 40.2048 23.7079L41.4383 24.1381L41.5217 24.1658C41.8681 24.4639 42.213 24.7727 42.5534 25.0755L42.621 25.1392C42.8284 25.5765 43.042 26.0091 43.2319 26.4548C43.2447 26.92 43.2415 27.383 43.2297 27.8285L43.2419 27.8192ZM42.9239 27.7922C42.8242 27.3642 42.7338 26.9484 42.6594 26.5348L42.693 26.6484C42.4478 26.2878 42.2209 25.9133 41.9825 25.5427L42.0764 25.6537C41.7302 25.3938 41.3787 25.1331 41.0333 24.8679L41.1705 24.9411L39.919 24.5631L40.1239 24.5801L38.9621 24.7432L39.0239 24.7298C38.6441 24.8361 38.2658 24.9316 37.8867 25.0325L38.0641 24.9313C37.3603 25.5331 37.0459 25.8391 36.4522 26.5541L36.5096 26.4529L36.0663 27.5428L36.0766 27.4678L35.9469 28.7368L35.9187 28.6239L36.5185 29.7418C36.6571 29.8043 37.2132 30.2837 37.5039 30.4706C37.809 30.5123 38.3576 30.6472 38.7476 30.7059C38.7316 30.7037 39.897 30.6338 39.8909 30.6384C40.2454 30.5178 40.6143 30.3719 40.9642 30.2452C41.2824 30.0706 41.6647 29.8665 41.9494 29.6982L42.7342 28.8622C42.7186 28.6965 42.8868 28.1034 42.9178 27.7968L42.9239 27.7922Z"
          fill="black"
        />
        <path
          d="M4.86445 34.3209C5.6226 34.1191 6.38076 33.9173 7.13891 33.7155C7.76665 33.5504 8.4182 33.5303 9.05955 33.4653C9.40771 33.431 9.84029 33.4574 10.1758 33.356C10.1133 33.3747 9.96488 33.3435 10.2026 33.3596C10.3967 33.3752 10.5916 33.3855 10.7858 33.4011C11.4821 33.4526 12.1888 33.4673 12.88 33.5562C13.7425 33.6685 14.6067 33.8084 15.4669 33.9367C16.3272 34.0651 16.5099 32.727 15.6497 32.5986C14.2014 32.3845 12.7776 32.1901 11.314 32.0884C10.6284 32.0384 10.0048 32.0132 9.32524 32.0785C8.6457 32.1438 7.90851 32.1522 7.23479 32.2947C6.37567 32.4772 5.53162 32.7491 4.68344 32.9713C4.32724 33.0644 4.05543 33.3381 4.10523 33.732C4.14775 34.0595 4.51506 34.404 4.86591 34.3102L4.86445 34.3209Z"
          fill="#4B546D"
        />
        <path
          d="M4.47324 37.9877C5.86208 37.4794 7.23193 36.9904 8.6497 36.5897C9.04094 36.4796 9.42756 36.3634 9.81808 36.2586C9.85238 36.2469 9.57915 36.2914 9.83729 36.2776C10.0358 36.2611 10.2412 36.2346 10.4412 36.2074L11.9917 36.032C12.136 36.0135 12.2942 36.0133 12.4345 35.9834C12.6367 35.9401 12.1715 35.9529 12.456 35.9863C13.3549 36.0709 14.2673 36.0974 15.1699 36.1552C16.0725 36.213 16.2231 34.8705 15.3526 34.8171C14.4821 34.7637 13.6819 34.7144 12.8496 34.6607C12.1358 34.6177 11.4261 34.7444 10.7176 34.8221C9.29449 34.9821 7.91006 35.3383 6.54386 35.8006C5.67475 36.0963 4.81731 36.4263 3.95597 36.7448C3.14112 37.0425 3.65765 38.2907 4.47251 37.993L4.47324 37.9877Z"
          fill="#4B546D"
        />
        <path
          d="M14.6401 37.3627C14.1078 37.5081 13.5693 37.6582 13.037 37.8035C12.6518 37.9091 12.2482 37.9902 11.8778 38.1469L9.98727 38.9355C9.8021 39.0138 9.58093 39.0763 9.41741 39.1958C9.2539 39.3152 9.10813 39.4643 8.95386 39.5959C8.45916 40.0245 7.96445 40.4531 7.46975 40.8817C7.19162 41.1218 7.10931 41.5249 7.34038 41.8291C7.54835 42.1028 8.00963 42.1985 8.28776 41.9584C8.708 41.596 9.12897 41.2282 9.54922 40.8658C9.75362 40.6865 9.99476 40.5177 10.1799 40.3194C10.3075 40.1842 10.0313 40.37 10.1106 40.3481C10.1899 40.3263 10.2782 40.2783 10.3537 40.245C11.3252 39.8379 12.273 39.4058 13.2927 39.1252C13.9158 38.954 14.5389 38.7828 15.162 38.6117C15.5136 38.5125 15.655 38.0357 15.5279 37.7293C15.3712 37.359 14.9971 37.2643 14.6455 37.3635L14.6401 37.3627Z"
          fill="#4B546D"
        />
        <path
          d="M56.8273 36.4197C56.1139 36.0932 55.4005 35.7667 54.6872 35.4403C54.0961 35.1719 53.4573 35.0425 52.836 34.8704C52.4986 34.7781 52.0677 34.7313 51.754 34.5749C51.8125 34.6039 51.9641 34.5981 51.727 34.574C51.533 34.5567 51.3392 34.534 51.1452 34.5167C50.4502 34.4503 49.751 34.3459 49.0547 34.3173C48.1856 34.2829 47.3102 34.2753 46.4406 34.2571C45.571 34.2389 45.616 32.8891 46.4857 32.9073C47.9493 32.9399 49.3855 32.9878 50.8454 33.1338C51.5297 33.1999 52.1486 33.28 52.8074 33.4587C53.4663 33.6375 54.1916 33.7698 54.8317 34.0235C55.6479 34.348 56.4341 34.758 57.2328 35.1198C57.5683 35.2715 57.7902 35.587 57.6748 35.9669C57.5778 36.2826 57.1577 36.5604 56.8277 36.4089L56.8273 36.4197Z"
          fill="#4B546D"
        />
        <path
          d="M56.597 40.1006C55.3135 39.366 54.0455 38.6534 52.7153 38.0199C52.3482 37.8455 51.9866 37.6659 51.6193 37.4969C51.5875 37.4796 51.8493 37.5694 51.5972 37.5124C51.4043 37.4627 51.2063 37.402 51.0137 37.3416L49.5148 36.9078C49.3757 36.8653 49.2198 36.8385 49.0864 36.7854C48.8944 36.7087 49.3508 36.7996 49.0649 36.7847C48.1645 36.7168 47.2607 36.5894 46.3612 36.4945C45.4617 36.3996 45.5391 35.0509 46.4062 35.1447C47.2733 35.2385 48.0704 35.3246 48.8999 35.4117C49.6107 35.4895 50.289 35.7337 50.9743 35.9295C52.3502 36.3267 53.655 36.9108 54.9239 37.5963C55.7309 38.034 56.5206 38.5036 57.316 38.9625C58.0692 39.393 57.35 40.5365 56.5968 40.106L56.597 40.1006Z"
          fill="#4B546D"
        />
        <path
          d="M46.6783 37.7737C47.1786 38.0066 47.6841 38.2451 48.1844 38.478C48.5463 38.6468 48.9306 38.7947 49.2693 39.0114L51.0002 40.1069C51.1695 40.2153 51.377 40.3141 51.5181 40.4593C51.6592 40.6046 51.7778 40.7761 51.9077 40.9318C52.3233 41.4375 52.7388 41.9432 53.1543 42.4489C53.3881 42.7324 53.4014 43.1436 53.1225 43.4046C52.8714 43.6394 52.4006 43.6562 52.1668 43.3727C51.8136 42.9447 51.4605 42.5113 51.1072 42.0834C50.9359 41.8723 50.7266 41.6653 50.5774 41.4387C50.4745 41.2839 50.7154 41.5136 50.6409 41.4787C50.5664 41.4437 50.4874 41.3816 50.4187 41.3361C49.5295 40.7713 48.668 40.1859 47.71 39.7377C47.1246 39.4642 46.5391 39.1906 45.9537 38.917C45.6238 38.7601 45.5646 38.2662 45.7415 37.9857C45.9582 37.647 46.343 37.6166 46.6729 37.7735L46.6783 37.7737Z"
          fill="#4B546D"
        />
      </g>
      <defs>
        <clipPath id="clip0_1079_20782">
          <rect width="60" height="60" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};
