import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignupValidation } from '@/lib/validation';
import { Loader } from '@/components/shared/Loader';
import { Link } from 'react-router-dom';
import { createUserAccount } from '@/lib/appwrite/api';

const SignupForm = () => {
  const isLoading = false;
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    console.log(newUser);
  }
  return (
    <Form {...form}>
      <div className='w-1/2 flex justify-center items-center flex-col'>
        <span className='bg-primary p-2 rounded-lg text-white font-black'>
          DisMoment
        </span>
        <h2 className='font-bold pt-3'>Create a new account</h2>
        <p className='font-thin'>
          Enter your details and start capturing this moment.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type='submit'>{isLoading ? <Loader /> : 'Sign Up'}</Button>
          <p className='text-sm text-center font-thin'>
            Already registered?
            <Link to='/sign-in' className='font-bold'>
              {' '}
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
