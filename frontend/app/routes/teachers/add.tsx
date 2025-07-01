import TeachersForm from '~/components/teachers/TeachersForm';

function Add() {
  return (
    <div className="flex flex-col grow p-12 gap-6">
      <div className="flex flex-row items-center justify-between">
        {/** Title */}
        <h2 className="text-secondary leading-9"> 
          Add Teacher
        </h2>
      </div>
      <TeachersForm/>
    </div>
  )
}

export default Add
