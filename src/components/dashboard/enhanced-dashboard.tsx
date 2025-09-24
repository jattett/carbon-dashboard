'use client';

import { useState, useRef } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { SidebarToggle } from '@/components/navigation/sidebar';
import { EnhancedMetricsCards } from './enhanced-metrics-cards';
import { InteractiveCharts } from './interactive-charts';
import { PostsSection } from './posts-section';
import { AlertCircle, RefreshCw, Bell, Settings, Zap, Target, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  WelcomeSkeleton,
  MetricsCardSkeleton,
  ChartSkeleton
} from '@/components/ui/skeleton';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useNotifications } from '@/hooks/useNotifications';
import { useClickOutside } from '@/hooks/useClickOutside';

export function EnhancedDashboard() {
  const { companies, selectedCompany } = useDashboardStore();
  const { isLoading, hasError, loadData, error, metrics, metricsLoading, companiesLoading } = useDashboardData();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useClickOutside(notificationRef, () => setIsNotificationOpen(false));

  if (hasError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">데이터 로드 실패</h3>
              <p className="text-muted-foreground mb-4">
                {error || '대시보드 데이터를 로드하는 중 문제가 발생했습니다.'}
              </p>
              <Button onClick={loadData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                다시 시도
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Enhanced Header */}
      <header className="glass-card border-b border-border/50 px-6 py-4 sticky top-0 z-40 animate-slide-in-top">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarToggle />
            <div>
              <h1 className="text-3xl font-bold gradient-text font-heading tracking-tight">
                탄소 배출량 대시보드
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                조직의 탄소 발자국을 모니터링하고 관리하세요
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {metrics?.totalCompanies || 0}
                </div>
                <div className="text-xs text-muted-foreground">활성 회사</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {metrics?.totalEmissions ? Math.round(metrics.totalEmissions / 1000) : 0}K
                </div>
                <div className="text-xs text-muted-foreground">총 배출량(톤)</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${metrics?.trendPercentage && metrics.trendPercentage < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics?.trendPercentage ? `${metrics.trendPercentage > 0 ? '+' : ''}${metrics.trendPercentage.toFixed(1)}%` : '0%'}
                </div>
                <div className="text-xs text-muted-foreground">트렌드</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {selectedCompany && (
                <Badge variant="secondary" className="hidden sm:flex">
                  <Target className="w-3 h-3 mr-1" />
                  {companies.find(c => c.id === selectedCompany)?.name}
                </Badge>
              )}
              
              <Button variant="outline" size="sm" onClick={loadData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
              
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

                {/* Notification Popup */}
                {isNotificationOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">알림</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => setIsNotificationOpen(false)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground text-sm">
                          새로운 알림이 없습니다
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors duration-200 cursor-pointer ${
                              !notification.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.type === 'success' ? "bg-green-500" :
                                notification.type === 'warning' ? "bg-yellow-500" :
                                "bg-blue-500"
                              }`} />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-foreground">
                                  {notification.type === 'success' ? '목표 달성' :
                                   notification.type === 'warning' ? '주의 필요' :
                                   '정보'}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-border">
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
                )}
              </div>
              
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Welcome Section */}
        {isLoading ? (
          <WelcomeSkeleton />
        ) : (
          <Card className="glass-card border-green-200/50 hover-lift neon-glow">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold gradient-text font-heading mb-3">환영합니다! 🌱</h2>
                  <p className="text-muted-foreground mb-6 font-body leading-relaxed">
                    오늘은 지속가능한 미래를 위한 또 다른 날입니다. 
                    {metrics?.trendPercentage && metrics.trendPercentage < 0 
                      ? ' 배출량이 감소하고 있어 좋은 소식입니다!' 
                      : ' 배출량을 줄이기 위한 노력을 계속해보세요.'}
                  </p>
                  <div className="flex space-x-3">
                    <Button size="sm" className="gradient-green text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      <Zap className="w-4 h-4 mr-2" />
                      최적화 제안 보기
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-accent/50 transition-all duration-300">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      목표 설정
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block ml-8">
                  <div className="w-32 h-32 gradient-green rounded-full flex items-center justify-center shadow-2xl">
                    <TrendingUp className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Metrics Cards */}
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

        {/* Interactive Charts */}
        {isLoading ? (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <InteractiveCharts 
            companies={companies}
            selectedCompany={selectedCompany}
            loading={companiesLoading === 'loading'}
          />
        )}

        {/* Posts Section */}
        <PostsSection />
      </main>
    </div>
  );
}
