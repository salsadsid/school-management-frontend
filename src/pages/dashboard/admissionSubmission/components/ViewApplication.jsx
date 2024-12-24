import { Button } from "@material-tailwind/react";
import React from "react";
import { useUpdateAnAdmissionInfoMutation } from "../../../../redux/api/admissionApi";
import { createPromiseToast } from "../../../../utils/promiseToast";
import ApplicationModal from "./modal/ApplicationModal";

export default function ViewApplication({ row }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const [updateAnAdmissionInfo, { isLoading }] =
    useUpdateAnAdmissionInfoMutation();

  const onUpdate = async (application) => {
    const toast = createPromiseToast();
    const { successToast, errorToast, loadingToast } = toast();
    try {
      loadingToast({ message: "Updating application..." });
      await updateAnAdmissionInfo({
        id: application.applicationId,
        application,
      }).unwrap();
      successToast({ message: "Application updated successfully" });
    } catch (err) {
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
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
        isLoading={isLoading}
      />
    </div>
  );
}
