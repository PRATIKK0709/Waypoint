import { Share2, Copy, MapPin, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ShareControlsProps {
  onShare: () => void;
  onCopy: () => void;
  shareUrl: string;
  position: [number, number];
}

export default function ShareControls({ onShare, onCopy, shareUrl, position }: ShareControlsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-morphism rounded-xl p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-500/20">
            <MapPin className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Location</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onShare}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
          {shareUrl && (
            <button
              onClick={handleCopy}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                copied 
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      </div>

      {shareUrl && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
            {shareUrl}
          </p>
        </div>
      )}
    </div>
  );
}