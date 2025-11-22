import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with webpack
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Hotspot {
  district: string;
  province: string;
  stunting: number;
  anemia: number;
  severity: string;
  population: number;
  coordinates: { lat: number; lng: number };
  factors: string[];
}

interface NutritionMapProps {
  hotspots: Hotspot[];
}

const NutritionMap: React.FC<NutritionMapProps> = ({ hotspots }) => {
  const center: [number, number] = [-1.9403, 29.8739]; // Centered on Rwanda

  return (
    <MapContainer center={center} zoom={8} style={{ height: "500px", width: "100%" }} className="rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hotspots.map((hotspot) => (
        <Marker key={hotspot.district} position={[hotspot.coordinates.lat, hotspot.coordinates.lng]} icon={redIcon}>
          <Tooltip>
            <strong>{hotspot.district}</strong><br />
            Stunting: {hotspot.stunting}%<br />
            Anemia: {hotspot.anemia}%
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default NutritionMap;