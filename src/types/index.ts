// Data models for Carbon Emissions Dashboard

export type GhgEmission = {
  yearMonth: string; 
  source: string; 
  emissions: number; 
};

export type Company = {
  id: string;
  name: string;
  country: string; 
  emissions: GhgEmission[];
};

export type Post = {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string; 
  content: string;
};

export type Country = {
  code: string;
  name: string;
  flag: string;
};

// UI State types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type FilterState = {
  selectedCompany: string | null;
  selectedCountry: string | null;
  dateRange: {
    start: string;
    end: string;
  };
};

export type DashboardMetrics = {
  totalEmissions: number;
  averageEmissions: number;
  trendPercentage: number;
  topEmittingCompany: string;
  totalCompanies: number;
};
