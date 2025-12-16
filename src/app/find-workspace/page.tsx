'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Users, Building2, ArrowRight, Quote } from 'lucide-react';
import { useState } from 'react';

const workspaceSchema = z.object({
  slug: z.string().min(1, 'Workspace URL is required').regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers, and underscores are allowed'),
});

type WorkspaceFormValues = z.infer<typeof workspaceSchema>;

export default function FindWorkspacePage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<WorkspaceFormValues>({
    resolver: zodResolver(workspaceSchema),
  });

  const onSubmit = async (data: WorkspaceFormValues) => {
    setIsChecking(true);
    try {
      const response = await fetch(`/api/tenant/${data.slug}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        }
      });

      if (response.status === 200) {
        // Tenant found
        router.push(`/${data.slug}/auth/login`);
      } else if (response.status === 404) {
        setError('slug', {
          type: 'manual',
          message: 'Workspace not found. Please check your URL.',
        });
      } else {
         setError('slug', {
          type: 'manual',
          message: 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
       console.error(error);
       setError('slug', {
        type: 'manual',
        message: 'Network error. Please try again.',
      });
    } finally {
      setIsChecking(false);
    }
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
            <Users className="w-6 h-6 text-brand-cyan" />
          </div>
          <span className="text-xl font-bold tracking-tight">HR Portal</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Find your <span className="text-brand-cyan">workspace</span>.
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Enter your company&apos;s workspace URL to verify your identity and access your dashboard safely.
          </p>
          
          <div className="flex items-center space-x-4 pt-4">
             <div className="flex -space-x-2">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full bg-gray-600 border-2 border-brand-navy flex items-center justify-center text-xs font-medium">
                    {/* Placeholder avatars */}
                    <span className="text-white/50">U{i}</span>
                 </div>
               ))}
             </div>
             <div className="text-sm text-gray-400">
               <span className="font-bold text-white">Trust</span> by 2.5k+ companies
             </div>
          </div>
        </div>

        {/* Footer/Testimonial */}
        <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <Quote className="w-8 h-8 text-brand-cyan/50 mb-4" />
          <p className="text-gray-300 italic mb-4">
            &quot;The security and ease of access provided by HR Portal is unmatched.&quot;
          </p>
          <div className="flex items-center">
             <div className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3">
               AS
             </div>
             <div>
               <p className="text-sm font-bold text-white">Sarah Jenkins</p>
               <p className="text-xs text-gray-400">Operations Director</p>
             </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Find your workspace</h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ll help you get to the right place
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">
            <div className="space-y-5">
              <Input
                label="Workspace URL"
                type="text"
                placeholder="company_slug"
                error={errors.slug?.message}
                {...register('slug')}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                icon={<Building2 className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all"
              isLoading={isChecking}
            >
              Continue <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-500">Don&apos;t have a workspace? </span>
                <Link href="#" className="font-semibold text-brand-navy hover:text-brand-cyan transition-colors">
                  Contact Sales
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
