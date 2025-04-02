
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Mock data for request statistics
const monthlyRequestData = [
  { name: 'Jan', total: 45, accepted: 32, rejected: 13 },
  { name: 'Feb', total: 58, accepted: 40, rejected: 18 },
  { name: 'Mar', total: 63, accepted: 45, rejected: 18 },
  { name: 'Apr', total: 72, accepted: 53, rejected: 19 },
  { name: 'May', total: 80, accepted: 60, rejected: 20 },
  { name: 'Jun', total: 95, accepted: 70, rejected: 25 },
];

const requestStatusData = [
  { name: 'Accepted', value: 70, color: '#4ade80' },
  { name: 'Rejected', value: 20, color: '#f87171' },
  { name: 'Pending', value: 10, color: '#fbbf24' },
];

const COLORS = ['#4ade80', '#f87171', '#fbbf24'];

const RequestStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Service Requests</CardTitle>
          <CardDescription>Overview of requests by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRequestData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Total Requests" />
                <Bar dataKey="accepted" fill="#4ade80" name="Accepted" />
                <Bar dataKey="rejected" fill="#f87171" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Request Status Distribution</CardTitle>
          <CardDescription>Current status of all requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {requestStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded shadow">
                        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestStats;
