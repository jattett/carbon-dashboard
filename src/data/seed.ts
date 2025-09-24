import { Company, Post, Country } from '@/types';

export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

export const companies: Company[] = [
  {
    id: 'c1',
    name: '에이크미 코퍼레이션',
    country: 'US',
    emissions: [
      { yearMonth: '2024-01', source: '휘발유', emissions: 120 },
      { yearMonth: '2024-02', source: '휘발유', emissions: 110 },
      { yearMonth: '2024-03', source: '휘발유', emissions: 95 },
      { yearMonth: '2024-04', source: '휘발유', emissions: 88 },
      { yearMonth: '2024-05', source: '휘발유', emissions: 92 },
      { yearMonth: '2024-06', source: '휘발유', emissions: 105 },
    ],
  },
  {
    id: 'c2',
    name: '글로벡스 인더스트리',
    country: 'DE',
    emissions: [
      { yearMonth: '2024-01', source: '경유', emissions: 80 },
      { yearMonth: '2024-02', source: '경유', emissions: 105 },
      { yearMonth: '2024-03', source: '경유', emissions: 120 },
      { yearMonth: '2024-04', source: '경유', emissions: 95 },
      { yearMonth: '2024-05', source: '경유', emissions: 110 },
      { yearMonth: '2024-06', source: '경유', emissions: 125 },
    ],
  },
  {
    id: 'c3',
    name: '테크플로우 솔루션',
    country: 'JP',
    emissions: [
      { yearMonth: '2024-01', source: 'LPG', emissions: 45 },
      { yearMonth: '2024-02', source: 'LPG', emissions: 52 },
      { yearMonth: '2024-03', source: 'LPG', emissions: 48 },
      { yearMonth: '2024-04', source: 'LPG', emissions: 55 },
      { yearMonth: '2024-05', source: 'LPG', emissions: 58 },
      { yearMonth: '2024-06', source: 'LPG', emissions: 62 },
    ],
  },
  {
    id: 'c4',
    name: '그린테크 이노베이션',
    country: 'CN',
    emissions: [
      { yearMonth: '2024-01', source: '석탄', emissions: 200 },
      { yearMonth: '2024-02', source: '석탄', emissions: 185 },
      { yearMonth: '2024-03', source: '석탄', emissions: 170 },
      { yearMonth: '2024-04', source: '석탄', emissions: 160 },
      { yearMonth: '2024-05', source: '석탄', emissions: 155 },
      { yearMonth: '2024-06', source: '석탄', emissions: 145 },
    ],
  },
  {
    id: 'c5',
    name: '에코시스템스 리미티드',
    country: 'GB',
    emissions: [
      { yearMonth: '2024-01', source: '천연가스', emissions: 75 },
      { yearMonth: '2024-02', source: '천연가스', emissions: 82 },
      { yearMonth: '2024-03', source: '천연가스', emissions: 78 },
      { yearMonth: '2024-04', source: '천연가스', emissions: 85 },
      { yearMonth: '2024-05', source: '천연가스', emissions: 88 },
      { yearMonth: '2024-06', source: '천연가스', emissions: 92 },
    ],
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    title: '2024년 1분기 지속가능성 보고서',
    resourceUid: 'c1',
    dateTime: '2024-02',
    content: '에이크미 코퍼레이션은 2023년 4분기 대비 배출량을 8% 성공적으로 감소시켰습니다. 주요 이니셔티브로는 차량 전기화와 재생에너지 도입이 있습니다.',
  },
  {
    id: 'p2',
    title: '탄소 중립 로드맵',
    resourceUid: 'c2',
    dateTime: '2024-03',
    content: '글로벡스 인더스트리는 2030년까지 탄소 중립을 달성하기 위한 야심찬 계획을 발표했습니다. 청정 기술과 프로세스 최적화에 대한 투자가 포함됩니다.',
  },
  {
    id: 'p3',
    title: '그린 에너지 전환 업데이트',
    resourceUid: 'c3',
    dateTime: '2024-04',
    content: '테크플로우 솔루션은 태양광 패널 설치와 에너지 효율적인 장비 업그레이드를 통해 배출량을 15% 감소시켰다고 보고했습니다.',
  },
  {
    id: 'p4',
    title: '환경 규정 준수 검토',
    resourceUid: 'c4',
    dateTime: '2024-05',
    content: '그린테크 이노베이션이 포괄적인 환경 감사를 완료했습니다. 모든 시설이 이제 국제 탄소 표준을 충족합니다.',
  },
  {
    id: 'p5',
    title: '지속가능한 운영 이니셔티브',
    resourceUid: 'c5',
    dateTime: '2024-06',
    content: '에코시스템스 리미티드가 폐기물 감소와 순환 경제 원칙에 중점을 둔 새로운 지속가능한 운영 프로그램을 시작했습니다.',
  },
];
