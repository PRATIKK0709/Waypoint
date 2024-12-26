import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="glass-morphism p-6 rounded-xl max-w-md text-center">
      <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
      <p className="text-red-400">{message}</p>
    </div>
  );
}