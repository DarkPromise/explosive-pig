import { Link } from 'react-router';
import useTeachers from '~/components/teachers/hooks/useTeachers';
import TeachersTable from '~/components/teachers/TeachersTable';
import { Button } from '~/components/ui/button';

function Teachers() {
  // Could technically fetch the data from the server instead of using an API call from the client,
  const { isTeachersPending, teachers } = useTeachers();
  return (
    <div className="flex flex-col grow p-12 gap-6">
      <div className="flex flex-row items-center justify-between">
        {/** Title */}
        <h2 className="text-2xl font-extrabold text-secondary leading-9"> 
          Teachers
        </h2>
        {/** Add Button (filled state) */}
        {teachers && teachers.length > 0 && <Button asChild>
          <Link to="add" className="text-white">
            <img className="h-4 w-4" src="/plus.svg"/>
            Add Teacher
          </Link>
        </Button>}
      </div>
      <TeachersTable teachers={teachers} isTeachersPending={isTeachersPending}/>
    </div>
  )
}

export default Teachers
