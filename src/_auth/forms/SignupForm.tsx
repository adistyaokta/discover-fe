import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useCreateAccount, useLoginAccount } from '@/lib/react-query/queriesAndMutation';
import { SignupValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { RiLoader5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import type { z } from 'zod';

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

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Form {...form}>
        <div className='w-full lg:w-1/2 h-full flex flex-col items-center justify-center border border-x-0 transition-all duration-300'>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full h-fit flex flex-col items-center justify-center gap-5 px-2 py-3'
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='w-1/2 flex flex-col justify-start gap-5 text-center'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-outfit'>Username</FormLabel>
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
                    <FormLabel className='text-base font-outfit'>Email</FormLabel>
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
                    <FormLabel className='text-base font-outfit'>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-1/2 mx-auto'>
                {loading ? <RiLoader5Fill className='animate-spin' /> : 'Sign Up'}
              </Button>
            </motion.div>
          </form>
        </div>
      </Form>
    </div>
  );
};
