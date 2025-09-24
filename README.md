# 탄소 배출량 대시보드 (Carbon Emissions Dashboard)

> **HanaLoop 프론트엔드 개발 과제** - 창의적이고 생산적인 탄소 관리 플랫폼

## 프로젝트 개요

이 프로젝트는 조직의 탄소 배출량을 모니터링하고 관리하기 위한 현대적이고 반응형 웹 애플리케이션입니다. 경영진과 관리자들이 탄소세 계획 및 지속가능성 이니셔티브에 대한 정보에 기반한 의사결정을 할 수 있도록 돕습니다.

### 개발 목표
- **사용자 중심 설계**: 경영진과 관리자를 위한 직관적인 인터페이스
- **데이터 시각화**: 복잡한 배출량 데이터를 이해하기 쉽게 표현
- **반응형 디자인**: 다양한 디바이스에서 일관된 사용자 경험
- **성능 최적화**: 빠른 로딩과 부드러운 인터랙션

### 설계 가정사항
1. **주요 사용자**: 경영진과 관리자 (비즈니스 의사결정자)
2. **데이터 특성**: 월별 배출량 데이터 (실시간성보다는 정확성 중시)
3. **사용 환경**: 주로 데스크톱 환경, 모바일은 보조적
4. **데이터 규모**: 중소규모 기업 (5-50개 회사, 월별 데이터)
5. **언어**: 한국어 우선, 국제화 고려
6. **실시간 데이터 vs 배치 데이터**: 배치 데이터로 가정 (월별 업데이트)
7. **사용자 권한 관리**: 단일 관리자 권한으로 단순화
8. **데이터 내보내기**: 차트 내보내기 기능 포함
9. **알림 시스템**: 기본적인 상태 알림으로 제한

## 개발 과정

| 단계 | 작업 내용 | 소요 시간 | 주요 결정사항 |
|------|-----------|-----------|---------------|
| 1 | 프로젝트 설정 및 환경 구성 | 1시간 | Next.js 14, TypeScript, Tailwind 선택 |
| 2 | 데이터 모델 및 API 레이어 설계 | 1.5시간 | 타입 정의, 네트워크 시뮬레이션 구현 |
| 3 | 디자인 시스템 구축 | 2시간 | 환경 친화적 색상 팔레트, 타이포그래피 |
| 4 | 상태 관리 구현 | 1시간 | Zustand 선택 (Redux 대비 간단함) |
| 5 | 네비게이션 및 레이아웃 | 2시간 | GNB, 사이드바, 반응형 레이아웃 |
| 6 | 대시보드 메트릭 카드 | 2시간 | 인터랙티브 카드, 확장 가능한 디자인 |
| 7 | 차트 시스템 구현 | 3시간 | Recharts 활용, 다중 차트 타입 지원 |
| 8 | 게시물 관리 시스템 | 1.5시간 | CRUD 기능, 모달 다이얼로그 |
| 9 | 폰트 및 타이포그래피 최적화 | 1시간 | 한국어 폰트 최적화, 가독성 향상 |
| 10 | 애니메이션 및 UX 개선 | 1.5시간 | 부드러운 트랜지션, 호버 효과 |
| 11 | 문서화 및 최종 테스트 | 1시간 | README 작성, 코드 정리 |
| **총계** | **전체 개발** | **18시간** | **목표 8-12시간 초과** |

## 주요 기능

### 핵심 기능
- **실시간 배출량 모니터링**: 여러 회사와 기간에 걸친 CO₂ 배출량 추적
- **인터랙티브 데이터 시각화**: 선형, 막대, 영역, 산점도 차트를 포함한 다양한 차트 유형
- **회사 관리**: 회사 및 국가별 배출량 데이터 필터링 및 조회
- **게시물 및 보고서**: 지속가능성 보고서 및 업데이트 생성, 편집 및 관리
- **반응형 디자인**: 데스크톱, 태블릿, 모바일 기기에 최적화

### 주요 지표
- 모든 회사의 총 배출량
- 회사당 평균 배출량
- 배출량 트렌드 및 비율 변화
- 최대 배출 회사 식별
- 국가별 필터링 및 분석

### 사용자 경험
- **직관적인 네비게이션**: 회사 및 국가 필터가 있는 접을 수 있는 사이드바
- **로딩 상태**: 스켈레톤 로더 및 진행 표시기
- **오류 처리**: 재시도 기능이 있는 우아한 오류 상태
- **현대적 UI**: 일관된 테마가 적용된 깔끔하고 전문적인 디자인

## 기술 스택

### 핵심 기술
- **Framework**: Next.js 14.2.0 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 18.3.0
- **Styling**: Tailwind CSS 4.x + 커스텀 디자인 시스템
- **State Management**: Zustand 5.x
- **Charts**: Recharts 3.x
- **Icons**: Lucide React
- **UI Components**: Radix UI (경량 헤드리스 컴포넌트)

### 디자인 시스템
- **폰트**: Pretendard (한국어 최적화)
- **색상**: 환경 친화적 그린 팔레트 + 의미있는 색상 코딩
- **애니메이션**: CSS 트랜지션 + 커스텀 키프레임
- **반응형**: 모바일 퍼스트 접근법

## 시작하기

### 사전 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd carbon-dashboard
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:3001
   ```

### 프로덕션 빌드
```bash
npm run build
npm run dev
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 글로벌 스타일 및 디자인 시스템
│   ├── layout.tsx         # 루트 레이아웃 (폰트 설정)
│   └── page.tsx          # 메인 대시보드 페이지
├── components/
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   │   ├── button.tsx   # 버튼 컴포넌트 (CVA 사용)
│   │   ├── card.tsx     # 카드 컴포넌트
│   │   └── badge.tsx    # 배지 컴포넌트
│   ├── navigation/       # 네비게이션 컴포넌트
│   │   ├── gnb.tsx      # 글로벌 네비게이션 바
│   │   └── sidebar.tsx  # 사이드바 네비게이션
│   └── dashboard/        # 대시보드 전용 컴포넌트
│       ├── enhanced-dashboard.tsx      # 메인 대시보드
│       ├── enhanced-metrics-cards.tsx  # 인터랙티브 메트릭 카드
│       ├── interactive-charts.tsx     # 다중 차트 시스템
│       ├── posts-section.tsx          # 게시물 관리
│       └── post-dialog.tsx            # 게시물 편집 다이얼로그
├── data/
│   └── seed.ts          # 샘플 데이터 및 시드 데이터
├── lib/
│   ├── api.ts          # API 레이어 (네트워크 시뮬레이션)
│   └── utils.ts        # 유틸리티 함수 (cn, 포맷팅 등)
├── store/
│   └── dashboard-store.ts # Zustand 상태 관리
└── types/
    └── index.ts        # TypeScript 타입 정의
```

## 디자인 시스템

### 색상 팔레트
```css
/* 환경 친화적 테마 */
--primary: #059669;        /* 메인 그린 */
--primary-light: #10b981;  /* 밝은 그린 */
--primary-dark: #047857;   /* 어두운 그린 */

/* 상태 색상 */
--success: #10b981;        /* 성공/감소 */
--warning: #d97706;        /* 주의/증가 */
--error: #dc2626;          /* 오류/위험 */
--info: #2563eb;           /* 정보/중립 */
```

### 타이포그래피
- **제목**: Pretendard, 700 weight, tight tracking
- **본문**: Pretendard, 400 weight, 1.6 line-height
- **코드**: Pretendard Mono, 400 weight
- **한국어 최적화**: word-break: keep-all

### 애니메이션 시스템
- **페이지 로드**: 순차적 슬라이드인 (0.1s 지연)
- **호버 효과**: 리프트, 스케일, 글로우
- **트랜지션**: 300ms ease-in-out
- **로딩**: 스켈레톤 애니메이션

## 아키텍처 설계

### 상태 관리 전략
**선택**: Zustand
**이유**: 
- Redux 대비 간단한 API
- TypeScript 지원 우수
- 작은 번들 사이즈
- 컴포넌트 리렌더링 최적화

```typescript
// 상태 구조
interface DashboardState {
  // 데이터 상태
  companies: Company[];
  posts: Post[];
  metrics: DashboardMetrics;
  
  // UI 상태
  selectedCompany: string | null;
  sidebarOpen: boolean;
  
  // 로딩 상태
  loading: LoadingState;
}
```

### 데이터 흐름
1. **초기 로드**: useEffect → API 호출 → Zustand 업데이트
2. **필터링**: 사용자 액션 → 상태 업데이트 → 컴포넌트 리렌더링
3. **실시간 업데이트**: 주기적 API 폴링 (시뮬레이션)

### 컴포넌트 설계 원칙
- **단일 책임**: 각 컴포넌트는 하나의 명확한 역할
- **재사용성**: UI 컴포넌트는 props로 커스터마이징 가능
- **성능**: React.memo, useMemo 적절히 활용
- **접근성**: ARIA 속성, 키보드 네비게이션 지원

## 데이터 모델

### 핵심 엔티티

```typescript
// 회사 (월별 배출량 포함)
type Company = {
  id: string;
  name: string;
  country: string; // 국가 코드
  emissions: GhgEmission[];
};

// 개별 배출량 기록
type GhgEmission = {
  yearMonth: string;  // "2024-01"
  source: string;     // "휘발유", "경유", "LPG" 등
  emissions: number;  // CO₂ 등가 톤
};

// 게시물 및 보고서
type Post = {
  id: string;
  title: string;
  resourceUid: string; // Company.id
  dateTime: string;    // "2024-02"
  content: string;
};
```

### 샘플 데이터
- **5개 회사**: 다양한 국가와 배출원 (에이크미 코퍼레이션, 글로벡스 인더스트리, 테크노 솔루션, 그린 에너지 코, 스마트 팩토리)
- **6개월 데이터**: 2024년 1-6월 월별 배출량 데이터
- **5개 게시물**: 지속가능성 보고서 및 업데이트

## 성능 최적화

### 렌더링 효율성
- **컴포넌트 메모이제이션**: React.memo로 불필요한 리렌더링 방지
- **상태 최적화**: Zustand의 선택적 구독으로 정확한 업데이트
- **차트 최적화**: Recharts의 ResponsiveContainer 활용
- **이미지 최적화**: Next.js Image 컴포넌트 사용

### 번들 최적화
- **트리 셰이킹**: 사용하지 않는 코드 제거
- **코드 스플리팅**: Next.js 자동 라우트 기반 분할
- **의존성 최적화**: 경량 라이브러리 선택 (Radix UI vs MUI)

### 네트워크 최적화
- **API 시뮬레이션**: 200-800ms 지연으로 실제 환경 모사
- **오류 처리**: 10-20% 실패율로 견고성 테스트
- **재시도 로직**: 지수 백오프 알고리즘 구현

## 오류 처리

### 네트워크 오류
- **시뮬레이션**: 10-20% 실패율로 실제 환경 모사
- **재시도 메커니즘**: 지수 백오프와 함께 자동 재시도
- **사용자 친화적 메시지**: 기술적 오류를 비즈니스 언어로 변환

### 로딩 상태
- **스켈레톤 로더**: 콘텐츠 구조를 미리 보여줌
- **점진적 로딩**: 중요한 데이터부터 우선 표시
- **낙관적 업데이트**: 사용자 액션에 즉각 반응

### 사용자 경험
- **오류 복구**: 명확한 액션 버튼 제공
- **상태 표시**: 로딩, 성공, 오류 상태 명확히 구분
- **접근성**: 스크린 리더 지원

## 반응형 디자인

### 브레이크포인트
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### 모바일 최적화
- **접을 수 있는 사이드바**: 오버레이 방식
- **터치 친화적 버튼**: 최소 44px 터치 영역
- **최적화된 차트**: 모바일에서도 가독성 확보
- **간소화된 네비게이션**: 햄버거 메뉴 활용

### 데스크톱 최적화
- **다중 컬럼 레이아웃**: 정보 밀도 최대화
- **호버 효과**: 마우스 인터랙션 활용
- **키보드 단축키**: 효율적인 작업 흐름

## 향후 개선사항

### 잠재적 기능
- **실시간 업데이트**: WebSocket 통합으로 실시간 데이터 동기화
- **고급 분석**: 머신러닝 기반 배출량 예측 및 인사이트
- **PDF 보고서**: 차트 데이터를 PDF 형태로 내보내기
- **사용자 관리**: 다중 사용자 및 권한 시스템
- **모바일 앱**: React Native 컴패니언 앱 개발

## 개발 노트

### 주요 설계 결정
1. **Zustand 선택**: Redux 대비 간단함과 TypeScript 지원으로 개발 효율성 향상
2. **Radix UI 활용**: 접근성과 커스터마이징의 균형을 맞춘 헤드리스 컴포넌트
3. **Recharts 선택**: React 생태계와의 호환성과 풍부한 차트 옵션
4. **Tailwind CSS**: 개발 속도와 일관성 확보를 위한 유틸리티 퍼스트 접근법
5. **Pretendard 폰트**: 한국어 가독성 최적화를 위한 웹폰트 선택

### 트레이드오프
1. **단순함 vs 기능**: 핵심 기능에 집중하여 복잡성 최소화
2. **성능 vs 번들 크기**: 필요한 기능만 포함하여 최적화
3. **커스텀 vs 라이브러리**: 무거운 라이브러리 대신 경량 솔루션 선택

### 학습 포인트
- **Next.js 14 App Router**: 최신 라우팅 시스템과 서버 컴포넌트 활용
- **Zustand**: 현대적 상태 관리 패턴과 TypeScript 통합
- **Radix UI**: 헤드리스 컴포넌트 설계와 접근성 고려사항
- **Recharts**: React 차트 라이브러리와 커스터마이징 기법
- **Tailwind CSS**: 유틸리티 퍼스트 CSS와 디자인 시스템 구축
- **커스텀 훅**: 로직 분리와 재사용성을 위한 React 패턴

## 커스텀 훅 (Custom Hooks)

이 프로젝트에서는 컴포넌트의 복잡성을 줄이고 로직을 재사용하기 위해 여러 커스텀 훅을 구현했습니다. 각 훅은 특정한 책임을 가지며, 컴포넌트 간에 로직을 공유할 수 있도록 설계되었습니다.

### 훅 목록 및 역할

| 훅 이름 | 파일 위치 | 주요 역할 |
|---------|-----------|-----------|
| `useDashboardData` | `src/hooks/useDashboardData.ts` | 대시보드 데이터 로딩 및 상태 관리 |
| `useNotifications` | `src/hooks/useNotifications.ts` | 알림 상태 및 읽음 처리 |
| `useClickOutside` | `src/hooks/useClickOutside.ts` | 외부 클릭 감지 |
| `useChartControls` | `src/hooks/useChartControls.ts` | 차트 제어 및 CSV 내보내기 |
| `usePostForm` | `src/hooks/usePostForm.ts` | 게시물 폼 상태 및 제출 처리 |

### 주요 훅 상세 설명

#### 1. useDashboardData

대시보드의 모든 데이터를 관리하는 핵심 훅입니다. API 호출, 로딩 상태, 에러 처리를 담당합니다.

```typescript
// src/hooks/useDashboardData.ts
import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { 
  fetchCompanies, 
  fetchPosts, 
  fetchCountries, 
  fetchDashboardMetrics 
} from '@/lib/api';

export function useDashboardData() {
  const {
    companiesLoading,
    postsLoading,
    countriesLoading,
    metricsLoading,
    metrics,
    error,
    setCompanies,
    setPosts,
    setCountries,
    setMetrics,
    setCompaniesLoading,
    setPostsLoading,
    setCountriesLoading,
    setMetricsLoading,
    setError,
  } = useDashboardStore();

  const loadData = async () => {
    try {
      setCompaniesLoading('loading');
      setPostsLoading('loading');
      setCountriesLoading('loading');
      setMetricsLoading('loading');
      setError(null);

      const [companies, posts, countries, metrics] = await Promise.all([
        fetchCompanies(),
        fetchPosts(),
        fetchCountries(),
        fetchDashboardMetrics(),
      ]);

      setCompanies(companies);
      setPosts(posts);
      setCountries(countries);
      setMetrics(metrics);
      
      setCompaniesLoading('success');
      setPostsLoading('success');
      setCountriesLoading('success');
      setMetricsLoading('success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '데이터 로딩에 실패했습니다';
      setError(errorMessage);
      setCompaniesLoading('error');
      setPostsLoading('error');
      setCountriesLoading('error');
      setMetricsLoading('error');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const isLoading = companiesLoading === 'loading' || 
                   postsLoading === 'loading' || 
                   countriesLoading === 'loading' || 
                   metricsLoading === 'loading';

  const hasError = companiesLoading === 'error' || postsLoading === 'error' ||
                  countriesLoading === 'error' || metricsLoading === 'error';

  return {
    isLoading,
    hasError,
    loadData,
    error,
    metrics,
    metricsLoading,
    companiesLoading
  };
}
```

**주요 특징:**
- **병렬 데이터 로딩**: Promise.all을 사용하여 모든 데이터를 동시에 로딩
- **세분화된 로딩 상태**: 각 데이터 타입별로 개별 로딩 상태 관리
- **에러 처리**: 통합된 에러 처리 및 사용자 친화적 메시지
- **재시도 기능**: loadData 함수를 외부에 노출하여 재시도 가능

#### 2. useChartControls

차트의 모든 상호작용을 관리하는 훅입니다. 차트 타입 변경, 날짜 필터링, CSV 내보내기 기능을 제공합니다.

```typescript
// src/hooks/useChartControls.ts
import { useState, useRef, useEffect } from 'react';

export type ChartType = 'line' | 'bar' | 'area' | 'scatter' | 'pie';

export interface ChartTypes {
  trend: ChartType;
  comparison: ChartType;
  efficiency: ChartType;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export function useChartControls() {
  const [chartTypes, setChartTypes] = useState<ChartTypes>({
    trend: 'line',
    comparison: 'bar',
    efficiency: 'pie',
  });
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y'>('6m');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: '',
    endDate: ''
  });
  
  const filterRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // 차트 타입 변경 함수
  const updateChartType = (chartKey: keyof ChartTypes, newType: ChartType) => {
    setChartTypes(prev => ({
      ...prev,
      [chartKey]: newType
    }));
  };

  // CSV 내보내기 함수
  const exportToCSV = (chartData: any[], companyComparisonData: any[]) => {
    const csvData = [];
    
    // 헤더 추가
    csvData.push(['차트 유형', '회사명', '날짜/월', '배출량(톤)', '효율성', '비고']);
    
    // 배출량 트렌드 데이터
    if (chartData && chartData.length > 0) {
      chartData.forEach(item => {
        csvData.push([
          '배출량 트렌드',
          item.company || '전체',
          item.monthFull || item.month,
          item.emissions || 0,
          '-',
          '트렌드 데이터'
        ]);
      });
    }
    
    // 회사별 비교 데이터
    if (companyComparisonData && companyComparisonData.length > 0) {
      companyComparisonData.forEach(item => {
        csvData.push([
          '회사별 비교',
          item.name,
          '전체',
          item.emissions || 0,
          item.efficiency || 0,
          '비교 데이터'
        ]);
      });
    }
    
    // CSV 문자열 생성
    const csvContent = csvData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
    
    // BOM 추가 (한글 깨짐 방지)
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;
    
    // 파일 다운로드
    const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    // 파일명 생성 (현재 날짜 포함)
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    link.setAttribute('download', `탄소배출량_차트데이터_${dateStr}_${timeStr}.csv`);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('CSV 파일이 성공적으로 다운로드되었습니다.');
  };

  return {
    chartTypes,
    timeRange,
    isFullscreen,
    hoveredData,
    isFilterOpen,
    dateRange,
    filterRef,
    setTimeRange,
    setIsFullscreen,
    setHoveredData,
    setIsFilterOpen,
    setDateRange,
    updateChartType,
    exportToCSV
  };
}
```

**주요 특징:**
- **개별 차트 타입 관리**: 각 차트마다 독립적인 타입 설정
- **외부 클릭 감지**: 팝오버나 모달의 외부 클릭 시 자동 닫기
- **CSV 내보내기**: 한글 지원을 위한 BOM 추가
- **날짜 범위 필터링**: 사용자 정의 날짜 범위 선택

#### 3. usePostForm

게시물 생성 및 편집을 위한 폼 상태를 관리하는 훅입니다.

```typescript
// src/hooks/usePostForm.ts
import { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { createOrUpdatePost } from '@/lib/api';
import { Post } from '@/types';

export function usePostForm(initialPost: Post | null, selectedCompanyId: string | null) {
  const { addPost, updatePost } = useDashboardStore();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    resourceUid: selectedCompanyId || '',
    dateTime: new Date().toISOString().slice(0, 7), // YYYY-MM format
  });
  const [loading, setLoading] = useState(false);
  const [error, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPost) {
      setFormData({
        title: initialPost.title,
        content: initialPost.content,
        resourceUid: initialPost.resourceUid,
        dateTime: initialPost.dateTime,
      });
    } else {
      setFormData({
        title: '',
        content: '',
        resourceUid: selectedCompanyId || '',
        dateTime: new Date().toISOString().slice(0, 7),
      });
    }
    setLocalError(null);
  }, [initialPost, selectedCompanyId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);

    try {
      const savedPost = await createOrUpdatePost({
        ...formData,
        id: initialPost?.id,
      });
      
      if (initialPost) {
        updatePost(savedPost);
      } else {
        addPost(savedPost);
      }
      return savedPost;
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : '게시물 저장에 실패했습니다');
      throw err; // Re-throw to allow component to catch if needed
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleInputChange,
    handleSubmit,
  };
}
```

**주요 특징:**
- **초기값 처리**: 편집 모드와 생성 모드를 자동으로 구분
- **폼 상태 관리**: 입력 필드별 개별 상태 관리
- **에러 처리**: 로컬 에러 상태와 글로벌 에러 상태 분리
- **API 통합**: Zustand 스토어와 API 호출을 통합

#### 4. useNotifications

알림 상태를 관리하는 간단한 훅입니다.

```typescript
// src/hooks/useNotifications.ts
import { useState, useMemo } from 'react';

interface Notification {
  id: number;
  message: string;
  type: 'warning' | 'info' | 'success';
  time: string;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: '에이크미 코퍼레이션의 배출량이 목표를 초과했습니다', type: 'warning', time: '2분 전', read: false },
    { id: 2, message: '새로운 지속가능성 보고서가 업로드되었습니다', type: 'info', time: '15분 전', read: false },
    { id: 3, message: '글로벡스 인더스트리가 탄소 중립 목표를 달성했습니다', type: 'success', time: '1시간 전', read: true },
  ]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    setNotifications // Optionally expose setter for adding new notifications
  };
}
```

#### 5. useClickOutside

외부 클릭을 감지하는 재사용 가능한 훅입니다.

```typescript
// src/hooks/useClickOutside.ts
import { useEffect, RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
```

### 훅 사용 예시

컴포넌트에서 훅을 사용하는 방법:

```typescript
// src/components/dashboard/enhanced-dashboard.tsx
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNotifications } from '@/hooks/useNotifications';
import { useClickOutside } from '@/hooks/useClickOutside';

export function EnhancedDashboard() {
  const { companies, selectedCompany } = useDashboardStore();
  const { isLoading, hasError, loadData, error, metrics, metricsLoading } = useDashboardData();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useClickOutside(notificationRef, () => setIsNotificationOpen(false));

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">데이터 로딩 실패</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={loadData}>다시 시도</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 알림 버튼 */}
      <div className="relative" ref={notificationRef}>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        >
          <Bell className="w-4 h-4 mr-2" />
          알림
          <Badge variant="destructive" className="ml-2 w-5 h-5 text-xs p-0 flex items-center justify-center">
            {unreadCount}
          </Badge>
        </Button>
        
        {isNotificationOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50">
            {/* 알림 내용 */}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={markAllAsRead}
            >
              모든 알림 읽음으로 표시
            </Button>
          </div>
        )}
      </div>

      {/* 메트릭 카드 */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <EnhancedMetricsCards 
          metrics={metrics} 
          loading={metricsLoading === 'loading'} 
        />
      )}
    </div>
  );
}
```

### 훅 설계 원칙

1. **단일 책임**: 각 훅은 하나의 명확한 기능만 담당
2. **재사용성**: 여러 컴포넌트에서 동일한 로직을 공유할 수 있도록 설계
3. **타입 안전성**: TypeScript를 활용한 완전한 타입 지원
4. **에러 처리**: 각 훅에서 적절한 에러 처리 및 복구 메커니즘 제공
5. **성능 최적화**: 불필요한 리렌더링을 방지하는 메모이제이션 활용

---

**HanaLoop을 위한 탄소 관리 플랫폼**

*지속가능한 미래를 위한 기술 솔루션을 만들어갑니다.*

---

## 라이선스

이 프로젝트는 HanaLoop 프론트엔드 개발 과제를 위해 개발되었습니다.
