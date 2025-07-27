import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 size={48} className="text-white animate-spin mx-auto mb-4" />
        <p className="text-white/80 text-lg">Loading weather data...</p>
      </div>
    </div>
  );
};