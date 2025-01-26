import { SelectTarotCardRequest, SelectTarotCardResponse } from '@/tarot/services/apis/selectTarotCard';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body: SelectTarotCardRequest = await request.json();
  console.log(body);

  const mockData: SelectTarotCardResponse = {
    messageId: 1,
    type: 'SYSTEM_TAROT_RESULT',
    sender: 'SYSTEM',
    answer: ['타로결과를 다시 보고 싶으면 카드를 눌러보라냥🐾', '또 궁금한 거 있어냥?'],
    tarotName: 'M_00',
    tarotResultId: 1,
  };

  return NextResponse.json({ data: mockData });
}
