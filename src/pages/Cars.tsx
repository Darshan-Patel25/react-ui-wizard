
import { Helmet } from 'react-helmet';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Search, Car as CarIcon, FilePdf } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Cars = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Mock car data
  const cars = [
    { id: 1, model: 'Tesla Model S', status: 'Available', year: 2023, color: 'Red', license: 'ABC123', lastService: '2023-12-15' },
    { id: 2, model: 'BMW X5', status: 'In Service', year: 2022, color: 'Black', license: 'XYZ789', lastService: '2023-11-20' },
    { id: 3, model: 'Toyota Camry', status: 'Rented', year: 2021, color: 'White', license: 'DEF456', lastService: '2023-10-05' },
    { id: 4, model: 'Ford Mustang', status: 'Available', year: 2023, color: 'Blue', license: 'GHI789', lastService: '2023-12-01' },
    { id: 5, model: 'Honda Civic', status: 'In Service', year: 2022, color: 'Silver', license: 'JKL012', lastService: '2023-11-15' },
  ];

  const filteredCars = cars.filter(car => 
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateInvoice = (carId: number) => {
    toast({
      title: "Invoice Generated",
      description: `Invoice for car #${carId} has been generated.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Cars | Salespipe CRM</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">Fleet Management</h1>
              <Button>Add New Car</Button>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Car Inventory</CardTitle>
                <CardDescription>Manage your vehicle fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                  <div className="relative w-full md:w-auto mb-4 md:mb-0">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search cars..."
                      className="pl-10 w-full md:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead>License Plate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Service</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCars.map((car) => (
                        <TableRow key={car.id}>
                          <TableCell>#{car.id}</TableCell>
                          <TableCell className="font-medium">{car.model}</TableCell>
                          <TableCell>{car.year}</TableCell>
                          <TableCell>{car.color}</TableCell>
                          <TableCell>{car.license}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                car.status === 'Available' 
                                  ? 'bg-green-100 text-green-800' 
                                  : car.status === 'In Service'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-blue-800'
                              }
                            >
                              {car.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{car.lastService}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleGenerateInvoice(car.id)}
                                title="Generate Invoice"
                              >
                                <FilePdf className="h-4 w-4" />
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Cars;
