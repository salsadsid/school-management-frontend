import { Alert, Button } from "@material-tailwind/react";
import React from "react";
import { CiWarning } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";

export const NewClass = () => {
  const [openAlert, setOpenAlert] = React.useState(true);
  return (
    <div className="mx-auto max-w-screen-xl min-h-[80vh] px-4 md:px-12 md:py-12">
      {!openAlert && (
        <Button
          className="absolute flex items-center"
          size="lg"
          color="amber"
          onClick={() => setOpenAlert(true)}
        >
          <CiWarning className="h-4 w-4" />A warning message
        </Button>
      )}
      <Alert open={openAlert} color="amber" onClose={() => setOpenAlert(true)}>
        <div className="flex items-center gap-4">
          <RiAdminFill />
          <p className="text-sm ">You are not authorized to view this page.</p>
        </div>
      </Alert>
      {/* <Card className="overflow-hidden p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
        <NewClassForm />
      </Card> */}
    </div>
  );
};

export default NewClass;
