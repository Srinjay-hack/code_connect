import { Button } from '@/components/ui/button'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader'
import { Link } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount,useSignInAccount } from '@/lib/react-query/queriesAndMutation'

const SignupForm = () => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            name:"",
            username: "",
            email:"",
            password:""
        },
    })


    const {mutateAsync:createUserAccount,isLoading:isCreatingAccount} = useCreateUserAccount();
    const {mutateAsync:useSignInAccount,} = useSignInAccount();
    // use of database here appwrite to store values
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
        const newUser = await createUserAccount(values);
        if(!newUser){
            return toast({
                title:"Sign UP failed, Please try again"
            });
        }
        const session = await useSignInAccount({
            email:values.email,
            password:values.password,
        });
        if(!session){
            return toast({
                title:"Sign in failed, Please try again"
            });
        }

    }

    return (
        <Form {...form}>
            <div className='sm:w-420 flex-center flex-col'>
                <img src="/assets/images/logo.svg"/>
                <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'> Create a new Account</h2>
                <p className='text-light-3 small-medium md:base-regular'>To use CodeGram please enter the details</p>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" className='input' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>UserName</FormLabel>
                            <FormControl>
                                <Input type="text" className='input' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" className='input' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" className='input' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='shad-button_primary'>{
                    isLoading?(
                        <div className='flex-center gap-2'>
                            <Loader/>Loading.....
                        </div>
                    ):"Sign up"
                }</Button>
                <p className='text-small-regular text-light-2 text-center'>
                    Already have an Account?
                    <Link to="/sign-in" className='text-primary-500 text-small-semibold m1-1'>Log In</Link>
                </p>
            </form>
            </div>
        </Form>
        
    )
}

export default SignupForm