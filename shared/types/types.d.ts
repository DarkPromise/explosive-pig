export interface Teacher {
  "name": string;
  "subject": string;
  "email": string;
  "contactNumber": string;
}

export interface Class {
  "name": string;
  "level": string;
  "formTeacher": Omit<Teacher,"subject" | "email" | "contactNumber">; // Only includes "name"
}

