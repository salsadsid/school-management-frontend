import { Card } from "@material-tailwind/react";
import NewTeacherForm from "../../components/Forms/NewTeacherForm";

export const AddTeacher = () => {
  return (
    <div className="mx-auto max-w-screen-xl min-h-[80vh] px-4 md:px-12 md:py-12">
      <Card className="overflow-hidden p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
        <NewTeacherForm />
      </Card>
    </div>
  );
};

export default AddTeacher;
