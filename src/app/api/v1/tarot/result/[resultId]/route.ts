import { TarotReadingResultResponse } from '@/tarot/services/apis/getTarotReadingResultById';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const resultId = request.nextUrl.pathname.split('/')[4];

  console.log(parseInt(resultId, 10));

  const mockData: TarotReadingResultResponse = {
    tarot: 'M_00',
    type: '연애',
    cardValue: {
      summary: '집사가 주도권을 쥐고 있다냥',
      description: '지팡이의 여왕은 이런 의미를 가지고 있어. ',
    },
    answer: {
      summary: '재결합 가능성이 있다냥',
      description:
        '재결합 가능성은 충분히 있다냥. 하지만 이 카드는 집사에게 자신을 먼저 사랑하라는 메시지도 준다냥. 집사가 자신감 있게 자신만의 기준을 세울 때, 상대방이 진심으로 집사를 다시 원할 가능성이 커진다냥.',
      question: '전남친이 아직 저에게 미련이 남았는지 궁금해요',
    },
    advice: {
      summary: '가장 중요한 건 집사가 원하는 것이다냥',
      description:
        '먼저 집사가 진짜 원하는 게 뭔지 정리해라냥. 그 과정에서 집사 자신이 얼마나 소중한 사람인지 다시 느낄 수 있을 거다냥. 그리고 과거에 얽매이지 않고, 집사의 매력을 뿜뿜하는 게 중요하다냥. 재결합은 집사가 빛날 때 자연스럽게 따라오는 결과일 거다냥.',
    },
  };

  return NextResponse.json(mockData);
}
