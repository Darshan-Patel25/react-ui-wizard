
import { Helmet } from 'react-helmet';
import { BarChart3, Users, MapPin, CalendarClock, ArrowUpRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ViewTabs from '@/components/ViewTabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const statsCards = [
  {
    title: "Total Leads",
    value: "3,456",
    change: "+12.5%",
    icon: <Users className="h-5 w-5 text-blue-500" />,
    description: "than last month"
  },
  {
    title: "Active GPS Tracking",
    value: "278",
    change: "+5.2%",
    icon: <MapPin className="h-5 w-5 text-green-500" />,
    description: "devices online"
  },
  {
    title: "Pending Requests",
    value: "24",
    change: "-3.1%",
    icon: <CalendarClock className="h-5 w-5 text-amber-500" />,
    description: "require attention"
  },
  {
    title: "Bot Interactions",
    value: "1,234",
    change: "+28.4%",
    icon: <BarChart3 className="h-5 w-5 text-purple-500" />,
    description: "in the last week"
  }
];

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Salespipe CRM</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>
              <div className="flex space-x-2">
                <select className="border rounded-md p-2 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((card, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {card.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className={`mr-1 ${card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {card.change}
                      </span>
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Lead Conversion Rate</CardTitle>
                  <CardDescription>Monthly conversion metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    [Chart placeholder - Lead conversion trends]
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Latest service requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">GPS Installation #{item}234</p>
                          <p className="text-sm text-muted-foreground">Client {item} • 2h ago</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item % 2 === 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item % 2 === 0 ? 'Pending' : 'Completed'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button className="text-sm text-blue-600 flex items-center">
                    View all requests
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>
            </div>
            
            <ViewTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
