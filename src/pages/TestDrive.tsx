
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, FilePdf, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const TestDrive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Mock test drive appointments
  const testDrives = [
    { id: 1, customer: 'John Doe', car: 'Tesla Model S', date: '2023-05-15 10:00 AM', status: 'Scheduled', phone: '+1 555-123-4567' },
    { id: 2, customer: 'Jane Smith', car: 'BMW X5', date: '2023-05-16 2:30 PM', status: 'Completed', phone: '+1 555-987-6543' },
    { id: 3, customer: 'Robert Johnson', car: 'Ford Mustang', date: '2023-05-17 11:00 AM', status: 'Cancelled', phone: '+1 555-456-7890' },
    { id: 4, customer: 'Emily Williams', car: 'Toyota Camry', date: '2023-05-18 1:00 PM', status: 'Scheduled', phone: '+1 555-789-0123' },
    { id: 5, customer: 'Michael Brown', car: 'Honda Civic', date: '2023-05-19 3:30 PM', status: 'Scheduled', phone: '+1 555-234-5678' },
  ];

  const filteredTestDrives = testDrives.filter(drive => 
    drive.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drive.car.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateInvoice = (testDriveId: number) => {
    toast({
      title: "Invoice Generated",
      description: `Invoice for test drive #${testDriveId} has been generated.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Test Drive | Salespipe CRM</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">Test Drive Management</h1>
              <Button>Schedule New Test Drive</Button>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Test Drive Appointments</CardTitle>
                <CardDescription>Manage customer test drive bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full md:w-64 mb-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search appointments..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Car Model</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTestDrives.map((drive) => (
                        <TableRow key={drive.id}>
                          <TableCell>#{drive.id}</TableCell>
                          <TableCell className="font-medium">{drive.customer}</TableCell>
                          <TableCell>{drive.phone}</TableCell>
                          <TableCell>{drive.car}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                              {drive.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                drive.status === 'Scheduled' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : drive.status === 'Completed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                              }
                            >
                              {drive.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleGenerateInvoice(drive.id)}
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

export default TestDrive;
