import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Hotspot {
  district: string;
  severity: string;
  stunting: number;
  coordinates: { lat: number; lng: number };
  [key: string]: any;
}

interface NutritionMapProps {
  hotspots: Hotspot[];
}

const NutritionMap: React.FC<NutritionMapProps> = ({ hotspots }) => {
  const [districtData, setDistrictData] = React.useState<any>(null);
  const [nationalData, setNationalData] = React.useState<any>(null);

  const getColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      default: return '#6b7280';
    }
  };

  // Load real GeoJSON data
  React.useEffect(() => {
    // Rwanda National Boundary from Natural Earth Data
    fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson')
      .then(response => response.json())
      .then(data => {
        const rwanda = data.features.find((f: any) => 
          f.properties.ADMIN === 'Rwanda' || f.properties.NAME === 'Rwanda'
        );
        if (rwanda) {
          setNationalData({
            type: "FeatureCollection",
            features: [rwanda]
          });
        }
      })
      .catch(error => console.error('Error loading national data:', error));

    // Rwanda Districts from geoBoundaries API
    fetch('https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/RWA/ADM2/geoBoundaries-RWA-ADM2.geojson')
      .then(response => response.json())
      .then(data => {
        setDistrictData(data);
      })
      .catch(error => {
        console.error('Error loading district data:', error);
        // Fallback to simplified data
        loadSimplifiedData();
      });
  }, []);

  const loadSimplifiedData = () => {
    // Simplified Rwanda boundaries as fallback
    const simplifiedNational = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Rwanda" },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [29.0, -1.0], [31.0, -1.0], [31.0, -2.9], [29.0, -2.9], [29.0, -1.0]
            ]]
          }
        }
      ]
    };
    setNationalData(simplifiedNational);
  };

  // National boundary style
  const nationalBoundaryStyle = {
    color: '#1f2937',
    weight: 3,
    fillOpacity: 0.1,
    fillColor: '#3b82f6',
    opacity: 1
  };

  // District boundary style
  const districtBoundaryStyle = {
    color: '#4b5563',
    weight: 1.5,
    fillOpacity: 0.05,
    fillColor: '#9ca3af',
    opacity: 0.8
  };

  const onEachDistrict = (feature: any, layer: L.Layer) => {
    // Extract district name from various possible property names in the GeoJSON
    const districtName = feature.properties.shapeName || 
                        feature.properties.shapeName || 
                        feature.properties.ADM2_EN || 
                        feature.properties.NAME_2 || 
                        feature.properties.name ||
                        feature.properties.ADM2_FR ||
                        feature.properties.ADM2_ES ||
                        'District';
    
    // Embed district name in tooltip
    layer.bindTooltip(`
      <div class="text-center font-semibold text-gray-800">
        ${districtName}
      </div>
    `, {
      permanent: false,
      sticky: true,
      direction: 'center',
      className: 'district-tooltip bg-white px-3 py-2 rounded-lg border border-gray-300 shadow-lg'
    });
  };

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border-2 border-gray-400">
      <MapContainer
        center={[-1.9403, 29.8739]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        minZoom={7}
        maxZoom={12}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Real Rwanda National Boundary */}
        {nationalData && (
          <GeoJSON 
            data={nationalData} 
            style={nationalBoundaryStyle}
          />
        )}

        {/* Real Rwanda District Boundaries from geoBoundaries API */}
        {districtData && (
          <GeoJSON 
            data={districtData} 
            style={districtBoundaryStyle}
            onEachFeature={onEachDistrict}
          />
        )}
        
        {/* Hotspot Markers */}
        {hotspots.map((hotspot, index) => (
          <Marker 
            key={index} 
            position={[hotspot.coordinates.lat, hotspot.coordinates.lng]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="background-color: ${getColor(hotspot.severity)}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
              iconSize: [20, 20],
            })}
          >
            <Popup>
              <div className="p-2">
                <strong>{hotspot.district}</strong><br/>
                Stunting: {hotspot.stunting}%<br/>
                Severity: {hotspot.severity}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default NutritionMap;