'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboard-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SidebarSkeleton } from '@/components/ui/skeleton';
import { 
  Menu, 
  Building2, 
  Globe, 
  TrendingUp, 
  Filter,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const {
    companies,
    countries,
    selectedCompany,
    selectedCountry,
    sidebarOpen,
    companiesLoading,
    countriesLoading,
    setSelectedCompany,
    setSelectedCountry,
    setSidebarOpen,
    getFilteredCompanies,
  } = useDashboardStore();

  const isLoading = companiesLoading === 'loading' || countriesLoading === 'loading';

  const [expandedSections, setExpandedSections] = useState({
    companies: true,
    countries: true,
  });

  const filteredCompanies = getFilteredCompanies();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId === selectedCompany ? null : companyId);
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode === selectedCountry ? null : countryCode);
  };

  const getCompanyEmissions = (company: { emissions: { emissions: number }[] }) => {
    return company.emissions.reduce((sum: number, emission: { emissions: number }) => sum + emission.emissions, 0);
  };

  const getTotalEmissions = () => {
    return companies.reduce((sum, company) => sum + getCompanyEmissions(company), 0);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={cn(
        'fixed left-0 top-0 z-50 h-full w-80 bg-card border-r transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:z-auto'
      )}>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isLoading ? (
              <SidebarSkeleton />
            ) : (
              <>
                {/* Summary Card */}
                <Card className="glass-card hover:shadow-xl transition-all duration-300 hover-lift">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2 font-medium">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="gradient-text">실시간 개요</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">총 회사 수</span>
                  <Badge variant="secondary" className="gradient-green text-white shadow-lg font-semibold">
                    {companies.length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">총 배출량</span>
                  <Badge variant="default" className="gradient-blue text-white shadow-lg font-semibold">
                    {getTotalEmissions().toLocaleString()} 톤
                  </Badge>
                </div>
                <div className="pt-3 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted-foreground font-medium">오늘의 목표</span>
                    <span className="font-bold gradient-text">85% 달성</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                    <div className="gradient-green h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Countries Filter */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto"
                onClick={() => toggleSection('countries')}
              >
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">국가</span>
                </div>
                {expandedSections.countries ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
              
              {expandedSections.countries && (
                <div className="mt-2 space-y-1">
                  <Button
                    variant={selectedCountry === null ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleCountrySelect('')}
                  >
                    <Filter className="w-3 h-3 mr-2" />
                    모든 국가
                  </Button>
                  {countries.map((country) => (
                    <Button
                      key={country.code}
                      variant={selectedCountry === country.code ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      <span className="mr-2">{country.flag}</span>
                      {country.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Companies */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto"
                onClick={() => toggleSection('companies')}
              >
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span className="font-medium">회사</span>
                </div>
                {expandedSections.companies ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
              
              {expandedSections.companies && (
                <div className="mt-2 space-y-1">
                  {filteredCompanies.map((company) => {
                    const country = countries.find(c => c.code === company.country);
                    const totalEmissions = getCompanyEmissions(company);
                    
                    return (
                      <Button
                        key={company.id}
                        variant={selectedCompany === company.id ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => handleCompanySelect(company.id)}
                      >
                        <div className="flex flex-col items-start w-full">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium text-left">{company.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {totalEmissions.toLocaleString()}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground mr-1">
                              {country?.flag}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {country?.name}
                            </span>
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function SidebarToggle() {
  const { setSidebarOpen } = useDashboardStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={() => setSidebarOpen(true)}
    >
      <Menu className="w-4 h-4" />
    </Button>
  );
}
