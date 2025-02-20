"use client";

import ChevronLeftIcon from "@/shared/assets/icons/chevron-left.svg";
import Image from "next/image";
import Link from "next/link";
import { css } from "styled-components";
import { useTarotReadingResultList } from "../hooks/useTarotReadingResultList";
import findCardById from "../utils/findCardById";
import TarotResultsEmptyView from "./TarotResultsEmptyView";
export default function TarotResults() {
  const { data } = useTarotReadingResultList();

  if (!data) return null;

  return (
    <div
      css={css`
        width: 100%;
        max-width: 600px;
        margin-inline: auto;
      `}
    >
      {data.results.length === 0 ? (
        <TarotResultsEmptyView />
      ) : (
        <ul>
          {data.results.map((result) => (
            <li
              key={result.id}
              css={css`
                border-bottom: 1px solid ${({ theme }) => theme.colors.grey20};
                &:last-child {
                  border-bottom: none;
                }
              `}
            >
              <Link
                href={`/chats/${result.chatRoomId}/tarot-reading/${result.tarotResultId}`}
                css={css`
                  display: flex;
                  padding: 20px;
                  gap: 16px;
                `}
              >
                <Image
                  src={findCardById(result.selectedTarot).imgSrc}
                  alt=""
                  width={52}
                  height={77}
                  css={css`
                    background-color: ${({ theme }) => theme.colors.grey20};
                  `}
                />
                <div
                  css={css`
                    display: flex;
                    flex: 1;
                    gap: 16px;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      gap: 4px;
                      flex: 1;
                    `}
                  >
                    <p
                      css={css`
                        ${({ theme }) => theme.fonts.body1};
                        color: ${({ theme }) => theme.colors.grey50};
                      `}
                    >
                      {new Date(result.createdAt).toLocaleDateString()}
                    </p>
                    <p
                      css={css`
                        ${({ theme }) => theme.fonts.subHead3};
                        color: ${({ theme }) => theme.colors.grey90};
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                      `}
                    >
                      {result.questionSummary}
                    </p>
                  </div>
                  <ChevronLeftIcon style={{ transform: "rotate(180deg)", alignSelf: "center" }} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
