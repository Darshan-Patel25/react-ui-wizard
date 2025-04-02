
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Activity, Battery, Zap, CarFront, RotateCw } from 'lucide-react';

const GpsService = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [searchAddress, setSearchAddress] = useState('');
  
  // Mock data for GPS tracked vehicles
  const trackedVehicles = [
    { id: 1, name: 'Delivery Van #1', reg: 'ABC-123', status: 'moving', speed: 45, battery: 92, lastUpdate: '2 min ago', address: '1234 Main St, Anytown, CA' },
    { id: 2, name: 'Service Truck', reg: 'XYZ-789', status: 'parked', speed: 0, battery: 78, lastUpdate: '15 min ago', address: '5678 Broadway, Somewhere, CA' },
    { id: 3, name: 'Fleet Car #42', reg: 'DEF-456', status: 'idle', speed: 0, battery: 64, lastUpdate: '2h ago', address: '910 Park Ave, Nowhere, CA' },
    { id: 4, name: 'Executive Vehicle', reg: 'GHI-101', status: 'moving', speed: 65, battery: 87, lastUpdate: '1 min ago', address: '1122 Executive Way, Corporation, CA' },
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
                  onClick={() => window.location.reload()}
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
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-gray-500">Map placeholder - GPS tracking map would appear here</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    {trackedVehicles.map((vehicle) => (
                      <Card key={vehicle.id} className="shadow-sm">
                        <CardHeader className="p-4 pb-0">
                          <CardTitle className="text-sm">
                            <div className="flex items-center justify-between">
                              <span>{vehicle.name}</span>
                              <span className={`text-xs ${getStatusColor(vehicle.status)}`}>
                                {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                              </span>
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
                      {trackedVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
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
