'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet
const fixLeafletIcons = () => {
  // @ts-expect-error fixing default icon issue
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

interface AttendanceMapProps {
  checkInLocation: {
    latitude: number;
    longitude: number;
  } | null;
  checkOutLocation: {
    latitude: number;
    longitude: number;
  } | null;
}

export default function AttendanceMap({ checkInLocation, checkOutLocation }: AttendanceMapProps) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // Default center (Jakarta)
  const defaultCenter: [number, number] = [-6.2088, 106.8456];
  
  // Parse locations from the API response structure
  const checkInPos: [number, number] | null = checkInLocation 
    ? [checkInLocation.latitude, checkInLocation.longitude] 
    : null;
  const checkOutPos: [number, number] | null = checkOutLocation 
    ? [checkOutLocation.latitude, checkOutLocation.longitude] 
    : null;
  
  // Determine map center
  const center = checkInPos || checkOutPos || defaultCenter;

  // Custom icons
  const checkInIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const checkOutIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
      <MapContainer 
        center={center} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {checkInPos && (
          <Marker position={checkInPos} icon={checkInIcon}>
            <Popup>
              <strong>Check In Location</strong>
              <br />
              Lat: {checkInPos[0].toFixed(6)}
              <br />
              Lng: {checkInPos[1].toFixed(6)}
            </Popup>
          </Marker>
        )}
        
        {checkOutPos && (
          <Marker position={checkOutPos} icon={checkOutIcon}>
            <Popup>
              <strong>Check Out Location</strong>
              <br />
              Lat: {checkOutPos[0].toFixed(6)}
              <br />
              Lng: {checkOutPos[1].toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
