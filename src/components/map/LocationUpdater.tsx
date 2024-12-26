import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface LocationUpdaterProps {
  position: [number, number];
}

export default function LocationUpdater({ position }: LocationUpdaterProps) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  
  return null;
}