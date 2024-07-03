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
    <div className='h-full w-full flex justify-center items-center'>
      <Form {...form}>
        <motion.div className='w-1/2 h-full flex flex-col items-center justify-center border hover:bg-red-900  rounded-lg transition-all duration-500 '>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full h-fit flex flex-col items-center justify-center gap-5 px-2 py-3'
          >
            <div className='w-1/2 flex flex-col justify-start gap-5 text-center '>
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
              {/* <div className='flex-grow' /> */}
            </div>
            <Button type='submit' className='w-1/2 h-10 mx-auto'>
              {loading ? 'Loading' : 'Login'}
            </Button>
          </form>
        </motion.div>
      </Form>
    </div>
  );
};
