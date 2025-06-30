'use client';
import type { Class } from '@shared/types/types';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router';

export interface ClassFormProps {}

export const ClassForm = (props: ClassFormProps) => {
  return (
    <form className="flex flex-col grow gap-6">
      <div className="flex flex-col bg-white rounded-lg shadow-lg">
        {/** Class Level (dropdown) */}
        {/** Class Name (textfield) */}
        {/** Form Teacher (dropdown) */}
      </div>
      {/** Buttons */}
      <div className="flex flex-row items-center justify-end gap-4">
        <BackButton/>
        <AddClassButton/>
      </div>
    </form>
  );
}

export default ClassForm;

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Link to="/classes"
      className={
        clsx(
          "inline-flex items-center px-4 py-3 rounded-lg gap-2",
          "bg-white text-primary",
          "border border-primary",
          "cursor-pointer"
        )
      }
      onClick={()=> navigate(-1)}
    >
      <img className="h-4 w-4 fill-primary" src="/arrow-left.svg"/>
      <span className="font-semibold leading-6">
        Back
      </span>
    </Link>
  );
}

const AddClassButton = () => {
  return (
    <button 
      className="bg-primary inline-flex items-center px-4 py-3 rounded-lg text-white gap-2"
      type="submit"
    >
      <span className="font-semibold leading-6">
        Add Class
      </span>
    </button>
  );
}