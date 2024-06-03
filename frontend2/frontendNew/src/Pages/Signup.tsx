import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import Heading from '@/components/Heading'
import { BACKEND_URL } from '@/config/config'
import { Link } from "react-router-dom"
import Navbar from '@/components/Navbar'

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters long"
  }),
  confirmPassword: z.string(),
  firstName: z.string(),
  lastName: z.string(),
}).refine((data) => {
  return data.password === data.confirmPassword
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export default function Signup() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    console.log(values)

    const userData = {
      username: values.username,
      name: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await res.json()

    console.log(data)

  }

  return (
    <>
    <Navbar />
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className='flex items-center justify-center flex-col'>
        <Heading text={"Sign Up"} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full flex flex-col">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm Password" type="password" {...field} />
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
                    <Input placeholder="Email" type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-rows-1 grid-flow-col gap-4'>
              <div>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" type='text' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className="hidden bg-muted lg:block min-h-screen">
        <img src="https://images.pexels.com/photos/80453/poppy-field-of-poppies-flower-flowers-80453.jpeg?cs=srgb&dl=pexels-pixabay-80453.jpg&fm=jpg" alt="Signup" className="object-cover h-full w-full" />
      </div>
    </div>
    </>
  )
}
