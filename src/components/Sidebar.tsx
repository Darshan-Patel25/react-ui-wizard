
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  Drill, 
  CreditCard, 
  HelpCircle, 
  Settings, 
  Search, 
  Menu,
  MapPin,
  ListChecks,
  MessageSquare,
  User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: Users, text: 'Customers', path: '/user-details' },
    { icon: MapPin, text: 'GPS Service', path: '/gps-service' },
    { icon: ListChecks, text: 'Requests', path: '/requests' },
    { icon: MessageSquare, text: 'Telegram Bot', path: '/telegram-bot' },
    { icon: Car, text: 'Cars', path: '/cars' },
    { icon: Drill, text: 'Test Drive', path: '/test-drive' },
    { icon: CreditCard, text: 'Payments', path: '/payments' },
  ];

  return (
    <div className={`bg-white border-r ${isCollapsed ? 'w-16' : 'w-64'} h-screen transition-all duration-300 ease-in-out flex flex-col`}>
      {/* Profile Section */}
      <div className="p-4">
        {isCollapsed ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(false)}
            className="mb-3"
          >
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <div className="flex items-center space-x-3 mb-6">
            <Link to="/user-profile">
              <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                <img
                  src="https://github.com/shadcn.png" 
                  alt="Profile"
                  className="object-cover"
                />
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link to="/user-profile" className="font-medium text-sm hover:text-primary">
                Theresa Webb
              </Link>
              <span className="text-gray-500 text-xs">theresa@glowteam</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(true)}
              className="ml-auto"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Search Box */}
        {!isCollapsed && (
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name..."
              className="pl-8 text-sm py-1 h-9"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link 
                className={`sidebar-item ${window.location.pathname === item.path ? 'active' : ''}`} 
                to={item.path}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && (
                  <span>{item.text}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Nav */}
      <div className="mt-auto border-t py-2">
        <ul className="space-y-1 px-2">
          <li>
            <Link className="sidebar-item" to="/user-profile">
              <User className="h-5 w-5" />
              {!isCollapsed && <span>My Profile</span>}
            </Link>
          </li>
          <li>
            <Link className="sidebar-item" to="/help">
              <HelpCircle className="h-5 w-5" />
              {!isCollapsed && <span>Help & Center</span>}
            </Link>
          </li>
          <li>
            <Link className="sidebar-item" to="/settings">
              <Settings className="h-5 w-5" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
