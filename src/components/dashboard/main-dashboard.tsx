'use client';

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { SidebarToggle } from '@/components/navigation/sidebar';
import { MetricsCards } from './metrics-cards';
import { EmissionsChart } from './emissions-chart';
import { PostsSection } from './posts-section';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  fetchCompanies, 
  fetchPosts, 
  fetchCountries, 
  fetchDashboardMetrics 
} from '@/lib/api';

export function MainDashboard() {
  const {
    companies,
    posts,
    countries,
    metrics,
    companiesLoading,
    postsLoading,
    countriesLoading,
    metricsLoading,
    selectedCompany,
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
      setError(null);
      
      // Load all data in parallel
      const [companiesData, postsData, countriesData, metricsData] = await Promise.all([
        fetchCompanies().then(data => {
          setCompanies(data);
          setCompaniesLoading('success');
          return data;
        }).catch(err => {
          setCompaniesLoading('error');
          throw err;
        }),
        
        fetchPosts().then(data => {
          setPosts(data);
          setPostsLoading('success');
          return data;
        }).catch(err => {
          setPostsLoading('error');
          throw err;
        }),
        
        fetchCountries().then(data => {
          setCountries(data);
          setCountriesLoading('success');
          return data;
        }).catch(err => {
          setCountriesLoading('error');
          throw err;
        }),
        
        fetchDashboardMetrics().then(data => {
          setMetrics(data);
          setMetricsLoading('success');
          return data;
        }).catch(err => {
          setMetricsLoading('error');
          throw err;
        }),
      ]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터 로드에 실패했습니다');
    }
  };

  useEffect(() => {
    // Set loading states
    setCompaniesLoading('loading');
    setPostsLoading('loading');
    setCountriesLoading('loading');
    setMetricsLoading('loading');
    
    loadData();
  }, []);

  const isLoading = companiesLoading === 'loading' || postsLoading === 'loading' || 
                   countriesLoading === 'loading' || metricsLoading === 'loading';

  const hasError = companiesLoading === 'error' || postsLoading === 'error' || 
                  countriesLoading === 'error' || metricsLoading === 'error';

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
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarToggle />
            <div>
              <h1 className="text-2xl font-bold">탄소 배출량 대시보드</h1>
              <p className="text-sm text-muted-foreground">
                조직의 탄소 발자국을 모니터링하고 관리하세요
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {selectedCompany && (
              <div className="text-sm text-muted-foreground">
                조회 중: <span className="font-medium text-foreground">
                  {companies.find(c => c.id === selectedCompany)?.name}
                </span>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={loadData} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Metrics Cards */}
        <MetricsCards 
          metrics={metrics} 
          loading={metricsLoading === 'loading'} 
        />

        {/* Charts */}
        <EmissionsChart 
          companies={companies}
          selectedCompany={selectedCompany}
          loading={companiesLoading === 'loading'}
        />

        {/* Posts Section */}
        <PostsSection />
      </main>
    </div>
  );
}
