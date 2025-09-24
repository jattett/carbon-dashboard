'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  Scatter,
  ScatterChart,
  ComposedChart
} from 'recharts';
import { Company } from '@/types';
import { formatEmissions, getMonthName } from '@/lib/utils';
import { useChartControls } from '@/hooks/useChartControls';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  Zap,
  Filter,
  Download,
  Maximize2,
  Minimize2,
  X,
  Calendar
} from 'lucide-react';

interface InteractiveChartsProps {
  companies: Company[];
  selectedCompany: string | null;
  loading: boolean;
}

const CHART_COLORS = [
  '#00d4aa', '#00b894', '#00a085', '#55a3ff', '#74b9ff',
  '#a29bfe', '#fd79a8', '#fdcb6e', '#e17055', '#6c5ce7',
  '#00cec9', '#81ecec', '#fab1a0', '#e84393', '#0984e3'
];

export function InteractiveCharts({ companies, selectedCompany, loading }: InteractiveChartsProps) {
  const {
    chartTypes,
    timeRange,
    isFullscreen,
    hoveredData,
    isFilterOpen,
    dateRange,
    filterRef,
    setTimeRange,
    setIsFullscreen,
    setIsFilterOpen,
    setDateRange,
    updateChartType,
    exportToCSV
  } = useChartControls();

  // 데이터 준비
  const chartData = useMemo(() => {
    if (selectedCompany) {
      const company = companies.find(c => c.id === selectedCompany);
      if (!company) return [];
      
      return company.emissions.map(emission => ({
        month: getMonthName(emission.yearMonth),
        monthFull: emission.yearMonth,
        emissions: emission.emissions,
        company: company.name,
      })).sort((a, b) => a.monthFull.localeCompare(b.monthFull));
    }

    const allCompaniesTimeSeries = companies.reduce((acc, company) => {
      company.emissions.forEach(emission => {
        const existing = acc.find(item => item.month === getMonthName(emission.yearMonth));
        if (existing) {
          existing.emissions += emission.emissions;
          existing.companies = (existing.companies || 0) + 1;
        } else {
          acc.push({
            month: getMonthName(emission.yearMonth),
            monthFull: emission.yearMonth,
            emissions: emission.emissions,
            companies: 1,
            company: company.name,
          });
        }
      });
      return acc;
    }, [] as { monthFull: string; emissions: number; company: string; month?: string; companies?: number }[]).sort((a, b) => a.monthFull.localeCompare(b.monthFull));

    return allCompaniesTimeSeries;
  }, [companies, selectedCompany]);

  const companyComparisonData = useMemo(() => {
    return companies.map(company => {
      const totalEmissions = company.emissions.reduce((sum, emission) => sum + emission.emissions, 0);
      const avgEmissions = totalEmissions / company.emissions.length;
      const trend = company.emissions.length > 1 ? 
        ((company.emissions[company.emissions.length - 1].emissions - company.emissions[0].emissions) / company.emissions[0].emissions) * 100 : 0;
      
      return {
        name: company.name,
        emissions: totalEmissions,
        avgEmissions,
        trend,
        country: company.country,
        efficiency: Math.round((1000 / totalEmissions) * 100) / 100, // 효율성 점수
      };
    });
  }, [companies]);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string; dataKey?: string }[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-xl backdrop-blur-sm">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry: { name: string; value: number; color: string; dataKey?: string }, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.dataKey || entry.name}:</span>
              <span className="font-medium">{formatEmissions(entry.value)}</span>
            </div>
          ))}
          {hoveredData && (
            <div className="mt-2 pt-2 border-t border-border">
              <div className="text-xs text-muted-foreground">
                효율성: {hoveredData.efficiency}점
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const ChartTypeSelector = ({ chartKey, availableTypes }: { chartKey: keyof typeof chartTypes, availableTypes: string[] }) => (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">차트 유형:</span>
      <div className="flex space-x-1">
        {[
          { type: 'line', icon: TrendingUp, label: '선형' },
          { type: 'bar', icon: BarChart3, label: '막대' },
          { type: 'area', icon: Activity, label: '영역' },
          { type: 'scatter', icon: PieChartIcon, label: '산점' },
          { type: 'pie', icon: PieChartIcon, label: '원형' },
        ].filter(({ type }) => availableTypes.includes(type))
        .map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant={chartTypes[chartKey] === type ? 'default' : 'ghost'}
            size="sm"
            onClick={() => updateChartType(chartKey, type as 'line' | 'bar' | 'area' | 'scatter' | 'pie')}
            className="h-8 px-3"
          >
            <Icon className="w-3 h-3 mr-1" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );

  const TimeRangeSelector = () => (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">기간:</span>
      <div className="flex space-x-1">
        {[
          { range: '3m', label: '3개월' },
          { range: '6m', label: '6개월' },
          { range: '1y', label: '1년' },
        ].map(({ range, label }) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setTimeRange(range as '3m' | '6m' | '1y')}
            className="h-8 px-3"
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderChart = (chartKey: keyof typeof chartTypes): React.ReactElement => {
    if (!chartData || chartData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <div className="text-lg mb-2">📊</div>
            <div>데이터가 없습니다</div>
          </div>
        </div>
      );
    }

    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartTypes[chartKey]) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}t`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="emissions" 
              stroke="#00d4aa" 
              strokeWidth={3}
              dot={{ fill: '#00d4aa', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#00d4aa', strokeWidth: 2 }}
            />
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}t`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="emissions" 
              fill="#00d4aa"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}t`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="emissions" 
              stroke="#00d4aa" 
              fill="#00d4aa"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        );
      
      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${value}t`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              dataKey="emissions" 
              fill="#00d4aa"
              r={6}
            />
          </ScatterChart>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <div className="text-lg mb-2">❌</div>
              <div>지원하지 않는 차트 타입입니다</div>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <TimeRangeSelector />
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative" ref={filterRef}>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                필터
                {(dateRange.startDate || dateRange.endDate) && (
                  <Badge variant="secondary" className="ml-2 w-5 h-5 text-xs p-0 flex items-center justify-center">
                    !
                  </Badge>
                )}
              </Button>

              {/* Date Filter Popup */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gradient-to-br from-card via-card to-card/95 border border-border/50 rounded-2xl shadow-2xl z-50 backdrop-blur-sm animate-slide-in-top">
                  {/* Header with gradient */}
                  <div className="p-4 border-b border-border/30 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          날짜 필터
                        </h3>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-200"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        <X className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-5 bg-gradient-to-br from-slate-50/30 to-blue-50/20 dark:from-slate-900/30 dark:to-blue-950/10">
                    {/* Date Range Picker */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                        <span>날짜 범위 선택</span>
                      </label>
                      
                      {/* Custom Calendar Grid */}
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-border/30">
                        <div className="grid grid-cols-7 gap-1 mb-3">
                          {/* Day headers */}
                          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                            <div key={day} className="text-xs font-medium text-center text-muted-foreground py-2">
                              {day}
                            </div>
                          ))}
                          
                          {/* Calendar days */}
                          {Array.from({ length: 35 }, (_, i) => {
                            const today = new Date();
                            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                            const startDate = new Date(firstDay);
                            startDate.setDate(startDate.getDate() - firstDay.getDay());
                            const currentDate = new Date(startDate);
                            currentDate.setDate(startDate.getDate() + i);
                            
                            const isCurrentMonth = currentDate.getMonth() === today.getMonth();
                            const isToday = currentDate.toDateString() === today.toDateString();
                            const isSelected = dateRange.startDate === currentDate.toISOString().split('T')[0] || 
                                            dateRange.endDate === currentDate.toISOString().split('T')[0];
                            const isInRange = dateRange.startDate && dateRange.endDate && 
                                           currentDate >= new Date(dateRange.startDate) && 
                                           currentDate <= new Date(dateRange.endDate);
                            
                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  const dateStr = currentDate.toISOString().split('T')[0];
                                  if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
                                    setDateRange({ startDate: dateStr, endDate: '' });
                                  } else if (dateRange.startDate && !dateRange.endDate) {
                                    if (new Date(dateStr) >= new Date(dateRange.startDate)) {
                                      setDateRange(prev => ({ ...prev, endDate: dateStr }));
                                    } else {
                                      setDateRange({ startDate: dateStr, endDate: '' });
                                    }
                                  }
                                }}
                                className={`
                                  text-xs p-2 rounded-lg transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-900/30
                                  ${!isCurrentMonth ? 'text-muted-foreground/50' : 'text-foreground'}
                                  ${isToday ? 'bg-blue-500 text-white font-semibold' : ''}
                                  ${isSelected ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold' : ''}
                                  ${isInRange && !isSelected ? 'bg-blue-100 dark:bg-blue-900/20' : ''}
                                `}
                              >
                                {currentDate.getDate()}
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* Month Navigation */}
                        <div className="flex items-center justify-between">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            onClick={() => {
                              // Previous month logic would go here
                            }}
                          >
                            ←
                          </Button>
                          <span className="text-sm font-medium">
                            {new Date().getFullYear()}년 {new Date().getMonth() + 1}월
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            onClick={() => {
                              // Next month logic would go here
                            }}
                          >
                            →
                          </Button>
                        </div>
                      </div>
                      
                      {/* Selected Date Display */}
                      {(dateRange.startDate || dateRange.endDate) && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-3 border border-border/30">
                          <div className="text-xs text-muted-foreground mb-1">선택된 날짜</div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="font-medium">
                                {dateRange.startDate ? new Date(dateRange.startDate).toLocaleDateString('ko-KR') : '시작일 미선택'}
                              </span>
                            </div>
                            <span className="text-muted-foreground">~</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                              <span className="font-medium">
                                {dateRange.endDate ? new Date(dateRange.endDate).toLocaleDateString('ko-KR') : '종료일 미선택'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Date Presets */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                        <span>빠른 선택</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-8 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors duration-200"
                          onClick={() => {
                            const today = new Date();
                            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                            setDateRange({
                              startDate: weekAgo.toISOString().split('T')[0],
                              endDate: today.toISOString().split('T')[0]
                            });
                          }}
                        >
                          최근 1주
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-8 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors duration-200"
                          onClick={() => {
                            const today = new Date();
                            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                            setDateRange({
                              startDate: monthAgo.toISOString().split('T')[0],
                              endDate: today.toISOString().split('T')[0]
                            });
                          }}
                        >
                          최근 1개월
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-3 border-t border-border/30">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs h-9 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-300 transition-all duration-200"
                        onClick={() => {
                          setDateRange({ startDate: '', endDate: '' });
                          setIsFilterOpen(false);
                        }}
                      >
                        <X className="w-3 h-3 mr-1" />
                        초기화
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs h-9 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        적용
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportToCSV(chartData, companyComparisonData)}
              className="hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-300 transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV 내보내기
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Charts Grid */}
      <div className={`grid gap-6 ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* Main Trend Chart */}
        <Card className="hover:shadow-xl transition-all duration-300 hover-lift bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    배출량 트렌드
                  </span>
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                    {selectedCompany ? '회사별 보기' : '전체 회사'}
                  </Badge>
                </div>
              </CardTitle>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">실시간</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <ChartTypeSelector chartKey="trend" availableTypes={['line', 'bar', 'area', 'scatter']} />
            </div>
            <div className="h-96 bg-gradient-to-br from-slate-50/50 to-blue-50/30 rounded-xl p-4 border border-border/30">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart('trend')}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Company Comparison */}
        <Card className="hover:shadow-xl transition-all duration-300 hover-lift bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  회사별 비교
                </span>
                <p className="text-xs text-muted-foreground mt-1">배출량 vs 효율성 분석</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <ChartTypeSelector chartKey="comparison" availableTypes={['line', 'bar', 'area', 'scatter']} />
            </div>
            <div className="h-96 bg-gradient-to-br from-slate-50/50 to-green-50/30 rounded-xl p-4 border border-border/30">
              <ResponsiveContainer width="100%" height="100%">
                {chartTypes.comparison === 'bar' ? (
                  <ComposedChart data={companyComparisonData}>
                  <defs>
                    <linearGradient id="emissionsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#00b894" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#74b9ff" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#0984e3" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${value}t`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="emissions" 
                    fill="url(#emissionsGradient)" 
                    name="총 배출량"
                    radius={[4, 4, 0, 0]}
                    stroke="#00b894"
                    strokeWidth={1}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#74b9ff" 
                    name="효율성" 
                    strokeWidth={3}
                    dot={{ fill: '#74b9ff', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#74b9ff', strokeWidth: 2 }}
                  />
                </ComposedChart>
                ) : (
                  renderChart('comparison')
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Analysis */}
        <Card className="hover:shadow-xl transition-all duration-300 hover-lift bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <PieChartIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  효율성 분석
                </span>
                <p className="text-xs text-muted-foreground mt-1">회사별 효율성 분포</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="mb-4">
              <ChartTypeSelector chartKey="efficiency" availableTypes={['pie', 'bar', 'area']} />
            </div>
            <div className="h-96 bg-gradient-to-br from-slate-50/50 to-purple-50/30 rounded-xl p-4 border border-border/30">
              <ResponsiveContainer width="100%" height="100%">
                {chartTypes.efficiency === 'pie' ? (
                  <PieChart>
                  <defs>
                    {companyComparisonData.map((_, index) => (
                      <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.8}/>
                        <stop offset="100%" stopColor={CHART_COLORS[index % CHART_COLORS.length]} stopOpacity={0.4}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={companyComparisonData.map(company => ({
                      name: company.name,
                      value: company.efficiency,
                      emissions: company.emissions
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    innerRadius={30}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {companyComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#pieGradient${index})`} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
                ) : (
                  renderChart('efficiency')
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Insights */}
        <Card className="hover:shadow-xl transition-all duration-300 hover-lift bg-gradient-to-br from-card to-card/50 border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  실시간 인사이트
                </span>
                <p className="text-xs text-muted-foreground mt-1">AI 기반 분석 결과</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl border border-green-200/50 shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-1">-8.2%</div>
                  <div className="text-sm text-green-700 font-medium">이번 주 감소율</div>
                  <div className="text-xs text-green-600 mt-1">🎉 목표 달성!</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-xl border border-blue-200/50 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                  <div className="text-sm text-blue-700 font-medium">목표 달성률</div>
                  <div className="text-xs text-blue-600 mt-1">📊 우수한 성과</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">에이크미 코퍼레이션</span>
                  <Badge variant="success">우수</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">글로벡스 인더스트리</span>
                  <Badge variant="warning">주의</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded">
                  <span className="text-sm">테크플로우 솔루션</span>
                  <Badge variant="success">우수</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
