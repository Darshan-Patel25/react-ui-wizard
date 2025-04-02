
import { useState } from 'react';
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc, ChevronDown, MoreHorizontal, Plus } from 'lucide-react';
import { Flame, Thermometer, Snowflake, Check } from 'lucide-react';
import { useLeads } from '@/hooks/useLeads';
import { Lead } from '@/types/lead';

// Tag components for lead statuses
const LeadTag = ({ type, children }: { type: string; children: React.ReactNode }) => {
  const icons = {
    hot: <Flame className="h-3 w-3" />,
    warm: <Thermometer className="h-3 w-3" />,
    cold: <Snowflake className="h-3 w-3" />,
    deal: <Check className="h-3 w-3" />,
  };

  const icon = icons[type as keyof typeof icons];
  
  return (
    <div className={`inline-flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-full ${
      type === 'hot' ? 'bg-red-100 text-red-700' : 
      type === 'warm' ? 'bg-orange-100 text-orange-700' : 
      type === 'cold' ? 'bg-blue-100 text-blue-700' : 
      'bg-green-100 text-green-700'
    }`}>
      {icon}
      <span className="capitalize">{children}</span>
    </div>
  );
};

// Priority tag component
const PriorityTag = ({ level }: { level: string }) => {
  return (
    <div className={`inline-flex items-center gap-1 text-xs font-medium py-1 px-2 rounded-full ${
      level === 'High' ? 'text-red-700' : 
      level === 'Medium' ? 'text-orange-700' : 
      'text-blue-700'
    }`}>
      <span className={`inline-block w-2 h-2 rounded-full ${
        level === 'High' ? 'bg-red-500' : 
        level === 'Medium' ? 'bg-orange-500' : 
        'bg-blue-500'
      }`}></span>
      <span className="capitalize">{level}</span>
    </div>
  );
};

// Section header with expand/collapse
const SectionHeader = ({ 
  title, 
  count, 
  isOpen, 
  onToggle 
}: { 
  title: string; 
  count: number; 
  isOpen: boolean; 
  onToggle: () => void 
}) => (
  <div className="flex items-center justify-between mb-2 mt-6">
    <div className="flex items-center">
      <button 
        onClick={onToggle} 
        className="mr-2 text-gray-500"
      >
        {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
      </button>
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-5 rounded ${title === 'Prospects' ? 'bg-purple-400' : title === 'Offers' ? 'bg-amber-400' : 'bg-green-400'}`}></div>
        <h3 className="font-medium">{title}</h3>
        <span className="text-xs font-semibold bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">{count}</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="px-2">
        <Plus className="h-4 w-4 mr-1" />
        Add new
      </Button>
      <Button variant="ghost" size="icon" className="h-6 w-6">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const ChevronRight = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Column header component
const ColumnHeader = ({ title }: { title: string }) => (
  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {title}
  </th>
);

// Lead Row component
const LeadRow = ({ lead }: { lead: Lead }) => (
  <tr key={lead.id} className="hover:bg-gray-50">
    <td className="px-4 py-4 whitespace-nowrap">
      <input type="checkbox" className="rounded border-gray-300" />
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex flex-col">
        <div className="font-medium text-gray-900">{lead.client}</div>
        <div className="text-gray-500 text-sm">{lead.email}</div>
      </div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <LeadTag type={lead.type}>{lead.type}</LeadTag>
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
      {lead.order}
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="flex -space-x-1">
        {lead.assignees.map((initials, idx) => (
          <Avatar key={idx} className="h-6 w-6 border-2 border-white">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        ))}
        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full ml-1">
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </td>
    <td className="px-4 py-4 max-w-xs">
      <p className="text-sm text-gray-900 truncate">{lead.notes}</p>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <PriorityTag level={lead.priority} />
    </td>
    <td className="px-4 py-4 whitespace-nowrap text-right">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </td>
  </tr>
);

const LeadTable = () => {
  const [sectionsOpen, setSectionsOpen] = useState({
    prospects: true,
    offers: true,
    deals: true,
  });

  const { leads, isLoading, error } = useLeads();
  
  // Group leads by category
  const prospects = leads.filter(lead => lead.category === 'prospects');
  const offers = leads.filter(lead => lead.category === 'offers');
  const deals = leads.filter(lead => lead.category === 'deals');

  const toggleSection = (section: 'prospects' | 'offers' | 'deals') => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48 bg-white rounded-lg border">
        <div className="animate-pulse text-blue-500">Loading leads...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 bg-white rounded-lg border">
        <div className="text-red-500">Error loading leads. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex-1"></div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <SortAsc className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Prospects Section */}
        <SectionHeader 
          title="Prospects" 
          count={prospects.length} 
          isOpen={sectionsOpen.prospects} 
          onToggle={() => toggleSection('prospects')} 
        />
        
        {sectionsOpen.prospects && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 w-10"></th>
                <ColumnHeader title="Client" />
                <ColumnHeader title="Type" />
                <ColumnHeader title="Order" />
                <ColumnHeader title="Assignee" />
                <ColumnHeader title="Notes" />
                <ColumnHeader title="Priority" />
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prospects.map((lead) => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        )}

        {/* Offers Section */}
        <SectionHeader 
          title="Offers" 
          count={offers.length} 
          isOpen={sectionsOpen.offers} 
          onToggle={() => toggleSection('offers')} 
        />
        
        {sectionsOpen.offers && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 w-10"></th>
                <ColumnHeader title="Client" />
                <ColumnHeader title="Type" />
                <ColumnHeader title="Order" />
                <ColumnHeader title="Assignee" />
                <ColumnHeader title="Notes" />
                <ColumnHeader title="Priority" />
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offers.map((lead) => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        )}

        {/* Deals Section */}
        <SectionHeader 
          title="Deals" 
          count={deals.length} 
          isOpen={sectionsOpen.deals} 
          onToggle={() => toggleSection('deals')} 
        />
        
        {sectionsOpen.deals && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 w-10"></th>
                <ColumnHeader title="Client" />
                <ColumnHeader title="Type" />
                <ColumnHeader title="Order" />
                <ColumnHeader title="Assignee" />
                <ColumnHeader title="Notes" />
                <ColumnHeader title="Priority" />
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((lead) => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeadTable;
