'use client';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from 'clsx';
import { Loader2Icon, LucideCircleAlert } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from "zod";
import { classSubjects, TeacherSchema } from '~/shared/types/types';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export interface TeachersFormProps {}

export const TeachersForm = (props: TeachersFormProps) => {
  /** Navigation */
  const navigate = useNavigate();
  
  /** States */
  const [isFormPending, setIsFormPending] = useState(false);
  
  /** Form */
  const form = useForm<z.infer<typeof TeacherSchema>>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      contactNumber: "",
    },
    mode: "onChange",
  })

  const handleOnSubmit = async (data: any) => {
    setIsFormPending(true);
    await fetch(import.meta.env.VITE_BACKEND_URL+"/api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if(res.ok) {
        form.reset();
        navigate(-1);
      }
      else {
        console.error("[TeachersForm] Error submitting form:", res.status, res.statusText);
        toast.error(
          <div className="pl-1 text-sm font-medium">
            {res.status === 409 ?
              "A teacher with this email already exists."
              :
              "An error occurred while submitting the form. Please try again later."
            }
          </div>,
          {
            icon: <LucideCircleAlert className="text-red-500" />,
          }
        );
        // Maybe show an error message...
      }
      setIsFormPending(false);
    })
  }

  return (
    <Form {...form}>
      <form className="flex flex-col grow gap-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 gap-6">
          {/** Name (textfield) */}
          <FormField
            control={form.control}
            name="name"
            render={({field, fieldState})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input className="w-[464px]" placeholder="Name" {...field}/>
                </FormControl>
                {fieldState.error && (
                  <p className={clsx("text-red-500 text-sm relative -top-1.5", fieldState.error.message ? "block" : "hidden")}>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/** Subject (dropdown) */}
          <FormField
            control={form.control}
            name="subject"
            render={({field, fieldState})=>(
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[464px]">
                      <SelectValue placeholder="Select a subject"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classSubjects.map((level)=> (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className={clsx("text-red-500 text-sm relative -top-1.5", fieldState.error.message ? "block" : "hidden")}>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/** Email (textfield) */}
          <FormField
            control={form.control}
            name="email"
            render={({field, fieldState})=>(
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input className="w-[464px]" placeholder="Email address" {...field}/>
                </FormControl>
                {fieldState.error && (
                  <p className={clsx("text-red-500 text-sm relative -top-1.5", fieldState.error.message ? "block" : "hidden")}>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/** Contact Number (textfield) */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({field, fieldState})=>(
              <FormItem>
                <FormLabel>Work Contact Number</FormLabel>
                <FormControl>
                  <Input className="w-[464px]" placeholder="Work contact number" {...field}/>
                </FormControl>
                {fieldState.error && (
                  <p className={clsx("text-red-500 text-sm relative -top-1.5", fieldState.error.message ? "block" : "hidden")}>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>
        {/** Buttons */}
        <div className="flex flex-row items-center justify-end gap-4">
          {/* <Button variant={"outline"} asChild>
            <Link to="/teachers">
              <img className="h-4 w-4" src="/arrow-left.svg"/>
              Back
            </Link>
          </Button> */}
          <Button variant={"outline"} onClick={()=>navigate(-1)} type="button">
            <img className="h-4 w-4" src="/arrow-left.svg"/>
            Back
          </Button>
          <Button type="submit">
            {isFormPending ? 
              <>
                <Loader2Icon className="animate-spin"/>
                Submitting...
              </>
              : 
              "Add Teacher"
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TeachersForm;