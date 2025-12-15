'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Users, Mail, Lock, ArrowRight, Quote } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const params = useParams();
  const tenantSlug = params?.tenant_slug as string;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
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
            Manage your workforce with <span className="text-brand-cyan">confidence</span>.
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Access your personalized dashboard to manage leaves, track attendance, and stay connected with your team.
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
               <span className="font-bold text-white">2.5k+</span> employees active daily
             </div>
          </div>
        </div>

        {/* Footer/Testimonial */}
        <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <Quote className="w-8 h-8 text-brand-cyan/50 mb-4" />
          <p className="text-gray-300 italic mb-4">
            &quot;This platform has transformed how we handle HR operations. It&apos;s intuitive, fast, and reliable.&quot;
          </p>
          <div className="flex items-center">
             <div className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy font-bold text-xs mr-3">
               JD
             </div>
             <div>
               <p className="text-sm font-bold text-white">John Doe</p>
               <p className="text-xs text-gray-400">HR Manager</p>
             </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center p-8 bg-gray-50 lg:bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl lg:rounded-none shadow-xl lg:shadow-none shadow-gray-100/50">
            <div className="space-y-5">
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                error={errors.email?.message}
                {...register('email')}
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                icon={<Mail className="w-4 h-4 text-gray-400" />}
              />
              
              <div className="space-y-1">
                 <div className="flex justify-between items-center">
                   <label className="block text-sm font-medium text-gray-700">Password</label>
                   <Link href="#" className="text-xs font-medium text-brand-navy hover:text-brand-cyan hover:underline">
                     Forgot password?
                   </Link>
                 </div>
                 <div className="relative">
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      error={errors.password?.message}
                      {...register('password')}
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      icon={<Lock className="w-4 h-4 text-gray-400" />}
                    />
                 </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold shadow-lg shadow-brand-navy/20 active:scale-[0.98] transition-all"
              isLoading={isPending}
            >
              Sign In <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
               <span className="text-gray-500">Don&apos;t have an account? </span>
               <Link href={tenantSlug ? `/${tenantSlug}/auth/register` : '/auth/register'} className="font-semibold text-brand-navy hover:text-brand-cyan transition-colors">
                 Create an account
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
