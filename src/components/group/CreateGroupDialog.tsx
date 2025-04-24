
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

interface CreateGroupForm {
  name: string;
  description: string;
}

export const CreateGroupDialog = () => {
  const { toast } = useToast();
  const form = useForm<CreateGroupForm>();

  const onSubmit = async (data: CreateGroupForm) => {
    try {
      const { error } = await supabase.from('groups').insert([{
        name: data.name,
        description: data.description
      }]);

      if (error) throw error;

      toast({
        title: "Group created!",
        description: "Your group has been created successfully.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not create group. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Users className="h-4 w-4 mr-2" />
          Create New Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter group name..." {...field} className="bg-gray-800" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your group..." {...field} className="bg-gray-800" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Group</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
