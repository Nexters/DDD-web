import { CreateChatRoomResponse } from '@/chat/apis/createChatRoom';
import { NextResponse } from 'next/server';

export async function POST() {
  const mockData: CreateChatRoomResponse = {
    roomId: 1,
    message: {
      messageId: 1,
      type: 'SYSTEM_NORMAL',
      sender: 'SYSTEM',
      answer: ['안녕이다냥?'],
    },
  };

  return NextResponse.json({ data: mockData });
}
