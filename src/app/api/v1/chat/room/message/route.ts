import { SendChatMessageResponse } from '@/chat/services/apis/sendChatMessage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  console.log(body);

  const normalReplyMockData: SendChatMessageResponse = {
    messageId: 1,
    type: 'SYSTEM_NORMAL_REPLY',
    sender: 'SYSTEM',
    answers: ['안녕 내담자', '따듯한 마룻바닥이 그리운 겨울 밤이야', '오늘은 어떤게 궁금해서 찾어왔어냥?'],
  };

  const invalidQuestionReplyMockData: SendChatMessageResponse = {
    messageId: 1,
    type: 'SYSTEM_INVALID_QUESTION_REPLY',
    sender: 'SYSTEM',
    answers: ['잘못된 질문이네냥!', '다시 질문해보라냥!'],
  };

  const questionReplyMockData: SendChatMessageResponse = {
    messageId: 1,
    type: 'SYSTEM_TAROT_QUESTION_REPLY',
    sender: 'SYSTEM',
    answers: ['전남친이 아직 미련이 남았는지 궁금하구낭!', '타로카드로 그 사람의 마음을 함계 들여다 볼까냥?'],
  };

  const questionAcceptanceReplyMockData: SendChatMessageResponse = {
    messageId: 1,
    type: 'SYSTEM_TAROT_QUESTION_ACCEPTANCE_REPLY',
    sender: 'SYSTEM',
    answers: ['너의 고민에 집중하면서', '카드를 한 장 뽑아봐!'],
  };

  const mockDataArray = [
    normalReplyMockData,
    invalidQuestionReplyMockData,
    questionReplyMockData,
    questionAcceptanceReplyMockData,
  ];

  const randomIndex = Math.floor(Math.random() * mockDataArray.length);
  const randomMockData = mockDataArray[randomIndex];

  return NextResponse.json(randomMockData);
}
