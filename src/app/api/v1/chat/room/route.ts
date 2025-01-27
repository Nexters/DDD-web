import { CreateChatRoomResponse } from '@/chat/apis/createChatRoom';
import { NextResponse } from 'next/server';

export async function POST() {
  const mockData: CreateChatRoomResponse = {
    roomId: 1,
  };

  return NextResponse.json({ data: mockData });
}
