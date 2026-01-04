'use client';

import { useState } from 'react';
import { SettingCategory } from '@/types/settings';
import SettingsTabContent from '@/components/settings/SettingsTabContent';
import { cn } from '@/lib/utils';
import { Building2, Calendar, Shield, Bell, Settings as SettingsIcon } from 'lucide-react';
import { useInitializeSettings } from '@/hooks/useSettings';
import { Loader2 } from 'lucide-react';

const tabs = [
  { id: SettingCategory.GENERAL, label: 'General', icon: SettingsIcon },
  { id: SettingCategory.COMPANY, label: 'Company', icon: Building2 },
  { id: SettingCategory.ATTENDANCE, label: 'Attendance', icon: Calendar },
  { id: SettingCategory.NOTIFICATION, label: 'Notifications', icon: Bell },
  { id: SettingCategory.SECURITY, label: 'Security', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingCategory>(SettingCategory.GENERAL);
  const initializeMutation = useInitializeSettings();

  return (
    <div>
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
           {/* Mobile scrollable tabs container if needed, sticking to simple flex for now */}
           <nav className="flex space-x-4 overflow-x-auto no-scrollbar" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors',
                  activeTab === tab.id
                    ? 'bg-brand-light text-brand-navy'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                )}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>

          <button
             onClick={() => initializeMutation.mutate()}
             disabled={initializeMutation.isPending}
             className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:opacity-50"
          >
             {initializeMutation.isPending ? (
               <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
             ) : null}
             Initialize Defaults
          </button>
        </div>
      </div>

      <div className="p-6">
        <SettingsTabContent category={activeTab} />
      </div>
    </div>
  );
}
