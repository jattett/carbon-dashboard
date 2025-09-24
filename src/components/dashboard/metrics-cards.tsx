'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Factory, 
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { DashboardMetrics } from '@/types';
import { formatEmissions, formatPercentage, getTrendColor, getTrendIcon } from '@/lib/utils';

interface MetricsCardsProps {
  metrics: DashboardMetrics | null;
  loading: boolean;
}

export function MetricsCards({ metrics, loading }: MetricsCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const getTrendIcon = (trend: number) => {
    if (trend > 5) return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    if (trend < -5) return <ArrowDownRight className="w-4 h-4 text-green-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 5) return 'text-red-600';
    if (trend < -5) return 'text-green-600';
    return 'text-gray-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Emissions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 배출량</CardTitle>
          <Factory className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatEmissions(metrics.totalEmissions)}</div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            {getTrendIcon(metrics.trendPercentage)}
            <span className={getTrendColor(metrics.trendPercentage)}>
              이전 기간 대비 {formatPercentage(metrics.trendPercentage)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Average Emissions */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">회사당 평균</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatEmissions(metrics.averageEmissions)}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.totalCompanies}개 회사 기준
          </p>
        </CardContent>
      </Card>

      {/* Top Emitting Company */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">최대 배출 회사</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold truncate">{metrics.topEmittingCompany}</div>
          <p className="text-xs text-muted-foreground">
            이번 기간 최대 배출량
          </p>
        </CardContent>
      </Card>

      {/* Trend Indicator */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">배출량 트렌드</CardTitle>
          {metrics.trendPercentage > 5 ? (
            <TrendingUp className="h-4 w-4 text-red-500" />
          ) : metrics.trendPercentage < -5 ? (
            <TrendingDown className="h-4 w-4 text-green-500" />
          ) : (
            <Minus className="h-4 w-4 text-gray-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getTrendColor(metrics.trendPercentage)}`}>
            {formatPercentage(metrics.trendPercentage)}
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics.trendPercentage > 5 ? '증가' : 
             metrics.trendPercentage < -5 ? '감소' : '안정'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
