import React from 'react';

type Props = {
  isLoading?: boolean;
  message?: string;
};

export default function LoadingScreen({ isLoading = true, message }: Props) {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        {message && <div className="text-sm text-gray-700">{message}</div>}
      </div>
    </div>
  );
}
