// "use client";

// import React, { useState, useEffect } from "react";
// import { MapContainer, GeoJSON, Popup, CircleMarker, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import { LatLngExpression } from "leaflet";
// import healthFacilities from "../../../rwanda.geojson";
// import { districtBoundariesData } from "./rwa_adm2_boundaries.geojson";

// // NOTE: You will need to install react-leaflet and leaflet:
// // npm install react-leaflet leaflet
// // npm install -D @types/leaflet

// interface Hotspot {
//   district: string;
//   province: string;
//   stunting: number;
//   anemia: number;
//   severity: string;
//   population: number;
//   coordinates: { lat: number; lng: number };
//   factors: string[];
// }

// interface NutritionMapProps {
//   hotspots: Hotspot[];
// }

// const healthFacilitiesData = healthFacilities as GeoJSON.FeatureCollection;

// const NutritionMap = ({ hotspots }: NutritionMapProps) => {
//   const center: LatLngExpression = [-1.9403, 29.8739]; // Centered on Rwanda
//   const districtBoundaries = districtBoundariesData as GeoJSON.FeatureCollection;

//   const generateDistrictGeoJSON = (boundaries: GeoJSON.FeatureCollection | null, currentHotspots: Hotspot[]): GeoJSON.FeatureCollection => {
//     const hotspotMap = new Map(currentHotspots.map(h => [h.district, h]));

//     const features = (boundaries?.features || []).map(feature => {
//       const districtName = feature.properties?.shapeName;
//       const hotspotData = hotspotMap.get(districtName);

//       if (hotspotData) {
//         return {
//           ...feature,
//           properties: {
//             ...feature.properties,
//             ...hotspotData,
//           },
//         };
//       }
//       return feature;
//     }).filter(Boolean) as GeoJSON.Feature[];

//     return {
//       type: "FeatureCollection",
//       features,
//     };
//   }

//   const districtGeoJSON = generateDistrictGeoJSON(districtBoundaries, hotspots);

//   const getStyle = (feature: any) => {
//     // Style districts based on stunting prevalence.
//     // You can create more complex logic here.
//     const stunting = feature.properties.stunting;
//     return {
//       fillColor: stunting > 38 ? "#e53e3e" : stunting > 35 ? "#f6ad55" : "#68d391",
//       weight: 2,
//       opacity: 1,
//       color: "white",
//       dashArray: "3",
//       fillOpacity: 0.7,
//     };
//   };

//   const onEachFeature = (feature: any, layer: any) => {
//     if (feature.properties) {
//       const { shapeName: NAME_2, stunting, anemia } = feature.properties;
//       layer.bindPopup(`
//         <strong>${NAME_2}</strong><br/>
//         Stunting: ${stunting ? `${stunting}%` : 'N/A'}<br/>
//         Anemia: ${anemia ? `${anemia}%` : 'N/A'}<br/>
//       `);
//     }
//   };

//   return (
//     <MapContainer
//       center={center}
//       zoom={8}
//       scrollWheelZoom={true}
//       style={{ height: "500px", width: "100%", borderRadius: "0.5rem", backgroundColor: '#f0f0f0' }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
//         url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//       />

//       {/* This GeoJSON component will render your district boundaries. */}
//       <GeoJSON data={districtGeoJSON} style={getStyle} onEachFeature={onEachFeature} />

//       {/* This will render markers for health facilities */}
//       {healthFacilitiesData.features.map((facility, idx) => {
//         if (facility.geometry.type === "Point") {
//           // GeoJSON coordinates are [lng, lat], Leaflet needs [lat, lng]
//           const coordinates: LatLngExpression = [facility.geometry.coordinates[1], facility.geometry.coordinates[0]];
//           const name = facility.properties?.name || "Health Facility";

//           return (
//             <CircleMarker key={idx} center={coordinates} radius={5} pathOptions={{ color: 'blue', fillColor: 'lightblue', fillOpacity: 1 }}>
//               <Popup>{name}</Popup>
//             </CircleMarker>
//           );
//         }
//         return null;
//       })}
//     </MapContainer>
//   );
// };

// export default NutritionMap;