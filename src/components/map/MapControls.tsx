import { useState } from 'react';
import { Share2, Copy, MapPin, CheckCircle2, Navigation2 } from 'lucide-react';
import Button from '../ui/Button';

interface MapControlsProps {
  position: [number, number];
  onShare: () => void;
  shareUrl: string;
}

export default function MapControls({ position, onShare, shareUrl }: MapControlsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps?q=${position[0]},${position[1]}`;
    window.open(url, '_blank');
  };

  return (
    <div className="glass-morphism rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20">
            <MapPin className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Location</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-0.5">
              {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="primary" onClick={onShare} className="flex-1 sm:flex-none">
            <Share2 size={18} className="mr-2" />
            Share
          </Button>
          {shareUrl && (
            <>
              <Button 
                variant="secondary" 
                onClick={handleCopy}
                className="flex-1 sm:flex-none"
              >
                {copied ? (
                  <CheckCircle2 size={18} className="mr-2 text-green-500" />
                ) : (
                  <Copy size={18} className="mr-2" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={openInMaps}
                className="flex-1 sm:flex-none"
              >
                <Navigation2 size={18} className="mr-2" />
                Open in Maps
              </Button>
            </>
          )}
        </div>
      </div>

      {shareUrl && (
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-lg blur"></div>
          <div className="relative p-3 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
              {shareUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}