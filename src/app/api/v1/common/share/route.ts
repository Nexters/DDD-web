import { LogShareEventRequest } from '@/shared/apis/logShareEvent';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body: LogShareEventRequest = await request.json();
  console.log(body);

  return NextResponse.json({ data: { message: '성공' } });
}
