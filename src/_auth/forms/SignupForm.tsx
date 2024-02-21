import { Loader } from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  useCreateUserAccount,
  useSignInAccount,
} from '@/lib/react-query/queriesAndMutations';
import { SignupValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const SignupForm = () => {
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isLoading: isSigningIn } =
    useSignInAccount();

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

    if (!newUser) {
      return toast({
        title: 'Sign up failed. Please try again',
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: 'Sign in failed. Please try again.' });
    }
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
          <Button type='submit'>
            {isCreatingUser ? <Loader /> : 'Sign Up'}
          </Button>
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
