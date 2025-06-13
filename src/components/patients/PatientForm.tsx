"use client";

import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Patient } from '@/types';
import { GENDERS } from '@/types';
import { useToast } from '@/hooks/use-toast';

const patientFormSchema = z.object({
  mrn: z.string().min(1, "MRN is required."),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  dob: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(GENDERS, { required_error: "Gender is required." }),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").optional().or(z.literal('')),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  address: z.string().min(1, "Address is required."),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  patient?: Patient | null; // For editing
  onSave: (data: Patient) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSave, onCancel }) => {
  const { toast } = useToast();
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: patient ? {
      ...patient,
      dob: patient.dob ? new Date(patient.dob) : new Date(),
    } : {
      mrn: `MRN${Math.floor(1000 + Math.random() * 9000)}`, // Dummy MRN
      firstName: "",
      lastName: "",
      dob: new Date(),
      gender: undefined,
      phone: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    if (patient) {
      form.reset({
        ...patient,
        dob: patient.dob ? new Date(patient.dob) : new Date(),
      });
    }
  }, [patient, form]);

  const handleSubmit = (data: PatientFormValues) => {
    const newPatientData: Patient = {
      id: patient?.id || crypto.randomUUID(), // Generate new ID or use existing
      ...data,
    };
    onSave(newPatientData);
    toast({
      title: patient ? "Patient Updated" : "Patient Added",
      description: `${data.firstName} ${data.lastName} has been successfully ${patient ? 'updated' : 'added'}.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="mrn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical Record Number (MRN)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., MRN12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDERS.map(gender => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="e.g., (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="123 Main St, Anytown, USA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {patient ? 'Save Changes' : 'Add Patient'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientForm;

