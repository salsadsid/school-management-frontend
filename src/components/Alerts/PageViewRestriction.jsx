import { Alert } from "@material-tailwind/react";
import React from "react";
import { RiAdminFill } from "react-icons/ri";

export default function PageViewRestriction() {
  const [openAlert, setOpenAlert] = React.useState(true);
  return (
    <div className="min-h-[82vh]">
      <Alert open={openAlert} color="amber" onClose={() => setOpenAlert(true)}>
        <div className="flex items-center gap-4">
          <RiAdminFill />
          <p className="text-sm ">You are not authorized to view this page.</p>
        </div>
      </Alert>
    </div>
  );
}
