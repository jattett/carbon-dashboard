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

  // 외부 클릭 감지 (useEffect로 직접 구현)
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
    
    // 효율성 분석 데이터
    if (companyComparisonData && companyComparisonData.length > 0) {
      companyComparisonData.forEach(item => {
        csvData.push([
          '효율성 분석',
          item.name,
          '전체',
          '-',
          item.efficiency || 0,
          '효율성 데이터'
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
