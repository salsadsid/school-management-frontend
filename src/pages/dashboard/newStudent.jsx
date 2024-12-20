import { Alert } from "@material-tailwind/react";
import React from "react";
import { RiAdminFill } from "react-icons/ri";

export const NewStudent = () => {
  const [openAlert, setOpenAlert] = React.useState(true);
  return (
    <div>
      <div className="mx-auto min-h-[82vh] max-w-screen-xl px-4 md:px-12 md:py-12">
        <Alert
          open={openAlert}
          color="amber"
          onClose={() => setOpenAlert(true)}
        >
          <div className="flex items-center gap-4">
            <RiAdminFill />
            <p className="text-sm ">
              You are not authorized to view this page.
            </p>
          </div>
        </Alert>
        {/* <Card className="overflow-hidden p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <NewStudentForm />
        </Card> */}
      </div>
    </div>
  );
};

export default NewStudent;
