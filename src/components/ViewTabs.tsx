
import { useState } from 'react';
import { Kanban, List, GanttChart, Table2 } from 'lucide-react';

const ViewTabs = () => {
  const [activeTab, setActiveTab] = useState('list');

  const tabs = [
    { id: 'kanban', name: 'Kanban', icon: <Kanban className="h-4 w-4" /> },
    { id: 'list', name: 'List', icon: <List className="h-4 w-4" /> },
    { id: 'gantt', name: 'Gantt', icon: <GanttChart className="h-4 w-4" /> },
    { id: 'table', name: 'Table', icon: <Table2 className="h-4 w-4" /> },
  ];

  // This would be used to filter the view in a real application
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // In a real app, you might dispatch an action or update context
    console.log(`View changed to: ${tabId}`);
  };

  return (
    <div className="flex items-center border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`flex items-center gap-2 py-3 px-4 border-b-2 ${
            activeTab === tab.id
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-gray-500'
          }`}
        >
          {tab.icon}
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewTabs;
