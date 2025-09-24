import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatEmissions(emissions: number): string {
  if (emissions >= 1000) {
    return `${(emissions / 1000).toFixed(1)}K 톤 CO₂`;
  }
  return `${emissions} 톤 CO₂`;
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function getMonthName(yearMonth: string): string {
  const [year, month] = yearMonth.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short' });
}

export function getTrendColor(trend: number): string {
  if (trend > 5) return 'text-red-600';
  if (trend < -5) return 'text-green-600';
  return 'text-gray-600';
}

export function getTrendIcon(trend: number): string {
  if (trend > 5) return '↗️';
  if (trend < -5) return '↘️';
  return '→';
}
