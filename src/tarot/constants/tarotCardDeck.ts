import { TarotCardType } from "../models/tarotCard";

const majorArcanaObjects: Record<string, TarotCardType> = {
  Fool: {
    name: "Fool",
    id: "M_00",

    alt: "바보 카드: 새로운 시작과 모험을 상징하는 카드로, 예측할 수 없는 미래로 나아가는 순수한 마음을 나타냅니다.",
  },
  Magician: {
    name: "Magician",
    id: "M_01",

    alt: "마법사 카드: 창의성, 기술, 지혜의 활용을 통해 자신의 목표를 달성할 수 있는 능력을 나타내는 카드입니다.",
  },
  HighPriestess: {
    name: "HighPriestess",
    id: "M_02",

    alt: "여제 카드: 직관과 신비, 숨겨진 진리를 탐구하는 능력을 상징하는 카드로, 내면의 목소리를 따르는 것을 의미합니다.",
  },
  Empress: {
    name: "Empress",
    id: "M_03",

    alt: "여왕 카드: 풍요, 창조, 자연과의 연결을 나타내며, 사랑과 보살핌을 통해 성장과 번영을 이끌어냅니다.",
  },
  Emperor: {
    name: "Emperor",
    id: "M_04",

    alt: "황제 카드: 권위, 구조, 안정성을 상징하는 카드로, 리더십과 질서 있는 삶을 유지하는 것을 강조합니다.",
  },
  Hierophant: {
    name: "Hierophant",
    id: "M_05",

    alt: "교황 카드: 전통, 교육, 종교적 교리를 통해 지혜와 가르침을 전달하는 카드를 의미합니다.",
  },
  Lovers: {
    name: "Lovers",
    id: "M_06",

    alt: "연인 카드: 중요한 결정을 내리기 위한 사랑과 관계의 상징적인 카드로, 선택과 균형을 나타냅니다.",
  },
  Chariot: {
    name: "Chariot",
    id: "M_07",

    alt: "전차 카드: 승리와 목표 달성을 위한 의지와 결단력을 상징하는 카드로, 장애물을 극복하는 능력을 의미합니다.",
  },
  Strength: {
    name: "Strength",
    id: "M_08",

    alt: "힘 카드: 내면의 강인함과 용기를 의미하는 카드로, 물리적 힘보다는 정신적인 강인함을 강조합니다.",
  },
  Hermit: {
    name: "Hermit",
    id: "M_09",

    alt: "은둔자 카드: 고독 속에서 진리를 찾고 내면의 지혜를 탐구하는 카드로, 자기 반성과 고독의 의미를 담고 있습니다.",
  },
  WheelOfFortune: {
    name: "WheelOfFortune",
    id: "M_10",

    alt: "운명의 수레바퀴 카드: 변화와 전환의 순간을 나타내며, 인생의 흐름과 주기의 변화를 상징합니다.",
  },
  Justice: {
    name: "Justice",
    id: "M_11",

    alt: "정의 카드: 균형과 공정성을 의미하며, 모든 상황에서 올바른 판단을 내리는 능력을 강조합니다.",
  },
  HangedMan: {
    name: "HangedMan",
    id: "M_12",

    alt: "교수형 카드: 희생과 새로운 시각을 통해 깨달음을 얻는 카드로, 다른 관점에서 상황을 바라보는 중요성을 나타냅니다.",
  },
  Death: {
    name: "Death",
    id: "M_13",

    alt: "죽음 카드: 끝과 새로운 시작을 의미하는 카드로, 자연스러운 변화와 전환을 상징합니다.",
  },
  Temperance: {
    name: "Temperance",
    id: "M_14",

    alt: "절제 카드: 균형과 절제를 의미하며, 감정과 행동에서의 조화를 이루는 것을 강조합니다.",
  },
  Devil: {
    name: "Devil",
    id: "M_15",

    alt: "악마 카드: 물질적 욕망과 집착, 그리고 유혹에 빠지지 않도록 경고하는 카드입니다.",
  },
  Tower: {
    name: "Tower",
    id: "M_16",

    alt: "탑 카드: 갑작스러운 변화와 충격적인 사건을 의미하며, 기존의 구조가 붕괴되기를 나타냅니다.",
  },
  Star: {
    name: "Star",
    id: "M_17",

    alt: "별 카드: 희망, 영감, 긍정적인 에너지를 의미하는 카드로, 밝은 미래를 향한 비전과 믿음을 강조합니다.",
  },
  Moon: {
    name: "Moon",
    id: "M_18",

    alt: "달 카드: 직관과 꿈, 불확실성을 상징하는 카드로, 현실과 환상이 교차하는 순간을 나타냅니다.",
  },
  Sun: {
    name: "Sun",
    id: "M_19",

    alt: "해 카드: 성공, 행복, 밝은 미래를 의미하는 카드로, 모든 것이 명확하고 빛을 발하는 순간을 나타냅니다.",
  },
  Judgement: {
    name: "Judgement",
    id: "M_20",

    alt: "심판 카드: 과거를 반성하고 새로운 시작을 맞이하는 중요한 전환점을 나타내는 카드입니다.",
  },
  World: {
    name: "World",
    id: "M_21",

    alt: "세계 카드: 완성과 성취, 우주와의 조화를 의미하는 카드로, 삶의 순환을 마치고 새로운 단계로 나아감을 상징합니다.",
  },
} as const;

const swordObjects: Record<string, TarotCardType> = {
  Sword01: {
    name: "Sword01",
    id: "S_01",

    alt: "검 1 카드: 갈등, 어려움, 도전적인 상황을 나타내며, 정신적 투쟁과 갈등을 상징하는 카드입니다.",
  },
  Sword02: {
    name: "Sword02",
    id: "S_02",

    alt: "검 2 카드: 선택과 균형을 나타내며, 내적 갈등과 결정을 내리는 과정을 상징하는 카드입니다.",
  },
  Sword03: {
    name: "Sword03",
    id: "S_03",

    alt: "검 3 카드: 고통과 상처를 나타내며, 감정적 고통과 이별을 상징하는 카드입니다.",
  },
  Sword04: {
    name: "Sword04",
    id: "S_04",

    alt: "검 4 카드: 휴식과 회복을 나타내며, 잠시 멈추고 치유하는 시간을 상징하는 카드입니다.",
  },
  Sword05: {
    name: "Sword05",
    id: "S_05",

    alt: "검 5 카드: 패배와 상실을 나타내며, 실망과 후회, 갈등을 상징하는 카드입니다.",
  },
  Sword06: {
    name: "Sword06",
    id: "S_06",

    alt: "검 6 카드: 변화와 이동을 나타내며, 새로운 시작을 향해 떠나는 여정을 상징하는 카드입니다.",
  },
  Sword07: {
    name: "Sword07",
    id: "S_07",

    alt: "검 7 카드: 전략과 계획을 나타내며, 기민한 사고와 교활함을 상징하는 카드입니다.",
  },
  Sword08: {
    name: "Sword08",
    id: "S_08",

    alt: "검 8 카드: 제약과 속박을 나타내며, 자신을 가두고 있는 상황을 상징하는 카드입니다.",
  },
  Sword09: {
    name: "Sword09",
    id: "S_09",

    alt: "검 9 카드: 불안과 고통을 나타내며, 걱정과 심리적 압박을 상징하는 카드입니다.",
  },
  Sword10: {
    name: "Sword10",
    id: "S_10",

    alt: "검 10 카드: 끝과 변화의 시기를 나타내며, 심리적 고통과 고난의 끝을 상징하는 카드입니다.",
  },
  SwordKing: {
    name: "SwordKing",
    id: "S_K",

    alt: "검의 왕 카드: 지혜와 권력을 가진 지도자를 나타내며, 논리적이고 공정한 결정을 내리는 능력을 상징하는 카드입니다.",
  },
  SwordQueen: {
    name: "SwordQueen",
    id: "S_Q",

    alt: "검의 여왕 카드: 직관과 냉정함을 나타내며, 감정적으로 강하고 독립적인 성격을 상징하는 카드입니다.",
  },
  SwordKnight: {
    name: "SwordKnight",
    id: "S_N",

    alt: "검의 기사 카드: 용기와 결단력을 나타내며, 빠르고 결단력 있는 행동을 상징하는 카드입니다.",
  },
  SwordPage: {
    name: "SwordPage",
    id: "S_P",

    alt: "검의 기사 카드: 새로운 아이디어와 시작을 나타내며, 지적인 탐구와 분석을 상징하는 카드입니다.",
  },
} as const;

const cupObjects: Record<string, TarotCardType> = {
  Cup01: {
    name: "Cup01",
    id: "C_01",

    alt: "컵 1 카드: 감정과 사랑의 시작을 나타내며, 새로운 사랑과 감정의 흐름을 상징하는 카드입니다.",
  },
  Cup02: {
    name: "Cup02",
    id: "C_02",

    alt: "컵 2 카드: 관계와 화합을 나타내며, 두 사람 간의 연결과 조화를 상징하는 카드입니다.",
  },
  Cup03: {
    name: "Cup03",
    id: "C_03",

    alt: "컵 3 카드: 기쁨과 축하를 나타내며, 우정과 사회적 교류를 상징하는 카드입니다.",
  },
  Cup04: {
    name: "Cup04",
    id: "C_04",

    alt: "컵 4 카드: 내성적이고 반성적인 상태를 나타내며, 감정적 불만족과 무관심을 상징하는 카드입니다.",
  },
  Cup05: {
    name: "Cup05",
    id: "C_05",

    alt: "컵 5 카드: 상실과 후회를 나타내며, 감정적인 실패와 실망을 상징하는 카드입니다.",
  },
  Cup06: {
    name: "Cup06",
    id: "C_06",

    alt: "컵 6 카드: 과거와의 연결을 나타내며, 추억과 회상, 순수한 감정을 상징하는 카드입니다.",
  },
  Cup07: {
    name: "Cup07",
    id: "C_07",

    alt: "컵 7 카드: 선택의 갈림길을 나타내며, 혼란과 선택에서 오는 갈등을 상징하는 카드입니다.",
  },
  Cup08: {
    name: "Cup08",
    id: "C_08",

    alt: "컵 8 카드: 떠남과 새로운 시작을 나타내며, 감정적으로 떨어져 나오는 과정과 내적 탐구를 상징하는 카드입니다.",
  },
  Cup09: {
    name: "Cup09",
    id: "C_09",

    alt: "컵 9 카드: 감정적 만족과 성취를 나타내며, 원하는 것들이 모두 이루어지는 상태를 상징하는 카드입니다.",
  },
  Cup10: {
    name: "Cup10",
    id: "C_10",

    alt: "컵 10 카드: 가족과 관계의 완성을 나타내며, 감정적 안정과 행복을 상징하는 카드입니다.",
  },
  CupKing: {
    name: "CupKing",
    id: "C_K",

    alt: "컵의 왕 카드: 감정적 지혜와 이해를 나타내며, 감정을 잘 조절하고 타인과의 관계에서 이해심을 보이는 능력을 상징하는 카드입니다.",
  },
  CupQueen: {
    name: "CupQueen",
    id: "C_Q",

    alt: "컵의 여왕 카드: 감정과 직관의 강력한 연계를 나타내며, 부드럽고 따뜻한 성격을 상징하는 카드입니다.",
  },
  CupKnight: {
    name: "CupKnight",
    id: "C_N",

    alt: "컵의 기사 카드: 이상적인 사랑과 감정을 나타내며, 감성적이고 직관적인 행동을 상징하는 카드입니다.",
  },
  CupPage: {
    name: "CupPage",
    id: "C_P",

    alt: "컵의 기사 카드: 새로운 감정과 아이디어를 나타내며, 새로운 감정적 여정의 시작을 상징하는 카드입니다.",
  },
} as const;

const pentacleObjects: Record<string, TarotCardType> = {
  Pentacle01: {
    name: "Pentacle01",
    id: "P_01",

    alt: "펜타클 1 카드: 새로운 재정적 기회나 시작을 나타내며, 물질적 안정과 성공을 상징하는 카드입니다.",
  },
  Pentacle02: {
    name: "Pentacle02",
    id: "P_02",

    alt: "펜타클 2 카드: 균형과 조화를 나타내며, 재정적 안정과 변화를 상징하는 카드입니다.",
  },
  Pentacle03: {
    name: "Pentacle03",
    id: "P_03",

    alt: "펜타클 3 카드: 팀워크와 협력을 나타내며, 물질적 성취와 건설적인 프로젝트를 상징하는 카드입니다.",
  },
  Pentacle04: {
    name: "Pentacle04",
    id: "P_04",

    alt: "펜타클 4 카드: 재정적 안전을 나타내며, 자원의 보호와 소유욕을 상징하는 카드입니다.",
  },
  Pentacle05: {
    name: "Pentacle05",
    id: "P_05",

    alt: "펜타클 5 카드: 경제적 어려움을 나타내며, 물질적 결핍과 어려움을 상징하는 카드입니다.",
  },
  Pentacle06: {
    name: "Pentacle06",
    id: "P_06",

    alt: "펜타클 6 카드: 나눔과 균형을 나타내며, 자선과 물질적 지원을 상징하는 카드입니다.",
  },
  Pentacle07: {
    name: "Pentacle07",
    id: "P_07",

    alt: "펜타클 7 카드: 노력과 인내를 나타내며, 재정적 성취를 위한 시간이 필요함을 상징하는 카드입니다.",
  },
  Pentacle08: {
    name: "Pentacle08",
    id: "P_08",

    alt: "펜타클 8 카드: 근면과 수고를 나타내며, 지속적인 노력과 기술 향상을 상징하는 카드입니다.",
  },
  Pentacle09: {
    name: "Pentacle09",
    id: "P_09",

    alt: "펜타클 9 카드: 자립과 물질적 풍요를 나타내며, 성취된 목표와 독립적인 삶을 상징하는 카드입니다.",
  },
  Pentacle10: {
    name: "Pentacle10",
    id: "P_10",

    alt: "펜타클 10 카드: 물질적 안정과 가족을 나타내며, 세대 간의 풍요와 안정된 삶을 상징하는 카드입니다.",
  },
  PentacleKing: {
    name: "PentacleKing",
    id: "P_K",

    alt: "펜타클의 왕 카드: 재정적 권력과 안정, 실용적이고 목표 지향적인 성격을 상징하는 카드입니다.",
  },
  PentacleQueen: {
    name: "PentacleQueen",
    id: "P_Q",

    alt: "펜타클의 여왕 카드: 풍요와 자원을 잘 관리하는 능력을 나타내며, 안정적이고 현실적인 성격을 상징하는 카드입니다.",
  },
  PentacleKnight: {
    name: "PentacleKnight",
    id: "P_N",

    alt: "펜타클의 기사 카드: 성실함과 노력, 현실적이고 실용적인 접근을 나타내며, 안정적인 수입을 추구하는 카드를 상징하는 카드입니다.",
  },
  PentaclePage: {
    name: "PentaclePage",
    id: "P_P",

    alt: "펜타클의 기사 카드: 새로운 기회와 학습을 나타내며, 물질적 성장을 위한 실용적인 접근을 상징하는 카드입니다.",
  },
};

const majorArcanaArray = Object.values(majorArcanaObjects).map(
  ({ name, id, imgSrc, alt }) => ({
    name,
    id,
    imgSrc,
    alt,
  }),
);

const swordArray = Object.values(swordObjects).map(
  ({ name, id, imgSrc, alt }) => ({
    name,
    id,
    imgSrc,
    alt,
  }),
);

const cupArray = Object.values(cupObjects).map(({ name, id, imgSrc, alt }) => ({
  name,
  id,
  imgSrc,
  alt,
}));

const pentacleArray = Object.values(pentacleObjects).map(
  ({ name, id, imgSrc, alt }) => ({
    name,
    id,
    imgSrc,
    alt,
  }),
);

const tarotDeckData = [
  ...majorArcanaArray,
  ...swordArray,
  ...cupArray,
  ...pentacleArray,
];

export default tarotDeckData;
