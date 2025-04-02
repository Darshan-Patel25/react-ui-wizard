
export type LeadStatus = 'hot' | 'warm' | 'cold' | 'deal';
export type PriorityLevel = 'High' | 'Medium' | 'Low';

export interface Lead {
  id: number;
  client: string;
  email: string;
  type: LeadStatus;
  order: string;
  assignees: string[];
  notes: string;
  priority: PriorityLevel;
  category: 'prospects' | 'offers' | 'deals';
}
