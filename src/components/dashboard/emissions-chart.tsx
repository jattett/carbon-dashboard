'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Company } from '@/types';
import { formatEmissions, getMonthName } from '@/lib/utils';

interface EmissionsChartProps {
  companies: Company[];
  selectedCompany: string | null;
  loading: boolean;
}

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

export function EmissionsChart({ companies, selectedCompany, loading }: EmissionsChartProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for charts
  const chartData = companies.map(company => {
    const totalEmissions = company.emissions.reduce((sum, emission) => sum + emission.emissions, 0);
    return {
      name: company.name,
      emissions: totalEmissions,
      country: company.country,
    };
  });

  // Time series data for selected company
  const selectedCompanyData = selectedCompany 
    ? companies.find(c => c.id === selectedCompany)?.emissions.map(emission => ({
        month: getMonthName(emission.yearMonth),
        emissions: emission.emissions,
        source: emission.source,
      })) || []
    : [];

  // Aggregate time series data for all companies
  const allCompaniesTimeSeries = companies.reduce((acc, company) => {
    company.emissions.forEach(emission => {
      const existing = acc.find(item => item.month === getMonthName(emission.yearMonth));
      if (existing) {
        existing.emissions += emission.emissions;
      } else {
        acc.push({
          month: getMonthName(emission.yearMonth),
          emissions: emission.emissions,
        });
      }
    });
    return acc;
  }, [] as any[]).sort((a, b) => {
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            배출량: {formatEmissions(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>배출량 트렌드</span>
            <Badge variant="outline">
              {selectedCompany ? '회사별 보기' : '전체 회사'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedCompany ? selectedCompanyData : allCompaniesTimeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value}t`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Company Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>회사별 비교</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${value}t`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="emissions" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Emissions by Source (for selected company) */}
      {selectedCompany && (
        <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>배출원별 배출량</CardTitle>
        </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={selectedCompanyData.map(item => ({
                      name: item.source,
                      value: item.emissions,
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {selectedCompanyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
