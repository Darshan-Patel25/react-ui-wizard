
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  Edit, 
  Shield 
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const userData = {
    id: 1,
    name: 'Theresa Webb',
    email: 'theresa@glowteam.com',
    phone: '+1 (555) 123-4567',
    address: '1234 Main Street, San Francisco, CA 94103',
    joinDate: 'March 15, 2022',
    role: 'Administrator',
    status: 'Active',
    imageUrl: 'https://github.com/shadcn.png',
    services: [
      { id: 1, name: 'GPS Tracking', status: 'Active', nextPayment: 'May 15, 2023' },
      { id: 2, name: 'Fleet Management', status: 'Active', nextPayment: 'May 15, 2023' },
      { id: 3, name: 'Driver Analytics', status: 'Pending', nextPayment: 'N/A' }
    ],
    availability: {
      monday: { isAvailable: true, hours: '9:00 AM - 5:00 PM' },
      tuesday: { isAvailable: true, hours: '9:00 AM - 5:00 PM' },
      wednesday: { isAvailable: true, hours: '9:00 AM - 5:00 PM' },
      thursday: { isAvailable: true, hours: '9:00 AM - 5:00 PM' },
      friday: { isAvailable: true, hours: '9:00 AM - 3:00 PM' },
      saturday: { isAvailable: false, hours: 'N/A' },
      sunday: { isAvailable: false, hours: 'N/A' }
    },
    billing: {
      plan: 'Business Pro',
      amount: '$149.99',
      cycle: 'Monthly',
      cardLast4: '4242'
    }
  };

  return (
    <>
      <Helmet>
        <title>User Profile | Salespipe CRM</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="container max-w-6xl mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-2xl font-bold">User Profile</h1>
              <Button variant="outline" className="mt-4 md:mt-0">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* User Card */}
              <Card className="md:col-span-1">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <img 
                      src={userData.imageUrl} 
                      alt={userData.name} 
                      className="object-cover"
                    />
                  </Avatar>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-gray-500 mb-2">{userData.role}</p>
                  <Badge variant={userData.status === 'Active' ? 'default' : 'secondary'} className="mb-4">
                    {userData.status}
                  </Badge>
                  <div className="w-full space-y-3 text-left mt-4">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{userData.address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      <span>Joined {userData.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Content */}
              <div className="md:col-span-3">
                <Tabs defaultValue="profile" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile Details</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                  </TabsList>
                  
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Information</CardTitle>
                        <CardDescription>View and update your personal details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Full Name</h3>
                            <p>{userData.name}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Email Address</h3>
                            <p>{userData.email}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Phone Number</h3>
                            <p>{userData.phone}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Role</h3>
                            <p>{userData.role}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Address</h3>
                            <p>{userData.address}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Member Since</h3>
                            <p>{userData.joinDate}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Billing Information</CardTitle>
                        <CardDescription>Your current billing information and plan</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Current Plan</h3>
                            <p>{userData.billing.plan}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Billing Amount</h3>
                            <p>{userData.billing.amount} / {userData.billing.cycle}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-gray-500 mb-1">Payment Method</h3>
                            <div className="flex items-center">
                              <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
                              <span>Card ending in {userData.billing.cardLast4}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Update Billing Information</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  {/* Services Tab */}
                  <TabsContent value="services">
                    <Card>
                      <CardHeader>
                        <CardTitle>Subscribed Services</CardTitle>
                        <CardDescription>Services you are currently subscribed to</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {userData.services.map((service) => (
                            <div key={service.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium">{service.name}</h3>
                                <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                                  {service.status}
                                </Badge>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Next payment: {service.nextPayment}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Browse Additional Services</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  
                  {/* Availability Tab */}
                  <TabsContent value="availability">
                    <Card>
                      <CardHeader>
                        <CardTitle>Availability Schedule</CardTitle>
                        <CardDescription>Your working hours and availability</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(userData.availability).map(([day, data]) => (
                            <div key={day} className="flex items-center justify-between py-2 border-b last:border-0">
                              <div className="flex items-center">
                                <div className="w-24 font-medium capitalize">{day}</div>
                                {data.isAvailable ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                                    Unavailable
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{data.hours}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline">Update Availability</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
