import { useEffect, useState } from 'react';
import ShareControls from '../components/map/ShareControls';
import LocationMap from '../components/map/LocationMap';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function SharePage() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lng = params.get('lng');
    
    if (lat && lng) {
      setPosition([parseFloat(lat), parseFloat(lng)]);
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setLoading(false);
        },
        (err) => {
          setError('Could not get your location. Please enable location services.');
          setLoading(false);
        }
      );
    }
  }, []);

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('lat', position[0].toString());
    url.searchParams.set('lng', position[1].toString());
    setShareUrl(url.toString());
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 grid place-items-center">
        <LoadingSpinner message="Getting your location..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 grid place-items-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ShareControls
          onShare={handleShare}
          onCopy={copyToClipboard}
          shareUrl={shareUrl}
          position={position}
        />
        <div className="map-container h-[calc(100vh-12rem)]">
          <LocationMap position={position} />
        </div>
      </div>
    </div>
  );
}