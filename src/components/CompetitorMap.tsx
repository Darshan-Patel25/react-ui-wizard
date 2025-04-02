
import { useEffect, useRef } from 'react';
import "ol/ol.css";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Sample competitor data
const competitors = [
  { id: 1, name: 'CompTech Services', location: [-122.4194, 37.7749], type: 'Service Center' }, // San Francisco
  { id: 2, name: 'RivalGPS Inc.', location: [-122.2711, 37.8044], type: 'GPS Provider' }, // Berkeley
  { id: 3, name: 'TechCompete', location: [-122.2865, 37.8615], type: 'Fleet Services' }, // Richmond
  { id: 4, name: 'GPS Alternatives', location: [-122.0308, 37.9771], type: 'GPS Provider' }, // Concord
  { id: 5, name: 'XYZ Fleet Services', location: [-121.8853, 37.6802], type: 'Service Center' }, // Tracy
];

// Sample customer request locations
const customerRequests = [
  { id: 101, client: 'Acme Corp', location: [-122.4014, 37.7944], status: 'Pending' }, // SF Financial District
  { id: 102, client: 'TechGiant Inc', location: [-122.2646, 37.8719], status: 'In Progress' }, // Near Berkeley
  { id: 103, client: 'StartUp Co', location: [-122.1817, 37.7749], status: 'Pending' }, // Oakland
];

const CompetitorMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create vector sources for competitors and customer requests
    const competitorSource = new VectorSource({
      features: competitors.map(comp => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(comp.location)),
          name: comp.name,
          type: comp.type,
          id: comp.id
        });
        
        feature.setStyle(new Style({
          image: new Icon({
            src: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/icons/building.svg',
            scale: 1.5,
            color: 'red'
          })
        }));
        
        return feature;
      })
    });

    const requestSource = new VectorSource({
      features: customerRequests.map(req => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(req.location)),
          name: req.client,
          status: req.status,
          id: req.id
        });
        
        feature.setStyle(new Style({
          image: new Icon({
            src: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/icons/pin-map-fill.svg',
            scale: 1.5,
            color: 'blue'
          })
        }));
        
        return feature;
      })
    });

    // Create layers
    const competitorLayer = new VectorLayer({
      source: competitorSource,
    });

    const requestLayer = new VectorLayer({
      source: requestSource,
    });

    // Create and render the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        competitorLayer,
        requestLayer
      ],
      view: new View({
        center: fromLonLat([-122.2712, 37.8044]), // Center on Berkeley area
        zoom: 10
      })
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Competitor Proximity Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="h-[400px] w-full rounded-md overflow-hidden"></div>
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
            <span>Competitor Locations</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
            <span>Service Requests</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorMap;
