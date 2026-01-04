'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterTenant } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Building2, Mail, Lock, User, Tag, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  tenantName: z.string().min(2, 'Company name must be at least 2 characters'),
  slug: z.string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9_]+$/, 'Slug must contain only lowercase letters, numbers, and underscores'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { mutate: registerTenant, isPending } = useRegisterTenant();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...payload } = data;
    registerTenant(payload);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-brand-navy to-gray-900 p-12 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-cyan/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <Building2 className="w-6 h-6 text-brand-cyan" />
          </div>
          <span className="text-xl font-bold tracking-tight">HR Portal</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Start managing your team <span className="text-brand-cyan">today</span>.
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Create your company workspace and get instant access to powerful HR management tools.
          </p>
          
          <div className="space-y-4">
            {[
              'Complete employee management system',
              'Attendance tracking & reporting',
              'Leave & overtime management',
              'Payroll & payslip generation',
            ].map((feature, i) => (
              <div key={i} className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer/Testimonial */}
        <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <Quote className="w-8 h-8 text-brand-cyan/50 mb-4" />
          <p className="text-gray-300 italic mb-4">
            &quot;Setting up our HR system was incredibly easy. We were up and running in minutes!&quot;
          </p>
          <div className="flex items-center">
             <div className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3">
               SM
             </div>
             <div>
               <p className="text-sm font-bold text-white">Sarah Miller</p>
               <p className="text-xs text-gray-400">CEO, TechStart</p>
             </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Your Workspace</h2>
            <p className="mt-2 text-sm text-gray-600">
              Register your company and start managing your team
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Company Information</h3>
              
              <Input
                label="Company Name"
                type="text"
                placeholder="Acme Corporation"
                error={errors.tenantName?.message}
                {...register('tenantName')}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                icon={<Building2 className="w-4 h-4 text-gray-400" />}
              />
              
              <Input
                label="Company Slug"
                type="text"
                placeholder="acme_corp"
                error={errors.slug?.message}
                {...register('slug')}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                icon={<Tag className="w-4 h-4 text-gray-400" />}
                helperText="Used in your workspace URL (lowercase, numbers, underscores only)"
              />
            </div>

            {/* Admin Account */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Admin Account</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="John"
                  error={errors.firstName?.message}
                  {...register('firstName')}
                  className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  icon={<User className="w-4 h-4 text-gray-400" />}
                />
                
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  error={errors.lastName?.message}
                  {...register('lastName')}
                  className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  icon={<User className="w-4 h-4 text-gray-400" />}
                />
              </div>
              
              <Input
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="admin@acme.com"
                error={errors.email?.message}
                {...register('email')}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                icon={<Mail className="w-4 h-4 text-gray-400" />}
              />
              
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                icon={<Lock className="w-4 h-4 text-gray-400" />}
              />
              
              <Input
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                icon={<Lock className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all mt-6"
              isLoading={isPending}
            >
              Create Workspace <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <div className="mt-6 text-center text-sm">
               <span className="text-gray-500">Already have an account? </span>
               <Link href="/find-workspace" className="font-semibold text-brand-navy hover:text-brand-cyan transition-colors">
                 Sign in to your workspace
               </Link>
            </div>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} HR Portal by NodeStudio. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
