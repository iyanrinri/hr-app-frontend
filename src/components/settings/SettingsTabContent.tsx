'use client';

import { useSettings, useUpdateSetting } from '@/hooks/useSettings';
import { SettingCategory, SettingDataType, Setting } from '@/types/settings';
import { Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';


const AttendanceMap = dynamic(() => import('./AttendanceMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">Loading Map...</div>
});



interface SettingsTabContentProps {
  category: SettingCategory;
}

export default function SettingsTabContent({ category }: SettingsTabContentProps) {
  const { data, isLoading, isError } = useSettings(1, 100, category);
  const updateMutation = useUpdateSetting();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-navy" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load settings. Please try again.
      </div>
    );
  }

  const settings = data?.data || [];
  
  // Find location specific settings
  const latSetting = settings.find(s => s.key === 'attendance_checkpoint_lat');
  const lngSetting = settings.find(s => s.key === 'attendance_checkpoint_lng');
  const radiusSetting = settings.find(s => s.key === 'attendance_checkpoint_radius');
  const addressSetting = settings.find(s => s.key === 'attendance_checkpoint_address');

  const locationKeys = ['attendance_checkpoint_lat', 'attendance_checkpoint_lng', 'attendance_checkpoint_radius', 'attendance_checkpoint_address'];
  const showMap = category === SettingCategory.ATTENDANCE;
  
  const otherSettings = showMap 
    ? settings.filter(s => !locationKeys.includes(s.key))
    : settings;

  return (
    <div className="space-y-6 max-w-4xl">
      {settings.length === 0 ? (
        <p className="text-gray-500 italic">No settings found for this category.</p>
      ) : (
        <div className="grid gap-6">
          {/* Render non-location settings first (like allowWeekendWork etc) */}
          {otherSettings.map((setting) => (
             <SettingItem key={`${setting.id}-${setting.value}`} setting={setting} />
          ))}
        </div>
      )}

      {showMap && (
        <div className="mt-8 border-t pt-8">
          <h3 className="text-lg font-medium text-brand-navy mb-6">Attendance Check Point</h3>
          
          <div className="mb-6 grid gap-6">
             {/* Explicitly render location settings in desired order */}
             {addressSetting && <SettingItem key={`${addressSetting.id}-${addressSetting.value}`} setting={addressSetting} />}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latSetting && <SettingItem key={`${latSetting.id}-${latSetting.value}`} setting={latSetting} />}
                {lngSetting && <SettingItem key={`${lngSetting.id}-${lngSetting.value}`} setting={lngSetting} />}
             </div>
             {radiusSetting && <SettingItem key={`${radiusSetting.id}-${radiusSetting.value}`} setting={radiusSetting} />}
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-200">
            <AttendanceMap 
               key={`${latSetting?.value}-${lngSetting?.value}`}
               latitude={parseFloat(String(latSetting?.value || '0'))}
               longitude={parseFloat(String(lngSetting?.value || '0'))}
               radius={parseFloat(String(radiusSetting?.value || '100'))}
               onLocationSelect={(lat: number, lng: number) => {
                  updateMutation.mutate({ key: 'attendance_checkpoint_lat', value: String(lat) });
                  updateMutation.mutate({ key: 'attendance_checkpoint_lng', value: String(lng) });
                  // We don't update address automatically from map click unless we have geocoding.
               }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SettingItem({ setting }: { setting: Setting }) {
  const updateMutation = useUpdateSetting();
  const [value, setValue] = useState<string | number | boolean>(setting.value);
  const [isDirty, setIsDirty] = useState(false);

  const handleSave = () => {
    // If number type, parse it
    let valToSave = value;
    if (setting.dataType === SettingDataType.NUMBER) {
       valToSave = Number(value);
    }
    
    updateMutation.mutate(
      { key: setting.key, value: valToSave },
      {
        onSuccess: () => setIsDirty(false),
      }
    );
  };

  const isBoolean = setting.dataType === SettingDataType.BOOLEAN;
  const isTrue = String(value) === 'true' || value === true;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div>
          <label className="block text-sm font-semibold text-gray-900">
            {formatSettingName(setting.key)}
          </label>
          <p className="text-xs text-gray-500 mt-1">{setting.description}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        {isBoolean ? (
           <div className="flex items-center">
             <button
               onClick={() => {
                 const newVal = !isTrue;
                 setValue(newVal); 
                 updateMutation.mutate({ key: setting.key, value: String(newVal) }); 
               }}
               className={cn(
                 "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2",
                 isTrue ? "bg-brand-navy" : "bg-gray-200"
               )}
             >
               <span
                 className={cn(
                   "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                   isTrue ? "translate-x-5" : "translate-x-0"
                 )}
               />
             </button>
             <span className="ml-3 text-sm text-gray-900">
                {isTrue ? 'Enabled' : 'Disabled'}
             </span>
           </div>
        ) : (
          <div className="flex-1 flex gap-2">
             <input
               type={setting.dataType === SettingDataType.NUMBER ? "number" : "text"}
               value={String(value)}
               onChange={(e) => {
                 setValue(e.target.value);
                 setIsDirty(true);
               }}
               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm p-2 border"
               placeholder={setting.description}
             />
             {isDirty && (
               <button
                 onClick={handleSave}
                 disabled={updateMutation.isPending}
                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-brand-navy hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy"
               >
                 {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
               </button>
             )}
          </div>
        )}
      </div>
    </div>
  );
}

function formatSettingName(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}


