import { ChatMessagesByRoomIdResponse } from '@/chat/apis/getChatMessagesByRoomId';
import { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  console.log(roomId);

  const mockData: ChatMessagesByRoomIdResponse = {
    messages: [
      {
        messageId: 1,
        type: 'USER_NORMAL',
        sender: 'SYSTEM',
        answers: ['타로결과를 다시 보고 싶으면 카드를 눌러보라냥🐾', '또 궁금한 거 있어냥?'],
        tarotName: 'M_00',
        tarotResultId: 1,
      },
      {
        messageId: 2,
        type: 'USER_TAROT_QUESTION',
        sender: 'USER',
        answers: ['이 타로 카드가 의미하는 게 뭐냐냥?', '뭔가 다른 카드를 보고 싶다냥.'],
        tarotName: 'M_01',
        tarotResultId: 2,
      },
      {
        messageId: 3,
        type: 'SYSTEM_TAROT_RESULT',
        sender: 'SYSTEM',
        answers: ['새로운 결과를 보고 싶다면 다른 질문을 해보라냥!', '타로 카드 속에 숨겨진 비밀을 알려줄게냥!'],
        tarotName: 'M_02',
        tarotResultId: 3,
      },
    ],
  };

  return NextResponse.json({ data: mockData });
}
