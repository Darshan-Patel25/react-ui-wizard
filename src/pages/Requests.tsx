
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, MoreHorizontal, Map, ArrowUpRight, Building, FilePdf } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import CompetitorMap from '@/components/CompetitorMap';
import InvoiceGenerator from '@/components/InvoiceGenerator';
import RequestStats from '@/components/RequestStats';
import { useToast } from '@/hooks/use-toast';

const Requests = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const { toast } = useToast();
  
  // Mock data for service requests
  const allRequests = [
    { id: 1, client: 'Acme Corp', type: 'Installation', status: 'Pending', location: '123 Business St, San Francisco', date: '2023-05-15', competitor: false, priority: 'High' },
    { id: 2, client: 'TechGiant Inc', type: 'Maintenance', status: 'Completed', location: '456 Tech Ave, San Jose', date: '2023-05-12', competitor: true, priority: 'Medium' },
    { id: 3, client: 'StartUp Co', type: 'Repair', status: 'In Progress', location: '789 Innovation Blvd, Palo Alto', date: '2023-05-14', competitor: false, priority: 'Low' },
    { id: 4, client: 'Global Enterprises', type: 'Installation', status: 'Scheduled', location: '101 Corporate Dr, Oakland', date: '2023-05-16', competitor: false, priority: 'Medium' },
    { id: 5, client: 'Local Business', type: 'Repair', status: 'Pending', location: '202 Main St, Berkeley', date: '2023-05-15', competitor: true, priority: 'High' },
  ];
  
  // Filtered requests based on active tab and search term
  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = request.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          request.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'competitors') return matchesSearch && request.competitor;
    if (activeTab === 'pending') return matchesSearch && request.status === 'Pending';
    if (activeTab === 'completed') return matchesSearch && request.status === 'Completed';
    
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-amber-100 text-amber-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateInvoice = (requestId: number) => {
    setSelectedRequest(requestId);
    setShowInvoiceDialog(true);
  };

  return (
    <>
      <Helmet>
        <title>Service Requests | Salespipe CRM</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">Service Requests</h1>
              <Button>New Request</Button>
            </div>

            <RequestStats />

            <div className="mt-6">
              <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <TabsList className="mb-4 md:mb-0">
                    <TabsTrigger value="all">All Requests</TabsTrigger>
                    <TabsTrigger value="competitors">Near Competitors</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search requests..."
                      className="pl-10 w-full md:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <TabsContent value="all" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>All Service Requests</CardTitle>
                      <CardDescription>View and manage all service requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Client</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Priority</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredRequests.map((request) => (
                              <TableRow key={request.id}>
                                <TableCell>#{request.id}</TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    {request.client}
                                    {request.competitor && (
                                      <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
                                        Competitor Nearby
                                      </Badge>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>{request.type}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                    {request.status}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                    {request.priority}
                                  </span>
                                </TableCell>
                                <TableCell className="max-w-xs truncate">{request.location}</TableCell>
                                <TableCell>{request.date}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      title="View on map"
                                    >
                                      <Map className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      title="Generate Invoice"
                                      onClick={() => handleGenerateInvoice(request.id)}
                                    >
                                      <FilePdf className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      title="More options"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="competitors" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Requests Near Competitors</CardTitle>
                      <CardDescription>Service requests in proximity to competitors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <CompetitorMap />
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium">Nearby Competitors</h3>
                          {allRequests.filter(r => r.competitor).map((request) => (
                            <Card key={request.id} className="shadow-sm">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <Building className="h-4 w-4 text-gray-400" />
                                  <span className="font-medium">{request.client}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{request.location}</p>
                                <div className="flex justify-between items-center">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                    {request.status}
                                  </span>
                                  <Button variant="link" size="sm" className="h-6 p-0">
                                    <span className="text-xs">Details</span>
                                    <ArrowUpRight className="ml-1 h-3 w-3" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Requests</CardTitle>
                      <CardDescription>Service requests awaiting action</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>#{request.id}</TableCell>
                              <TableCell>{request.client}</TableCell>
                              <TableCell>{request.type}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                  {request.priority}
                                </span>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">{request.location}</TableCell>
                              <TableCell>{request.date}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button size="sm">Process Request</Button>
                                  <Button 
                                    variant="outline" 
                                    size="icon"
                                    onClick={() => handleGenerateInvoice(request.id)}
                                  >
                                    <FilePdf className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Requests</CardTitle>
                      <CardDescription>Successfully completed service requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Completion Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>#{request.id}</TableCell>
                              <TableCell>{request.client}</TableCell>
                              <TableCell>{request.type}</TableCell>
                              <TableCell>{request.date}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">View Details</Button>
                                  <Button 
                                    variant="outline" 
                                    size="icon"
                                    onClick={() => handleGenerateInvoice(request.id)}
                                  >
                                    <FilePdf className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Generation Dialog */}
      <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
        <DialogContent className="sm:max-w-3xl">
          <InvoiceGenerator 
            onClose={() => setShowInvoiceDialog(false)}
            requestId={selectedRequest || undefined}
            requestType="service"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Requests;
