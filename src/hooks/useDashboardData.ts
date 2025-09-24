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
      setError(null);
      
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
    setCompaniesLoading('loading');
    setPostsLoading('loading');
    setCountriesLoading('loading');
    setMetricsLoading('loading');
    
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
