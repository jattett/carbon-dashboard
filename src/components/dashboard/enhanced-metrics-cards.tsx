'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Factory, 
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { DashboardMetrics } from '@/types';
import { formatEmissions, formatPercentage } from '@/lib/utils';
import { useState } from 'react';

interface EnhancedMetricsCardsProps {
  metrics: DashboardMetrics | null;
  loading: boolean;
}

export function EnhancedMetricsCards({ metrics, loading }: EnhancedMetricsCardsProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse hover:shadow-lg transition-all duration-300">
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

  const getStatusBadge = (trend: number) => {
    if (trend > 5) return { variant: 'destructive' as const, text: '주의 필요', icon: AlertCircle };
    if (trend < -5) return { variant: 'success' as const, text: '목표 달성', icon: CheckCircle2 };
    return { variant: 'secondary' as const, text: '안정적', icon: Info };
  };

  const cards = [
    {
      id: 'total',
      title: '총 배출량',
      icon: Factory,
      value: formatEmissions(metrics.totalEmissions),
      trend: metrics.trendPercentage,
      description: '이전 기간 대비',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800',
      details: [
        { label: '월평균', value: `${Math.round(metrics.totalEmissions / 6)} 톤` },
        { label: '일평균', value: `${Math.round(metrics.totalEmissions / 180)} 톤` },
        { label: '목표 대비', value: '85%' }
      ]
    },
    {
      id: 'average',
      title: '회사당 평균',
      icon: Target,
      value: formatEmissions(metrics.averageEmissions),
      trend: 0,
      description: `${metrics.totalCompanies}개 회사 기준`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800',
      details: [
        { label: '최고 배출', value: `${Math.round(metrics.averageEmissions * 1.5)} 톤` },
        { label: '최저 배출', value: `${Math.round(metrics.averageEmissions * 0.5)} 톤` },
        { label: '표준편차', value: '±15%' }
      ]
    },
    {
      id: 'top',
      title: '최대 배출 회사',
      icon: Globe,
      value: metrics.topEmittingCompany,
      trend: 0,
      description: '이번 기간 최대 배출량',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950',
      borderColor: 'border-orange-200 dark:border-orange-800',
      details: [
        { label: '배출량', value: `${Math.round(metrics.averageEmissions * 1.8)} 톤` },
        { label: '점유율', value: '18%' },
        { label: '증감률', value: '+12%' }
      ]
    },
    {
      id: 'trend',
      title: '배출량 트렌드',
      icon: TrendingUp,
      value: formatPercentage(metrics.trendPercentage),
      trend: metrics.trendPercentage,
      description: metrics.trendPercentage > 5 ? '증가' : metrics.trendPercentage < -5 ? '감소' : '안정',
      color: metrics.trendPercentage > 5 ? 'from-red-500 to-red-600' : 
             metrics.trendPercentage < -5 ? 'from-green-500 to-green-600' : 
             'from-gray-500 to-gray-600',
      bgColor: metrics.trendPercentage > 5 ? 'bg-red-50 dark:bg-red-950' : 
               metrics.trendPercentage < -5 ? 'bg-green-50 dark:bg-green-950' : 
               'bg-gray-50 dark:bg-gray-950',
      borderColor: metrics.trendPercentage > 5 ? 'border-red-200 dark:border-red-800' : 
                   metrics.trendPercentage < -5 ? 'border-green-200 dark:border-green-800' : 
                   'border-gray-200 dark:border-gray-800',
      details: [
        { label: '전월 대비', value: formatPercentage(metrics.trendPercentage) },
        { label: '연간 예측', value: formatPercentage(metrics.trendPercentage * 12) },
        { label: '목표 달성', value: metrics.trendPercentage < -5 ? '95%' : '60%' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const isExpanded = expandedCard === card.id;
        const statusBadge = getStatusBadge(card.trend);
        const StatusIcon = statusBadge.icon;

        return (
    <Card 
      key={card.id}
      className={cn(
        'group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover-lift hover-glow fade-in-up',
        card.bgColor,
        card.borderColor,
        isExpanded && 'shadow-xl -translate-y-1'
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => setExpandedCard(isExpanded ? null : card.id)}
    >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br', card.color)}>
                    <card.icon className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                </div>
                <Badge variant={statusBadge.variant} className="text-xs">
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusBadge.text}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  {getTrendIcon(card.trend)}
                  <span className={getTrendColor(card.trend)}>
                    {card.description}
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="space-y-2 pt-2 border-t border-border fade-in-up">
                  <div className="text-xs font-medium text-muted-foreground mb-2">상세 정보</div>
                  {card.details.map((detail, index) => (
                    <div key={index} className="flex justify-between items-center text-xs fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                      <span className="text-muted-foreground">{detail.label}</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-2 text-xs fade-in-up"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle action
                    }}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    상세 분석 보기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
