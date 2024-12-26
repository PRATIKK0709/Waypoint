import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationUpdater from './LocationUpdater';

const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface LocationMapProps {
  position: [number, number];
}

export default function LocationMap({ position }: LocationMapProps) {
  return (
    <MapContainer
      center={position}
      zoom={15}
      className="h-full w-full rounded-xl"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="dark:brightness-75 dark:saturate-75"
      />
      <Marker position={position} icon={icon} />
      <LocationUpdater position={position} />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}