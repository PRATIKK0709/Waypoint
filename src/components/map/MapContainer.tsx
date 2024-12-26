import { ReactNode } from 'react';

interface MapContainerProps {
  children: ReactNode;
}

export default function MapContainer({ children }: MapContainerProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-800 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)]">
        {children}
      </div>
    </div>
  );
}