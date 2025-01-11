import { Button } from "@material-tailwind/react";
import React from "react";
import { useDeleteTeacherMutation } from "../../../../redux/api/teacherApi";
import { createPromiseToast } from "../../../../utils/promiseToast";

const TeacherModal = ({ row }) => {
  const [deleteTeacher] = useDeleteTeacherMutation();

  const handleDelete = async (id) => {
    const toast = createPromiseToast();
    const { successToast, errorToast, loadingToast } = toast();
    try {
      loadingToast({ message: "Deleting teacher..." });
      await deleteTeacher(id).unwrap();
      successToast({ message: "Teacher deleted successfully" });
    } catch (err) {
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleDelete(row._id);
        }}
        size="sm"
        variant="outlined"
        color="red"
      >
        Delete
      </Button>
    </div>
  );
};

export default TeacherModal;
