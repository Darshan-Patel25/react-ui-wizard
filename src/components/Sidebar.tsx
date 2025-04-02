
import { useState } from 'react';
import { LayoutDashboard, Users, Car, Drill, CreditCard, HelpCircle, Settings, Search, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            <Avatar className="h-9 w-9">
              <img
                src="https://github.com/shadcn.png" 
                alt="Profile"
                className="object-cover"
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">Theresa Webb</span>
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
          <li>
            <a className="sidebar-item active" href="#">
              <LayoutDashboard className="h-5 w-5" />
              {!isCollapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a className="sidebar-item" href="#">
              <Users className="h-5 w-5" />
              {!isCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Projects</span>
                  <span className="bg-gray-200 text-gray-800 text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                    6
                  </span>
                </div>
              )}
            </a>
          </li>
          <li>
            <a className="sidebar-item" href="#">
              <Users className="h-5 w-5" />
              {!isCollapsed && <span>Customers</span>}
            </a>
          </li>
          <li>
            <a className="sidebar-item" href="#">
              <Car className="h-5 w-5" />
              {!isCollapsed && <span>Cars</span>}
            </a>
          </li>
          <li>
            <a className="sidebar-item" href="#">
              <Drill className="h-5 w-5" />
              {!isCollapsed && <span>Test Drive</span>}
            </a>
          </li>
          <li>
            <a className="sidebar-item" href="#">
              <CreditCard className="h-5 w-5" />
              {!isCollapsed && <span>Payments</span>}
            </a>
          </li>
        </ul>
      </nav>

      {/* Footer Nav */}
      <div className="mt-auto border-t py-2">
        <ul className="space-y-1 px-2">
          <li>
            <a className="sidebar-item" href="#">
              <HelpCircle className="h-5 w-5" />
              {!isCollapsed && <span>Help & Center</span>}
            </a>
          </li>
          <li>
            <a className="sidebar-item" href="#">
              <Settings className="h-5 w-5" />
              {!isCollapsed && <span>Settings</span>}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
