'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
}); 
// Note: Requires marker images in public folder or CDN. 
// Fallback to CDN if local not available is safer since I don't know if public/images exists.
// Or usage of default leaflet imports if configured correctly with webpack/next but often fail in Next.js.
// Let's use a standard CDN for the marker icon to be safe.
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface AttendanceMapProps {
  latitude: number;
  longitude: number;
  radius: number;
  address: string;
  onLocationSelect: (lat: number, lng: number, address?: string) => void;
  onRadiusChange: (radius: number) => void;
}

function LocationMarker({ 
  position, 
  onLocationSelect 
}: { 
  position: [number, number], 
  onLocationSelect: (lat: number, lng: number) => void 
}) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function AttendanceMap({
  latitude,
  longitude,
  radius,
  address,
  onLocationSelect,
  onRadiusChange,
}: AttendanceMapProps) {
  // Default to Jakarta if 0,0 provided
  const centerPosition: [number, number] = 
    latitude && longitude ? [latitude, longitude] : [-6.2088, 106.8456];

  const [position, setPosition] = useState<[number, number]>(centerPosition);
  const [currentRadius, setCurrentRadius] = useState(radius);

  useEffect(() => {
    if (latitude && longitude && (latitude !== position[0] || longitude !== position[1])) {
       setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (radius !== currentRadius) {
      setCurrentRadius(radius);
    }
  }, [radius]);
  
  const handleLocationSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
    // Ideally we would do reverse geocoding here to get address, 
    // but for now we skip automated address update to avoid external API dependencies without keys.
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center flex-wrap">
         <div className="flex-1 min-w-[200px]">
           <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
           <input 
              type="number" 
              value={position[0]} 
              readOnly 
              className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm p-2 border" 
           />
         </div>
         <div className="flex-1 min-w-[200px]">
           <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
           <input 
              type="number" 
              value={position[1]} 
              readOnly 
              className="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm p-2 border" 
           />
         </div>
         <div className="flex-1 min-w-[200px]">
           <label className="block text-sm font-medium text-gray-700 mb-1">Radius (meters)</label>
           <input 
              type="number" 
              value={currentRadius} 
              onChange={(e) => {
                 const val = parseFloat(e.target.value);
                 setCurrentRadius(val);
                 onRadiusChange(val);
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm p-2 border" 
           />
         </div>
      </div>
      
      {/* Address display - read only for now as it comes from API */}
      <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
         <input 
            type="text" 
            value={address} 
            onChange={(e) => onLocationSelect(position[0], position[1], e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm p-2 border" 
            placeholder="Location address"
         />
      </div>

      <div className="h-[400px] w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">
        <MapContainer 
          center={centerPosition} 
          zoom={15} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} onLocationSelect={handleLocationSelect} />
          {position && <Circle center={position} radius={currentRadius} />}
        </MapContainer>
      </div>
      <p className="text-xs text-gray-500">
        Click on the map to set the attendance check-point center. Drag/Scroll to move.
      </p>
    </div>
  );
}
