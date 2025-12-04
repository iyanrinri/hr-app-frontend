'use client';

import { useAuthStore } from '@/store/authStore';

export function TopBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">Welcome back, {user?.name || 'User'}</h1>
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}
