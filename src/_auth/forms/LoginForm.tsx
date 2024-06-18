import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLoginAccount } from '@/lib/react-query/queriesAndMutation';
import { LoginValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import type { z } from 'zod';

export const LoginForm = () => {
  const { toast } = useToast();
  const { mutateAsync: loginAccount, isPending: loading } = useLoginAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      username: 'admin2',
      password: 'admin2'
    }
  });

  async function onSubmit(values: z.infer<typeof LoginValidation>) {
    try {
      const session = await loginAccount({ username: values.username, password: values.password });

      if (!session) return;

      if (session) {
        form.reset();
        navigate('/');
      }
    } catch (error: any) {
      toast({ title: error });
    }
  }

  return (
    <div className='h-full'>
      <Form {...form}>
        <div className='flex flex-row w-full h-full px-4 py-2'>
          <div className='w-1/2 flex items-center justify-center'>
            <AnimatePresence mode='wait'>
              <p key={pathname} className='font-bigshoulder w-full text-center text-9xl font-bold uppercase'>
                Login
              </p>
            </AnimatePresence>
          </div>
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
                {loading ? 'Loading' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </Form>
    </div>
  );
};
