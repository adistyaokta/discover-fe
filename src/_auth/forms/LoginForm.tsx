import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useLoginAccount } from '@/lib/react-query/queriesAndMutation';
import { LoginValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
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
      username: 'admin',
      password: 'admin1'
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
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className='h-full'
    >
      <Form {...form}>
        <div className='flex flex-row w-full h-full px-4 py-2'>
          <div className='w-1/2 flex items-center justify-center'>
            <AnimatePresence mode='wait'>
              <motion.p
                key={pathname}
                className='font-bigshoulder w-full text-center text-9xl font-bold uppercase'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                Login
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            key={pathname}
            className='w-1/2 h-full flex flex-col items-center'
          >
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
              <Button type='submit'>{loading ? 'Loading' : 'Login'}</Button>
            </form>
          </motion.div>
        </div>
      </Form>
    </motion.div>
  );
};
