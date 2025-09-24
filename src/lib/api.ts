import { Company, Post, Country } from '@/types';
import { companies, posts, countries } from '@/data/seed';

// Simulate network latency and occasional failures
const _countries = [...countries];
const _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

// Countries API
export async function fetchCountries(): Promise<Country[]> {
  await delay(jitter());
  return _countries;
}

// Companies API
export async function fetchCompanies(): Promise<Company[]> {
  await delay(jitter());
  return _companies;
}

export async function fetchCompanyById(id: string): Promise<Company | null> {
  await delay(jitter());
  return _companies.find(company => company.id === id) || null;
}

export async function fetchCompaniesByCountry(countryCode: string): Promise<Company[]> {
  await delay(jitter());
  return _companies.filter(company => company.country === countryCode);
}

// Posts API
export async function fetchPosts(): Promise<Post[]> {
  await delay(jitter());
  return _posts;
}

export async function fetchPostsByCompany(companyId: string): Promise<Post[]> {
  await delay(jitter());
  return _posts.filter(post => post.resourceUid === companyId);
}

export async function createOrUpdatePost(p: Omit<Post, 'id'> & { id?: string }): Promise<Post> {
  await delay(jitter());
  
  if (maybeFail()) {
    throw new Error('저장에 실패했습니다 - 다시 시도해주세요');
  }
  
  if (p.id) {
    // Update existing post
    const existingIndex = _posts.findIndex(post => post.id === p.id);
    if (existingIndex !== -1) {
      _posts[existingIndex] = p as Post;
      return p as Post;
    }
  }
  
  // Create new post
  const created: Post = {
    ...p,
    id: crypto.randomUUID(),
  };
  _posts = [..._posts, created];
  return created;
}

export async function deletePost(id: string): Promise<boolean> {
  await delay(jitter());
  
  if (maybeFail()) {
    throw new Error('삭제에 실패했습니다 - 다시 시도해주세요');
  }
  
  const initialLength = _posts.length;
  _posts = _posts.filter(post => post.id !== id);
  return _posts.length < initialLength;
}

// Analytics API
export async function fetchDashboardMetrics(): Promise<{
  totalEmissions: number;
  averageEmissions: number;
  trendPercentage: number;
  topEmittingCompany: string;
  totalCompanies: number;
}> {
  await delay(jitter());
  
  const allEmissions = _companies.flatMap(company => 
    company.emissions.map(emission => ({
      companyName: company.name,
      emissions: emission.emissions,
      yearMonth: emission.yearMonth,
    }))
  );
  
  const totalEmissions = allEmissions.reduce((sum, emission) => sum + emission.emissions, 0);
  const averageEmissions = totalEmissions / allEmissions.length;
  
  // Calculate trend (comparing last 3 months vs previous 3 months)
  const sortedEmissions = allEmissions.sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));
  const recentEmissions = sortedEmissions.slice(-3).reduce((sum, e) => sum + e.emissions, 0);
  const previousEmissions = sortedEmissions.slice(-6, -3).reduce((sum, e) => sum + e.emissions, 0);
  const trendPercentage = previousEmissions > 0 ? ((recentEmissions - previousEmissions) / previousEmissions) * 100 : 0;
  
  // Find top emitting company
  const companyTotals = _companies.map(company => ({
    name: company.name,
    total: company.emissions.reduce((sum, emission) => sum + emission.emissions, 0),
  }));
  const topEmittingCompany = companyTotals.reduce((max, company) => 
    company.total > max.total ? company : max
  ).name;
  
  return {
    totalEmissions: Math.round(totalEmissions),
    averageEmissions: Math.round(averageEmissions),
    trendPercentage: Math.round(trendPercentage * 100) / 100,
    topEmittingCompany,
    totalCompanies: _companies.length,
  };
}
