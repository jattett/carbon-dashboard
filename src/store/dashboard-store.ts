import { create } from 'zustand';
import { Company, Post, Country, FilterState, LoadingState, DashboardMetrics } from '@/types';

interface DashboardState {
  // Data state
  companies: Company[];
  posts: Post[];
  countries: Country[];
  metrics: DashboardMetrics | null;
  
  // Loading states
  companiesLoading: LoadingState;
  postsLoading: LoadingState;
  countriesLoading: LoadingState;
  metricsLoading: LoadingState;
  
  // UI state
  selectedCompany: string | null;
  selectedCountry: string | null;
  sidebarOpen: boolean;
  
  // Error state
  error: string | null;
  
  // Actions
  setCompanies: (companies: Company[]) => void;
  setPosts: (posts: Post[]) => void;
  setCountries: (countries: Country[]) => void;
  setMetrics: (metrics: DashboardMetrics) => void;
  
  setCompaniesLoading: (state: LoadingState) => void;
  setPostsLoading: (state: LoadingState) => void;
  setCountriesLoading: (state: LoadingState) => void;
  setMetricsLoading: (state: LoadingState) => void;
  
  setSelectedCompany: (companyId: string | null) => void;
  setSelectedCountry: (countryCode: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  
  setError: (error: string | null) => void;
  
  // Post management
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (postId: string) => void;
  
  // Computed values
  getFilteredCompanies: () => Company[];
  getFilteredPosts: () => Post[];
  getCurrentCompany: () => Company | null;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  companies: [],
  posts: [],
  countries: [],
  metrics: null,
  
  companiesLoading: 'idle',
  postsLoading: 'idle',
  countriesLoading: 'idle',
  metricsLoading: 'idle',
  
  selectedCompany: null,
  selectedCountry: null,
  sidebarOpen: false,
  
  error: null,
  
  // Actions
  setCompanies: (companies) => set({ companies }),
  setPosts: (posts) => set({ posts }),
  setCountries: (countries) => set({ countries }),
  setMetrics: (metrics) => set({ metrics }),
  
  setCompaniesLoading: (state) => set({ companiesLoading: state }),
  setPostsLoading: (state) => set({ postsLoading: state }),
  setCountriesLoading: (state) => set({ countriesLoading: state }),
  setMetricsLoading: (state) => set({ metricsLoading: state }),
  
  setSelectedCompany: (companyId) => set({ selectedCompany: companyId }),
  setSelectedCountry: (countryCode) => set({ selectedCountry: countryCode }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setError: (error) => set({ error }),
  
  // Post management
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (updatedPost) => set((state) => ({
    posts: state.posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    )
  })),
  deletePost: (postId) => set((state) => ({
    posts: state.posts.filter(post => post.id !== postId)
  })),
  
  // Computed values
  getFilteredCompanies: () => {
    const { companies, selectedCountry } = get();
    if (!selectedCountry) return companies;
    return companies.filter(company => company.country === selectedCountry);
  },
  
  getFilteredPosts: () => {
    const { posts, selectedCompany } = get();
    if (!selectedCompany) return posts;
    return posts.filter(post => post.resourceUid === selectedCompany);
  },
  
  getCurrentCompany: () => {
    const { companies, selectedCompany } = get();
    if (!selectedCompany) return null;
    return companies.find(company => company.id === selectedCompany) || null;
  },
}));
