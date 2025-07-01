import z from "zod";

export const classLevels = [
  "Primary 1",
  "Primary 2",
  "Primary 3",
  "Primary 4",
  "Primary 5",
  "Primary 6",
] as const;

export type classLevel = (typeof classLevels)[number];

export const classSubjects = [
  "English Language",
  "Mother Tongue Language",
  "Mathematics",
  "Science",
  "Art",
  "Music",
  "Physical Education",
  "Social Studies",
  "Character and Citizenship Education",
] as const;

export type classSubject = (typeof classSubjects)[number];

export interface Teacher {
  id: number;
  name: string;
  subject: classSubject;
  email: string;
  contactNumber: string;
}

export const TeacherSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  subject: z.string().refine(
    (val) => classSubjects.includes(val as any),
    { message: "Subject is required." }
  ),
  email: z.string().min(1,{
    message: "Email is required."
  }).email({
    message: "This email address is invalid."
  }),
  contactNumber: z.string().min(1,{
    message: "Work contact number is required."
  }).regex(
    /^\d{8}$/,{
      message: "This work contact number is invalid."
    })
})

export interface Class {
  id: number;
  name: string;
  level: classLevel;
  formTeacher: Omit<Teacher,"subject" | "email" | "contactNumber">; // Only includes "name"
}

export const ClassSchema = z.object({
  level: z.string().refine(
    (val) => classLevels.includes(val as any),
    { message: "Class Level is required." }
  ),
  name: z.string().min(1, {
    message: "Class Name is required.",
  }),
  teacherEmail: z.string().min(1,{
    message: "Form Teacher Email is required."
  }).email({
    message: "This email address is invalid."
  })
})