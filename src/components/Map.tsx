import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Share2 } from 'lucide-react';

// Fix for default marker icon
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface LocationUpdaterProps {
  position: [number, number];
}

function LocationUpdater({ position }: LocationUpdaterProps) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

export default function Map() {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Check if there's a shared position in the URL
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lng = params.get('lng');
    
    if (lat && lng) {
      setPosition([parseFloat(lat), parseFloat(lng)]);
      setLoading(false);
    } else {
      // Get user's current position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPosition);
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
      alert('Link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-white shadow-md z-10">
        <h1 className="text-2xl font-bold mb-2">Location Sharing</h1>
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Share2 size={20} /> Generate Share Link
          </button>
          {shareUrl && (
            <button
              onClick={copyToClipboard}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Copy Link
            </button>
          )}
        </div>
        {shareUrl && (
          <div className="mt-2 p-2 bg-gray-100 rounded break-all">
            {shareUrl}
          </div>
        )}
      </div>
      <div className="flex-1 relative">
        <MapContainer
          center={position}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={icon} />
          <LocationUpdater position={position} />
        </MapContainer>
      </div>
    </div>
  );
}