import { TarotQuestionRecommendListResponse } from '@/tarot/services/apis/getTarotQuestionRecommends';
import { NextResponse } from 'next/server';

export async function GET() {
  const mockData: TarotQuestionRecommendListResponse = {
    question: [
      {
        recommendQuestionId: 1,
        question: '썸남 썸녀랑 잘 될까?',
        referenceCount: 1,
      },
      {
        recommendQuestionId: 2,
        question: '상반기에 취업할 수 있을까?',
        referenceCount: 222,
      },
      {
        recommendQuestionId: 3,
        question: '그 사람은 내 생각하고 있을까?',
        referenceCount: 3333,
      },
    ],
  };

  return NextResponse.json({ data: mockData });
}
