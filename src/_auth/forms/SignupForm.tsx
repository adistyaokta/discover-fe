import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCreateAccount, useLoginAccount } from '@/lib/react-query/queriesAndMutation';
import { SignupValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { z } from 'zod';
import { motion } from 'framer-motion';

export const SignupForm = () => {
  const { toast } = useToast();
  const { mutateAsync: loginAccount, isPending: loading } = useLoginAccount();
  const { mutateAsync: createAccount } = useCreateAccount();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    try {
      const success = await createAccount({
        username: values.username,
        email: values.email,
        password: values.password
      });

      if (!success) {
        return toast({
          title: 'Sign up failed. Please try again'
        });
      }

      const session = await loginAccount({ username: values.username, password: values.password });

      if (!session) return;

      if (session) {
        form.reset();
        navigate('/');
      } else {
        toast({ title: 'Sign in failed. Please try again.' });
      }
    } catch (error: any) {
      toast({ title: error });
    }
  }
  const { pathname } = useLocation();

  return (
    <div className='h-full'>
      <Form {...form}>
        <div className='flex flex-row w-full h-full px-4 py-2'>
          <div className='w-1/2 h-full flex flex-col items-center'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full flex flex-col gap-5 px-2 py-3'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex-grow' />
              <Button type='submit' className='w-1/2 mx-auto'>
                {loading ? 'Loading' : 'Sign Up'}
              </Button>
            </form>
          </div>
          <div className='w-1/2 flex items-center justify-center'>
            <p className='font-bigshoulder w-full text-center text-9xl font-bold uppercase'>Register</p>
          </div>
        </div>
      </Form>
    </div>
  );
};
