import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Send, 
  Bell, 
  Settings, 
  Users, 
  Bot, 
  BarChart3, 
  Clock, 
  ChevronRight, 
  HelpCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BotStatus = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  MAINTENANCE: 'maintenance'
};

const TelegramBot = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [botStatus, setBotStatus] = useState(BotStatus.ONLINE);
  const [webhookUrl, setWebhookUrl] = useState('https://api.example.com/telegram-webhook');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState('');
  const [botConnected, setBotConnected] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const { toast } = useToast();

  // Mock conversations
  const conversations = [
    { id: 1, user: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', lastMessage: 'Need help with GPS installation', time: '10:23 AM', unread: 2 },
    { id: 2, user: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', lastMessage: 'When will my order arrive?', time: 'Yesterday', unread: 0 },
    { id: 3, user: 'Robert Johnson', avatar: 'https://i.pravatar.cc/150?img=3', lastMessage: 'Thanks for the quick response!', time: 'Yesterday', unread: 0 },
    { id: 4, user: 'Emily Williams', avatar: 'https://i.pravatar.cc/150?img=4', lastMessage: 'I need to reschedule my appointment', time: '2 days ago', unread: 1 },
  ];

  // Mock commands
  const botCommands = [
    { command: '/help', description: 'Show available commands' },
    { command: '/status', description: 'Check order status' },
    { command: '/schedule', description: 'Schedule a service appointment' },
    { command: '/track', description: 'Get tracking information' },
    { command: '/support', description: 'Connect with customer support' },
  ];

  // Mock analytics data
  const analyticsData = {
    totalUsers: 1245,
    activeUsers: 587,
    messagesPerDay: 432,
    responseRate: 95,
    avgResponseTime: '2.5 min',
  };

  // Mock pending requests
  const pendingRequests = [
    { id: 1, user: 'John Doe', type: 'GPS Installation', location: '123 Main St, San Francisco', date: '2023-05-15', status: 'pending' },
    { id: 2, user: 'Jane Smith', type: 'Service', location: '456 Oak Ave, Berkeley', date: '2023-05-16', status: 'pending' },
    { id: 3, user: 'Robert Johnson', type: 'Device Repair', location: '789 Pine St, Oakland', date: '2023-05-17', status: 'pending' },
  ];

  const handleStatusChange = (newStatus: string) => {
    setBotStatus(newStatus);
    toast({
      title: "Bot Status Updated",
      description: `Bot is now ${newStatus}`,
    });
  };

  const handleSaveWebhook = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Webhook URL Updated",
        description: "The Telegram bot webhook URL has been updated successfully",
      });
    }, 1000);
  };

  const handleConnectBot = () => {
    if (!chatId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Chat ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setBotConnected(true);
      toast({
        title: "Bot Connected",
        description: `Successfully connected to Telegram bot with Chat ID: ${chatId}`,
      });
    }, 1500);
  };

  const handleDisconnectBot = () => {
    setBotConnected(false);
    toast({
      title: "Bot Disconnected",
      description: "Successfully disconnected from Telegram bot",
    });
  };

  const handleRequestAction = (action: 'accept' | 'reject') => {
    if (!selectedRequest) return;
    
    setShowRequestDialog(false);
    
    toast({
      title: action === 'accept' ? "Request Accepted" : "Request Rejected",
      description: `You have ${action === 'accept' ? 'accepted' : 'rejected'} the request from ${selectedRequest.user}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Telegram Bot | Salespipe CRM</title>
      </Helmet>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <h1 className="text-2xl font-bold">Telegram Bot</h1>
                <Badge 
                  className={`ml-3 ${
                    botStatus === BotStatus.ONLINE 
                      ? 'bg-green-100 text-green-800' 
                      : botStatus === BotStatus.MAINTENANCE
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {botStatus.charAt(0).toUpperCase() + botStatus.slice(1)}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Bell className="mr-1 h-4 w-4" />
                  Notifications
                </Button>
                <Button>
                  <Settings className="mr-1 h-4 w-4" />
                  Bot Settings
                </Button>
              </div>
            </div>

            <Tabs defaultValue="conversations" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="conversations">Conversations</TabsTrigger>
                <TabsTrigger value="commands">Commands</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversations" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Recent Conversations</CardTitle>
                        <CardDescription>Chat history with users</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="divide-y">
                          {conversations.map((convo) => (
                            <div key={convo.id} className="flex items-center py-3 cursor-pointer hover:bg-gray-50 px-2 rounded-md">
                              <Avatar className="h-10 w-10 mr-3">
                                <img src={convo.avatar} alt={convo.user} />
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium truncate">{convo.user}</h4>
                                  <span className="text-xs text-muted-foreground">{convo.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                              </div>
                              {convo.unread > 0 && (
                                <div className="ml-2 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                  {convo.unread}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Card className="h-[600px] flex flex-col">
                      <CardHeader className="pb-2 border-b">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <img src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
                          </Avatar>
                          <div>
                            <CardTitle className="text-md">John Doe</CardTitle>
                            <CardDescription className="text-xs">Active now</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-2">
                              <img src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
                            </Avatar>
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">Hello, I need help with GPS installation for my fleet vehicles.</p>
                              <span className="text-xs text-muted-foreground">10:21 AM</span>
                            </div>
                          </div>
                          
                          <div className="flex items-start justify-end">
                            <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">Hi John, I'd be happy to help you with that. How many vehicles do you need GPS installed on?</p>
                              <span className="text-xs text-muted-foreground">10:22 AM</span>
                            </div>
                            <Avatar className="h-8 w-8 ml-2">
                              <Bot className="h-5 w-5" />
                            </Avatar>
                          </div>
                          
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-2">
                              <img src="https://i.pravatar.cc/150?img=1" alt="John Doe" />
                            </Avatar>
                            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                              <p className="text-sm">I have 5 delivery trucks that need GPS tracking installed. Can you provide a quote?</p>
                              <span className="text-xs text-muted-foreground">10:23 AM</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="p-4 border-t">
                        <div className="flex items-center">
                          <Input 
                            placeholder="Type your message..." 
                            className="flex-grow mr-2"
                          />
                          <Button size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="commands" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Bot Commands</CardTitle>
                    <CardDescription>Manage and customize Telegram bot commands</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium">Active Commands</h3>
                        <div className="space-y-2">
                          {botCommands.map((cmd, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium text-blue-600">{cmd.command}</p>
                                <p className="text-sm text-muted-foreground">{cmd.description}</p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Add New Command</h3>
                        <div className="flex space-x-2">
                          <Input placeholder="Command (e.g. /newcmd)" className="w-1/3" />
                          <Input placeholder="Description" className="w-1/2" />
                          <Button>Add Command</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="requests" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Requests</CardTitle>
                    <CardDescription>Manage service requests from Telegram users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!botConnected ? (
                      <div className="text-center py-6">
                        <Bot className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Bot Not Connected</h3>
                        <p className="text-muted-foreground mb-4">Connect your Telegram bot to view and manage service requests</p>
                        <Button onClick={() => setActiveTab('settings')}>Go to Settings</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="font-medium">Pending Requests</h3>
                        <div className="space-y-2">
                          {pendingRequests.map((request) => (
                            <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{request.user}</p>
                                <p className="text-sm text-muted-foreground">{request.type} - {request.date}</p>
                                <p className="text-xs text-muted-foreground">{request.location}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedRequest(request);
                                    setShowRequestDialog(true);
                                  }}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-3">
                    <CardHeader>
                      <CardTitle>Bot Usage Analytics</CardTitle>
                      <CardDescription>Usage metrics for your Telegram bot</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                          <p className="text-gray-500">Bot usage analytics chart would appear here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <Users className="mr-2 h-4 w-4" /> 
                        Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{analyticsData.totalUsers}</div>
                      <p className="text-muted-foreground">Total users</p>
                      <div className="mt-2 flex items-center">
                        <div className="text-lg font-medium">{analyticsData.activeUsers}</div>
                        <p className="text-muted-foreground ml-2">Active today</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" /> 
                        Messages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{analyticsData.messagesPerDay}</div>
                      <p className="text-muted-foreground">Messages per day</p>
                      <div className="mt-2 flex items-center">
                        <div className="text-lg font-medium">{analyticsData.responseRate}%</div>
                        <p className="text-muted-foreground ml-2">Response rate</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md flex items-center">
                        <Clock className="mr-2 h-4 w-4" /> 
                        Response Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{analyticsData.avgResponseTime}</div>
                      <p className="text-muted-foreground">Average response time</p>
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Bot Connection</CardTitle>
                    <CardDescription>Connect to your Telegram bot</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {botConnected ? (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <p className="font-medium text-green-700">Bot Successfully Connected</p>
                        </div>
                        <p className="text-sm text-green-600 mb-3">Your Telegram bot is connected with Chat ID: {chatId}</p>
                        <Button variant="outline" size="sm" onClick={handleDisconnectBot}>
                          Disconnect Bot
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="chatId">Telegram Bot Chat ID</Label>
                          <Input 
                            id="chatId" 
                            value={chatId}
                            onChange={(e) => setChatId(e.target.value)}
                            placeholder="Enter your Telegram bot Chat ID"
                          />
                          <p className="text-xs text-muted-foreground">
                            You can find your Chat ID by messaging @userinfobot on Telegram
                          </p>
                        </div>
                        <Button 
                          onClick={handleConnectBot}
                          disabled={isLoading}
                        >
                          {isLoading ? "Connecting..." : "Connect Bot"}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Bot Configuration</CardTitle>
                    <CardDescription>Manage your Telegram bot settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Bot Status</h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${botStatus === BotStatus.ONLINE ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span>Online</span>
                          </div>
                          <Button 
                            variant={botStatus === BotStatus.ONLINE ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleStatusChange(BotStatus.ONLINE)}
                          >
                            Set as Online
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${botStatus === BotStatus.MAINTENANCE ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                            <span>Maintenance Mode</span>
                          </div>
                          <Button 
                            variant={botStatus === BotStatus.MAINTENANCE ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleStatusChange(BotStatus.MAINTENANCE)}
                          >
                            Enable Maintenance
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${botStatus === BotStatus.OFFLINE ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                            <span>Offline</span>
                          </div>
                          <Button 
                            variant={botStatus === BotStatus.OFFLINE ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleStatusChange(BotStatus.OFFLINE)}
                          >
                            Take Offline
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Webhook Configuration</h3>
                      <div className="space-y-2">
                        <div className="p-3 border rounded-lg">
                          <p className="text-sm mb-2">Current Webhook URL:</p>
                          <div className="flex space-x-2">
                            <Input 
                              value={webhookUrl} 
                              onChange={(e) => setWebhookUrl(e.target.value)}
                              className="flex-grow"
                            />
                            <Button 
                              onClick={handleSaveWebhook}
                              disabled={isLoading}
                            >
                              {isLoading ? "Saving..." : "Save"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Notification Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>New Message Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>User Registration Alerts</p>
                            <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p>Error Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive alerts for bot errors</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Help & Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Telegram Bot API Documentation</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Bot Integration Guide</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                          <span>Troubleshooting Common Issues</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Service Request Details</DialogTitle>
            <DialogDescription>
              Request from {selectedRequest?.user}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Request Type</p>
                  <p className="text-sm">{selectedRequest.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">{selectedRequest.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">{selectedRequest.location}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Take Action</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Would you like to accept or reject this service request?
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => handleRequestAction('reject')}
              className="text-red-600"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Request
            </Button>
            <Button onClick={() => handleRequestAction('accept')}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TelegramBot;
