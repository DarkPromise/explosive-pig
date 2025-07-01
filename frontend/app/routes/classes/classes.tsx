import { Link } from 'react-router';
import ClassTable from '~/components/classes/ClassTable';
import useClasses from '~/components/classes/hooks/useClasses';
import { Button } from '~/components/ui/button';

function Classes() {
  // Could technically fetch the data from the server instead of using an API call from the client,
  const { isClassesPending, classes } = useClasses();
  return (
    <div className="flex flex-col grow p-12 gap-6">
      <div className="flex flex-row items-center justify-between">
        {/** Title */}
        <h2 className="text-2xl font-extrabold text-secondary leading-9"> 
          Classes
        </h2>
        {/** Add Button (filled state) */}
        {classes && classes.length > 0 && <Button asChild>
          <Link to="add" className="text-white">
            <img className="h-4 w-4" src="/plus.svg"/>
            Add Class
          </Link>
        </Button>}
      </div>
      <ClassTable classes={classes} isClassesPending={isClassesPending}/>
    </div>
  )
}

export default Classes
