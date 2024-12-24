import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { CgClose } from "react-icons/cg";

const ApplicationModal = ({
  application,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedApplication, setEditedApplication] = useState({
    ...application,
  });
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedApplication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editedApplication);
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} handler={onClose} size="xl">
      <DialogHeader className="flex justify-between ">
        <Typography variant="h5" color="blue-gray">
          Application Details
        </Typography>
        <Button color="orange" variant="text" onClick={onClose}>
          <CgClose className="h-5 w-5" />
        </Button>
      </DialogHeader>
      <DialogBody divider className="overflow-y-auto max-h-[70vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {application &&
            Object.entries(application).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </p>
                <p>{value || "N/A"}</p>
              </div>
            ))}
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-end">
        <Button
          color="blue"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="mr-2"
          disabled
        >
          Edit
        </Button>
        <Button
          size="sm"
          color="red"
          onClick={() => onDelete(application._id)}
          className="mr-2"
          disabled
        >
          Delete
        </Button>
        <Button
          size="sm"
          color="amber"
          loading={isLoading && application.status === "rejected"}
          onClick={() => onUpdate({ ...application, status: "approved" })}
          className="mr-2"
          disabled={application.status === "approved" || isLoading}
        >
          Approve
        </Button>
        <Button
          size="sm"
          color="amber"
          loading={isLoading && application.status === "approved"}
          onClick={() => onUpdate({ ...application, status: "rejected" })}
          className="mr-2"
          disabled={application.status === "rejected" || isLoading}
        >
          Reject
        </Button>
        <Button size="sm" color="gray" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationModal;
