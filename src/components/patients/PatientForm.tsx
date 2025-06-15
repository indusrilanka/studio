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
import { Progress } from "@/components/ui/progress";

const patientFormSchema = z.object({
  mrn: z.string().min(1, "MRN is required."),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  dob: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(GENDERS as [string, ...string[]], { required_error: "Gender is required." }),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").optional().or(z.literal('')),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  address: z.string().min(1, "Address is required."),
  insuranceProvider: z.string().optional().or(z.literal('')),
  insuranceNumber: z.string().optional().or(z.literal('')),
  status: z.enum(['Active', 'Inactive', 'Deceased']).optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
  emergencyContactName: z.string().optional().or(z.literal('')),
  emergencyContactRelation: z.string().optional().or(z.literal('')),
  emergencyContactPhone: z.string().optional().or(z.literal('')),
  allergies: z.string().optional().or(z.literal('')),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  patient?: Patient | null; // For editing
  onSave: (data: Patient) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSave, onCancel }) => {
  const { toast } = useToast();
  const [step, setStep] = React.useState(0);
  const steps = ["Patient Info", "Contact & Insurance", "Emergency & Medical"];
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: patient ? {
      mrn: patient.mrn,
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: patient.dob ? new Date(patient.dob) : new Date(),
      gender: patient.gender,
      phone: patient.phone || '',
      email: patient.email || '',
      address: patient.address,
      insuranceProvider: patient.insuranceProvider || '',
      insuranceNumber: patient.insuranceNumber || '',
      status: patient.status || '',
      notes: patient.notes || '',
      emergencyContactName: patient.emergencyContact?.name || '',
      emergencyContactRelation: patient.emergencyContact?.relation || '',
      emergencyContactPhone: patient.emergencyContact?.phone || '',
      allergies: patient.allergies ? patient.allergies.join(', ') : '',
    } : {
      mrn: `MRN${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: "",
      lastName: "",
      dob: new Date(),
      gender: undefined,
      phone: "",
      email: "",
      address: "",
      insuranceProvider: "",
      insuranceNumber: "",
      status: "Active",
      notes: "",
      emergencyContactName: "",
      emergencyContactRelation: "",
      emergencyContactPhone: "",
      allergies: "",
    },
  });

  useEffect(() => {
    if (patient) {
      form.reset({
        mrn: patient.mrn,
        firstName: patient.firstName,
        lastName: patient.lastName,
        dob: patient.dob ? new Date(patient.dob) : new Date(),
        gender: patient.gender,
        phone: patient.phone || '',
        email: patient.email || '',
        address: patient.address,
        insuranceProvider: patient.insuranceProvider || '',
        insuranceNumber: patient.insuranceNumber || '',
        status: patient.status || '',
        notes: patient.notes || '',
        emergencyContactName: patient.emergencyContact?.name || '',
        emergencyContactRelation: patient.emergencyContact?.relation || '',
        emergencyContactPhone: patient.emergencyContact?.phone || '',
        allergies: patient.allergies ? patient.allergies.join(', ') : '',
      });
    }
  }, [patient, form]);

  const handleSubmit = (data: PatientFormValues) => {
    const newPatientData: Patient = {
      id: patient?.id || crypto.randomUUID(),
      mrn: data.mrn,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      gender: data.gender as Patient['gender'],
      phone: data.phone ?? '',
      email: data.email?? '',
      address: data.address,
      insuranceProvider: data.insuranceProvider,
      insuranceNumber: data.insuranceNumber,
      status: data.status as Patient['status'],
      notes: data.notes,
      emergencyContact: (data.emergencyContactName || data.emergencyContactRelation || data.emergencyContactPhone)
        ? {
            name: data.emergencyContactName || '',
            relation: data.emergencyContactRelation || '',
            phone: data.emergencyContactPhone || '',
          }
        : undefined,
      allergies: data.allergies ? data.allergies.split(',').map(a => a.trim()).filter(Boolean) : [],
    };
    onSave(newPatientData);
    toast({
      title: patient ? "Patient Updated" : "Patient Added",
      description: `${data.firstName} ${data.lastName} has been successfully ${patient ? 'updated' : 'added'}.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 p-1">
        <div className="mb-4">
          <Progress value={((step + 1) / steps.length) * 100} />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            {steps.map((label, idx) => (
              <span key={label} className={idx === step ? "font-bold text-primary" : ""}>{label}</span>
            ))}
          </div>
        </div>
        {step === 0 && (
          <div className="bg-muted/40 rounded-lg p-3 shadow-sm border">
            <h3 className="font-bold text-base text-primary mb-2 border-b pb-1">Patient Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="mrn"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
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
                name="dob"
                render={({ field }) => (
                  <FormItem>
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
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="bg-muted/40 rounded-lg p-3 shadow-sm border">
            <h3 className="font-bold text-base text-primary mb-2 border-b pb-1">Contact & Insurance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
              <FormField
                control={form.control}
                name="insuranceProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., HealthFirst" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="insuranceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., HF123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Deceased">Deceased</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="bg-muted/40 rounded-lg p-3 shadow-sm border">
            <h3 className="font-bold text-base text-primary mb-2 border-b pb-1">Emergency & Medical</h3>
            <div className="grid grid-cols-1 gap-2">
              {/* 1st row: Emergency Contact Name (full width) */}
              <FormField control={form.control} name="emergencyContactName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {/* 2nd row: Relation and Emergency Contact Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField control={form.control} name="emergencyContactRelation" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relation</FormLabel>
                    <FormControl><Input placeholder="e.g., Husband" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="emergencyContactPhone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Phone</FormLabel>
                    <FormControl><Input placeholder="e.g., (555) 987-6543" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              {/* 3rd row: Allergies (full width, styled like Notes) */}
              <FormField control={form.control} name="allergies" render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl><Textarea placeholder="e.g., Penicillin, Peanuts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {/* 4th row: Notes (full width) */}
              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl><Textarea placeholder="Additional notes..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>
        )}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <div className="flex gap-2">
            {step > 0 && (
              <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            {step < steps.length - 1 ? (
              <Button type="button" onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">{patient ? 'Save Changes' : 'Add Patient'}</Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PatientForm;

