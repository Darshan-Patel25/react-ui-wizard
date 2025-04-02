
import { Lead } from '../types/lead';

// Mock data - in a real app, this would come from a backend API
const mockLeads: Lead[] = [
  {
    id: 1,
    client: "Wade Warren",
    email: "wade@gmail.com",
    type: "hot",
    order: "Nissan Maxima 3.5",
    assignees: ["SA"],
    notes: "Client would like to test drive the car over the weekend",
    priority: "Medium",
    category: "prospects"
  },
  {
    id: 2,
    client: "Devon Lane",
    email: "devon@gmail.com",
    type: "warm",
    order: "Mazda 3 2.5",
    assignees: ["SK", "KO"],
    notes: "Made the first call to the client, sent a commercial proposal via email",
    priority: "High",
    category: "prospects"
  },
  {
    id: 3,
    client: "Brooklyn Simmons",
    email: "simmons@gmail.com",
    type: "warm",
    order: "Volvo S90 2.0T",
    assignees: ["BM"],
    notes: "Contact the client to confirm the meeting time at 11:00 AM",
    priority: "Low",
    category: "offers"
  },
  {
    id: 4,
    client: "Guy Hawkins",
    email: "hawkins@gmail.com",
    type: "cold",
    order: "BMW 330i 3.0",
    assignees: ["BM"],
    notes: "Made the first call to the client, sent a commercial proposal via email",
    priority: "Medium",
    category: "offers"
  },
  {
    id: 5,
    client: "Annette Black",
    email: "annette@gmail.com",
    type: "deal",
    order: "Ford Focus ST 2.3",
    assignees: ["VF", "KS"],
    notes: "The client prioritizes an integrated navigation system and a premium audio system",
    priority: "High",
    category: "deals"
  }
];

// Simulate network delay for more realistic API behavior
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Get all leads
  getLeads: async (): Promise<Lead[]> => {
    await delay(600); // Simulate network delay
    return [...mockLeads];
  },
  
  // Get leads by category
  getLeadsByCategory: async (category: string): Promise<Lead[]> => {
    await delay(500);
    return mockLeads.filter(lead => lead.category === category);
  },
  
  // Add a new lead
  addLead: async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
    await delay(700);
    const newLead = {
      ...lead,
      id: Math.max(...mockLeads.map(l => l.id)) + 1
    };
    mockLeads.push(newLead);
    return newLead;
  },
  
  // Update a lead
  updateLead: async (id: number, updates: Partial<Lead>): Promise<Lead> => {
    await delay(600);
    const index = mockLeads.findIndex(lead => lead.id === id);
    if (index === -1) {
      throw new Error(`Lead with id ${id} not found`);
    }
    
    const updatedLead = {
      ...mockLeads[index],
      ...updates
    };
    mockLeads[index] = updatedLead;
    return updatedLead;
  },
  
  // Delete a lead
  deleteLead: async (id: number): Promise<void> => {
    await delay(500);
    const index = mockLeads.findIndex(lead => lead.id === id);
    if (index === -1) {
      throw new Error(`Lead with id ${id} not found`);
    }
    mockLeads.splice(index, 1);
  }
};
