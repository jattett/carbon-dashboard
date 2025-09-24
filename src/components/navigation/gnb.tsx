'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  BarChart3, 
  Settings, 
  Bell, 
  User, 
  Search,
  Menu,
  X,
  TrendingUp
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard-store';
import { cn } from '@/lib/utils';

export function GNB() {
  const { metrics, error } = useDashboardStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { icon: Home, label: '홈', href: '/', active: true },
    { icon: BarChart3, label: '대시보드', href: '/dashboard', active: false },
    { icon: Settings, label: '설정', href: '/settings', active: false },
  ];

  const getStatusColor = () => {
    if (error) return 'bg-red-500';
    if (metrics?.trendPercentage && metrics.trendPercentage > 5) return 'bg-yellow-500';
    if (metrics?.trendPercentage && metrics.trendPercentage < -5) return 'bg-green-500';
    return 'bg-blue-500';
  };



  // 알림 데이터
  const notifications = [
    {
      id: 1,
      title: '배출량 목표 달성',
      message: '이번 달 배출량 목표를 95% 달성했습니다.',
      time: '5분 전',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: '새로운 보고서',
      message: '2024년 3분기 지속가능성 보고서가 업로드되었습니다.',
      time: '1시간 전',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: '시스템 업데이트',
      message: '대시보드가 새로운 기능으로 업데이트되었습니다.',
      time: '2시간 전',
      type: 'warning',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // 외부 클릭 감지
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="glass-card border-b border-border/50 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-green rounded-xl flex items-center justify-center shadow-lg neon-glow cursor-pointer">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text font-heading tracking-tight cursor-pointer">
                  HanaLoop
                </h1>
                <p className="text-xs text-muted-foreground font-medium">탄소 관리 플랫폼</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? 'default' : 'ghost'}
                className={cn(
                  'relative px-6 py-3 transition-all duration-300 font-medium rounded-xl',
                  item.active 
                    ? 'gradient-green text-white shadow-lg hover:shadow-xl' 
                    : 'hover:bg-accent/50 hover:text-foreground'
                )}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
                {item.active && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 gradient-green rounded-full pulse-glow" />
                )}
              </Button>
            ))}
          </div>

          {/* Status and Actions */}
          <div className="flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className={cn('w-2 h-2 rounded-full', getStatusColor())} />
              <span className="text-sm text-muted-foreground">
                {error ? '오류' : 
                 metrics?.trendPercentage && metrics.trendPercentage > 5 ? '주의' :
                 metrics?.trendPercentage && metrics.trendPercentage < -5 ? '양호' : '정상'}
              </span>
            </div>

            {/* Search */}
            <div className="hidden sm:flex items-center" ref={searchRef}>
              {isSearchOpen ? (
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }
                        if (e.key === 'Enter') {
                          // 검색 로직 구현
                          console.log('검색:', searchQuery);
                        }
                      }}
                      className="pl-10 pr-4 py-2 w-64 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      autoFocus
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-accent/50 rounded-xl transition-all duration-300"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-accent/50 rounded-xl transition-all duration-300"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-accent/50 rounded-xl transition-all duration-300"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center gradient-orange text-white shadow-lg pulse-glow"
                  >
                    {unreadCount}
                  </Badge>
                )}
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
                          className={cn(
                            "p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors duration-200 cursor-pointer",
                            !notification.read && "bg-blue-50/50 dark:bg-blue-950/20"
                          )}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={cn(
                              "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                              notification.type === 'success' && "bg-green-500",
                              notification.type === 'warning' && "bg-yellow-500",
                              notification.type === 'info' && "bg-blue-500"
                            )} />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-foreground">
                                {notification.title}
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
                      >
                        모든 알림 읽음으로 표시
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Profile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex hover:bg-accent/50 rounded-xl transition-all duration-300"
            >
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  variant={item.active ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              <div className="pt-2 border-t border-border">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div className={cn('w-2 h-2 rounded-full', getStatusColor())} />
                  <span className="text-sm text-muted-foreground">
                    시스템 상태: {error ? '오류' : '정상'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
