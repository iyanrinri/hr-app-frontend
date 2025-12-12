'use client';

import { useProfile } from '@/hooks/useProfile';
import { useEffect } from 'react';

export function ProfileSync() {
  const { isError } = useProfile();

  useEffect(() => {
    if (isError) {
      console.error('Failed to fetch profile');
    }
  }, [isError]);

  // This component doesn't render anything, it just syncs profile data
  return null;
}
