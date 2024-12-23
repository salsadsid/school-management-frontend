import { Button } from "@material-tailwind/react";
import React from "react";
import { useUpdateAnAdmissionInfoMutation } from "../../../../redux/api/admissionApi";
import ApplicationModal from "./modal/ApplicationModal";

export default function ViewApplication({ row }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const [updateAnAdmissionInfo] = useUpdateAnAdmissionInfoMutation();

  const onUpdate = (application) => {
    updateAnAdmissionInfo({ id: application.applicationId, application });
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
        }}
        size="sm"
        variant="outlined"
      >
        View
      </Button>
      <ApplicationModal
        application={row}
        isOpen={open}
        onClose={handleClose}
        onUpdate={onUpdate}
      />
    </div>
  );
}
