
import { Helmet } from 'react-helmet';
import { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Activity, Battery, Zap, CarFront, RotateCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Import OpenLayers components
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';

const GpsService = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  
  // Mock data for GPS tracked vehicles
  const trackedVehicles = [
    { id: 1, name: 'Delivery Van #1', reg: 'ABC-123', status: 'moving', speed: 45, battery: 92, lastUpdate: '2 min ago', address: '1234 Main St, Anytown, CA', coordinates: [-122.4194, 37.7749] }, // San Francisco
    { id: 2, name: 'Service Truck', reg: 'XYZ-789', status: 'parked', speed: 0, battery: 78, lastUpdate: '15 min ago', address: '5678 Broadway, Somewhere, CA', coordinates: [-118.2437, 34.0522] }, // Los Angeles
    { id: 3, name: 'Fleet Car #42', reg: 'DEF-456', status: 'idle', speed: 0, battery: 64, lastUpdate: '2h ago', address: '910 Park Ave, Nowhere, CA', coordinates: [-117.1611, 32.7157] }, // San Diego
    { id: 4, name: 'Executive Vehicle', reg: 'GHI-101', status: 'moving', speed: 65, battery: 87, lastUpdate: '1 min ago', address: '1122 Executive Way, Corporation, CA', coordinates: [-121.4944, 38.5816] }, // Sacramento
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'moving': return 'text-green-500';
      case 'parked': return 'text-blue-500';
      case 'idle': return 'text-amber-500';
      default: return 'text-gray-500';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 75) return 'text-green-500';
    if (level > 40) return 'text-amber-500';
    return 'text-red-500';
  };

  // Initialize OpenStreetMap
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Create vector source and layer for vehicle markers
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          scale: 0.5
        })
      })
    });

    // Create the map instance
    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([-119.4179, 36.7783]), // California center
        zoom: 6
      })
    });

    // Add vehicle markers to the map
    trackedVehicles.forEach(vehicle => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(vehicle.coordinates)),
        name: vehicle.name,
        id: vehicle.id
      });
      vectorSource.addFeature(feature);
    });

    // Clean up on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

  // Focus on selected vehicle
  useEffect(() => {
    if (!mapInstance.current || selectedVehicle === null) return;
    
    const vehicle = trackedVehicles.find(v => v.id === selectedVehicle);
    if (vehicle) {
      mapInstance.current.getView().animate({
        center: fromLonLat(vehicle.coordinates),
        zoom: 12,
        duration: 1000
      });
      
      toast(`Tracking ${vehicle.name}`, {
        description: `Last seen ${vehicle.lastUpdate} at ${vehicle.address}`,
        action: {
          label: "View Details",
          onClick: () => console.log("View details clicked")
        }
      });
    }
  }, [selectedVehicle]);

  const handleRefresh = () => {
    toast("Refreshing GPS data...", {
      description: "Fetching the latest location information for all vehicles"
    });
    // In a real app, this would fetch new data from the server
    setTimeout(() => {
      toast.success("GPS data updated", {
        description: "All vehicle locations are now current"
      });
    }, 1500);
  };

  // Filter vehicles by search term
  const filteredVehicles = trackedVehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchAddress.toLowerCase()) || 
    vehicle.reg.toLowerCase().includes(searchAddress.toLowerCase()) ||
    vehicle.address.toLowerCase().includes(searchAddress.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>GPS Tracking | Salespipe CRM</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">GPS Live Tracking</h1>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={handleRefresh}
                >
                  <RotateCw className="mr-1 h-4 w-4" />
                  Refresh Data
                </Button>
                <Button>Add New Device</Button>
              </div>
            </div>

            <Tabs defaultValue="map" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:w-auto">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="map" className="space-y-4">
                <div className="flex mb-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search address or vehicle..."
                      className="pl-10"
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <Card className="h-[500px]">
                      <CardContent className="h-full p-0 relative">
                        <div ref={mapRef} className="w-full h-full" />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredVehicles.map((vehicle) => (
                      <Card 
                        key={vehicle.id} 
                        className={`shadow-sm cursor-pointer transition-all ${selectedVehicle === vehicle.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'}`}
                        onClick={() => setSelectedVehicle(vehicle.id)}
                      >
                        <CardHeader className="p-4 pb-0">
                          <CardTitle className="text-sm">
                            <div className="flex items-center justify-between">
                              <span>{vehicle.name}</span>
                              <Badge className={`${getStatusColor(vehicle.status)} bg-white`}>
                                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                              </Badge>
                            </div>
                          </CardTitle>
                          <CardDescription className="text-xs">{vehicle.reg}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="text-xs space-y-1">
                            <div className="flex items-center text-muted-foreground">
                              <Activity className="h-3 w-3 mr-1" />
                              <span>{vehicle.speed} mph</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Battery className={`h-3 w-3 mr-1 ${getBatteryColor(vehicle.battery)}`} />
                              <span>{vehicle.battery}%</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Zap className="h-3 w-3 mr-1" />
                              <span>Last update: {vehicle.lastUpdate}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Tracking List</CardTitle>
                    <CardDescription>All active GPS tracking devices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredVehicles.map((vehicle) => (
                        <div 
                          key={vehicle.id} 
                          className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            setSelectedVehicle(vehicle.id);
                            setActiveTab('map');
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <CarFront className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{vehicle.name}</p>
                              <p className="text-sm text-muted-foreground">{vehicle.reg} • {vehicle.address}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                              {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                            </span>
                            <span className="text-xs text-muted-foreground">Updated {vehicle.lastUpdate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>GPS Alerts Configuration</CardTitle>
                    <CardDescription>Set up notifications for tracked vehicles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                        <p className="font-medium text-amber-800">No recent alerts</p>
                        <p className="text-sm text-amber-700">All tracked vehicles are operating within normal parameters.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Alert Settings</h3>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>Speed Limit Alert</p>
                            <p className="text-sm text-muted-foreground">Notify when vehicles exceed speed limit</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>Geo-fence Alert</p>
                            <p className="text-sm text-muted-foreground">Alert when vehicles exit defined areas</p>
                          </div>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>Battery Level Alert</p>
                            <p className="text-sm text-muted-foreground">Notify on low battery in tracking devices</p>
                          </div>
                          <input type="checkbox" className="toggle" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default GpsService;
