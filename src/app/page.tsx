
"use client"; // Required for useRouter and form handling

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from '@/components/core/Logo';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggleButton } from '@/components/core/ThemeToggleButton';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Simulate login
  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    if (data.email === "admin@labtrak.com" && data.password === "password") {
      toast({
        title: "Login Successful",
        description: "Welcome back to LabTrak!",
      });
      document.cookie = "isAuthenticated=true; path=/; max-age=" + (60 * 60 * 24 * 7); // Expires in 7 days
      window.location.href = '/dashboard';
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password.",
      });
      form.setError("email", { type: "manual", message: "" });
      form.setError("password", { type: "manual", message: "Invalid email or password." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center text-primary">Welcome Back!</CardTitle>
          <CardDescription className="text-center">
            Sign in to access your LabTrak account.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Demo: admin@labtrak.com / password
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <div className="mt-6">
        <ThemeToggleButton />
      </div>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} LabTrak. All rights reserved.
      </footer>
    </div>
  );
}
