
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { Lead } from '../types/lead';
import { toast } from '@/components/ui/use-toast';

export function useLeads() {
  const queryClient = useQueryClient();
  
  // Get all leads
  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: api.getLeads,
  });
  
  // Get leads by category
  const getLeadsByCategory = (category: string) => {
    return leads.filter(lead => lead.category === category);
  };
  
  // Add a new lead
  const addLeadMutation = useMutation({
    mutationFn: (lead: Omit<Lead, 'id'>) => api.addLead(lead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead added",
        description: "The new lead was added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add lead: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });
  
  // Update a lead
  const updateLeadMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Lead> }) => 
      api.updateLead(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead updated",
        description: "The lead was updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update lead: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });
  
  // Delete a lead
  const deleteLeadMutation = useMutation({
    mutationFn: (id: number) => api.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast({
        title: "Lead deleted",
        description: "The lead was deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete lead: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    },
  });
  
  return {
    leads,
    isLoading,
    error,
    getLeadsByCategory,
    addLead: addLeadMutation.mutate,
    updateLead: updateLeadMutation.mutate,
    deleteLead: deleteLeadMutation.mutate,
    isAdding: addLeadMutation.isPending,
    isUpdating: updateLeadMutation.isPending,
    isDeleting: deleteLeadMutation.isPending,
  };
}
