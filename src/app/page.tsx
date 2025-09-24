'use client';

import { Sidebar } from '@/components/navigation/sidebar';
import { GNB } from '@/components/navigation/gnb';
import { EnhancedDashboard } from '@/components/dashboard/enhanced-dashboard';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <GNB />
      <div className="flex">
        <Sidebar />
        <EnhancedDashboard />
      </div>
    </div>
  );
}
