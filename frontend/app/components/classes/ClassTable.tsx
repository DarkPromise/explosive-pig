'use client';

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import clsx from 'clsx';
import { Link } from 'react-router';
import type { Class } from '~/shared/types/types';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const columns: ColumnDef<Class>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "level",
    header: "Class Level",
  },
  {
    accessorKey: "name",
    header: "Class Name",
  },
  {
    accessorKey: "formTeacher.name",
    header: "Form Teacher",
  }
];

export interface ClassTableProps {
  classes: Class[];
  isClassesPending: boolean;
}

export const ClassTable = (props: ClassTableProps) => {
  const { classes, isClassesPending } = props;

  /** Table */
  const table = useReactTable({
    data: classes,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className={
      clsx(
        "flex flex-col bg-white rounded-lg shadow-lg p-8",
        !(classes?.length > 0) && "grow",
      )
    }>
      {isClassesPending ?
        <div className="flex flex-col grow items-center justify-center gap-6 min-h-1/2">
          <h3 className="text-secondary">Loading classes...</h3>
        </div>
        :
        classes.length > 0 ?
          <Table>
            <TableHeader className="bg-background">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder ? null : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="border-b">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          :
          <div className="flex flex-col grow items-center justify-center gap-6 min-h-1/2">
            <h3 className="text-secondary">
              There are no existing classes yet.
            </h3>
            <Button asChild>
              <Link to="add" className="text-white">
                <img className="h-4 w-4" src="/plus.svg"/>
                Add Class
              </Link>
            </Button>
          </div>
      }
    </div>
  )
}

export default ClassTable;