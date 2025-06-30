import { Outlet, useLocation, useNavigate } from 'react-router';
import ClassTable from '~/components/classes/ClassTable';

function Classes() {
  const currentPath = useLocation().pathname;
  console.log("Current Path:", currentPath);

  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col grow p-12 gap-6">
      <div className="flex flex-row items-center justify-between">
        {/** Title */}
        <h2 className="text-2xl font-extrabold text-secondary leading-9"> 
          Classes
        </h2>
        {/** Add Button (filled state) */}
      </div>
      <ClassTable classes={[]}/>
      {/* <a href="classes/add" className="text-blue-500 hover:underline">
        Add Class
      </a> */}
    </div>
  )
}

export default Classes
