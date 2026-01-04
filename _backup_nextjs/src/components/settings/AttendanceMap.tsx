'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ 
  position, 
  onLocationSelect 
}: { 
  position: [number, number], 
  onLocationSelect: (lat: number, lng: number) => void 
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export default function AttendanceMap({
  latitude,
  longitude,
  radius,
  onLocationSelect,
}: AttendanceMapProps) {
  // Default to Jakarta if 0,0 provided or invalid
  const hasLocation = !!(latitude && longitude);
  const centerPosition: [number, number] = hasLocation 
    ? [latitude, longitude] 
    : [-6.2088, 106.8456];

  const [position, setPosition] = useState<[number, number]>(centerPosition);

  const [pendingLocation, setPendingLocation] = useState<[number, number] | null>(null);



  const handleMapClick = (lat: number, lng: number) => {
    setPendingLocation([lat, lng]);
  };

  const confirmLocation = () => {
    if (pendingLocation) {
      setPosition(pendingLocation);
      onLocationSelect(pendingLocation[0], pendingLocation[1]);
      setPendingLocation(null);
    }
  };

  const cancelLocation = () => {
    setPendingLocation(null);
  };

  return (
    <div className="space-y-4 relative">
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
          <MapUpdater center={pendingLocation || position} />
          <LocationMarker position={pendingLocation || position} onLocationSelect={handleMapClick} />
          {/* Show visual circle for current saved position if not pending, or pending if intent is to show what it would look like */}
          <Circle center={pendingLocation || position} radius={radius} pathOptions={{ color: pendingLocation ? 'orange' : 'blue' }}/>
        </MapContainer>

        {/* Confirmation Modal Overlay */}
        {pendingLocation && (
          <div className="absolute inset-0 z-[1000] flex items-end justify-center pb-6 bg-black/10 pointer-events-none">
             <div className="bg-white p-4 rounded-lg shadow-lg pointer-events-auto flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
                <p className="text-sm font-medium text-gray-900">Update Check Point Location?</p>
                <div className="flex gap-2">
                  <button 
                    onClick={cancelLocation}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmLocation}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-brand-navy hover:opacity-90 rounded-md transition-colors"
                  >
                    Save Location
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500">
        Click on the map to set the attendance check-point center. You will be asked to confirm.
      </p>
    </div>
  );
}
