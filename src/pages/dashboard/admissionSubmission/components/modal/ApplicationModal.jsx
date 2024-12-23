import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const ApplicationModal = ({
  application,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedApplication, setEditedApplication] = useState({
    ...application,
  });
  console.log(application);
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedApplication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(editedApplication);
    setIsEditing(false);
  };

  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      size="xl"
      className="overflow-y-auto max-h-screen"
    >
      <DialogHeader>
        <Typography variant="h5" color="blue-gray">
          Application Details
        </Typography>
      </DialogHeader>
      <DialogBody divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!isEditing ? (
            Object.entries(application).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </p>
                <p>{value || "N/A"}</p>
              </div>
            ))
          ) : (
            <>
              <Input
                label="Student Name"
                name="studentName"
                value={editedApplication.studentName}
                onChange={handleEditChange}
              />
              <Input
                label="Father's Name"
                name="fatherName"
                value={editedApplication.fatherName}
                onChange={handleEditChange}
              />
              <Input
                label="Mother's Name"
                name="motherName"
                value={editedApplication.motherName}
                onChange={handleEditChange}
              />
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                value={
                  new Date(editedApplication.dateOfBirth)
                    .toISOString()
                    .split("T")[0]
                }
                onChange={handleEditChange}
                type="date"
              />
              <Input
                label="Address"
                name="presentAddress"
                value={editedApplication.presentAddress}
                onChange={handleEditChange}
              />
            </>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        {isEditing ? (
          <>
            <Button color="green" onClick={handleSave} className="mr-2">
              Save Changes
            </Button>
            <Button color="gray" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              color="blue"
              onClick={() => setIsEditing(true)}
              className="mr-2"
              disabled
            >
              Edit Application
            </Button>
            <Button
              color="red"
              onClick={() => onDelete(application._id)}
              className="mr-2"
              disabled
            >
              Delete Application
            </Button>
            <Button
              color="amber"
              onClick={() => onUpdate({ ...application, status: "approved" })}
              className="mr-2"
            >
              Approve Application
            </Button>
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
          </>
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default ApplicationModal;
