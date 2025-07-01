'use client';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from 'clsx';
import { Loader2Icon, LucideCircleAlert } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from "zod";
import { classLevels, ClassSchema } from '~/shared/types/types';
import useTeachers from "~/components/teachers/hooks/useTeachers";
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export interface ClassFormProps {}

export const ClassForm = (props: ClassFormProps) => {
  /** Navigation */
  const navigate = useNavigate();

  /** States */
  const [isFormPending, setIsFormPending] = useState(false);

  /** Fetch teachers */
  const { isTeachersPending, error, teachers, refetch } = useTeachers();

  /** Form */
  const form = useForm<z.infer<typeof ClassSchema>>({
    resolver: zodResolver(ClassSchema),
    defaultValues: {
      level: "", 
      name: "",
      teacherEmail: "",
    },
    mode: "onChange",
  })

  const handleOnSubmit = async (data: any) => {
    setIsFormPending(true);
    await fetch("/api/classes", {
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
              "This teacher is already assigned to a class."
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
    }).catch((error) => {
      console.error("[ClassForm] Error submitting form:", error);
      setIsFormPending(false);
    });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col grow gap-6" onSubmit={form.handleSubmit(handleOnSubmit)}>
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 gap-6">
          {/** Class Level (dropdown) */}
          <FormField
            control={form.control}
            name="level"
            render={({field, fieldState})=>(
              <FormItem>
                <FormLabel>Class Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[464px]">
                      <SelectValue placeholder="Select a level"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classLevels.map((level)=> (
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
          {/** Class Name (textfield) */}
          <FormField
            control={form.control}
            name="name"
            render={({field,fieldState})=>(
              <FormItem>
                <FormLabel>Class Name</FormLabel>
                <FormControl>
                  <Input className="w-[464px]" placeholder="Class Name" {...field}/>
                </FormControl>
                {fieldState.error && (
                  <p className={clsx("text-red-500 text-sm relative -top-1.5", fieldState.error.message ? "block" : "hidden")}>
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
          {/** Form Teacher Email (dropdown) */}
          <FormField
            control={form.control}
            name="teacherEmail"
            render={({field, fieldState})=>(
              <FormItem>
                <FormLabel>Form Teacher</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={isTeachersPending}>
                  <FormControl>
                    <SelectTrigger className="w-[464px]">
                      <SelectValue placeholder={isTeachersPending ? <Loader2Icon className="animate-spin"/> : "Assign a form teacher"}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!isTeachersPending && teachers.length > 0 ? teachers.map((teacher)=> (
                      <SelectItem key={teacher.email} value={teacher.email}>
                        {teacher.name}
                      </SelectItem>
                    ))
                      :
                      <div className="px-4 py-3 text-sm">
                        No existing teachers.
                        <br/>
                        <Link to="/teachers/add" className="text-[#75489F] cursor-pointer font-normal">
                          Add a teacher
                        </Link>
                      </div>
                    }
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
        </div>
        {/** Buttons */}
        <div className="flex flex-row items-center justify-end gap-4">
          {/* <Button variant={"outline"} asChild>
            <Link to="/classes">
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
              "Add Class"
            }
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ClassForm;