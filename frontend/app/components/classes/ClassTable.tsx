'use client';
import type { Class } from '@shared/types/types';
import { Link } from 'react-router';

export interface ClassTableProps {
  classes: Class[];
}

export const ClassTable = (props: ClassTableProps) => {
  return (
    <div className="flex flex-col grow bg-white rounded-lg shadow-lg">
      {props.classes.length > 0 ?
        <>
        </>
        :
        <div className="flex flex-col grow items-center justify-center gap-6">
          <h3 className="text-secondary">
            There are no existing classes yet.
          </h3>

          <Link to="add" className="bg-primary inline-flex items-center px-4 py-3 rounded-lg text-white gap-2">
            <img className="h-4 w-4" src="/plus.svg"/>
            <span className="font-semibold leading-6">
              Add Class
            </span>
          </Link>
        </div>
      }
    </div>
  );
}

export default ClassTable;