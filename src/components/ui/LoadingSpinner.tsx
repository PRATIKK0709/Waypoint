interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin"></div>
        <div className="absolute inset-0 h-16 w-16 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin delay-150"></div>
      </div>
      <p className="text-gray-400 animate-pulse">{message}</p>
    </div>
  );
}