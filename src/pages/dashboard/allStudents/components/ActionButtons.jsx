import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { useDeleteStudentMutation } from "../../../../redux/api/studentApi";
import { createPromiseToast } from "../../../../utils/promiseToast";
// ActionButtons.jsx
export const ActionButtons = ({ student }) => {
  const navigate = useNavigate();
  const onEdit = (student) => {
    navigate(`/dashboard/student-new?studentId=${student._id}`);
  };

  const [deleteStudent] = useDeleteStudentMutation();

  const onDelete = async (student) => {
    const toast = createPromiseToast();
    const { successToast, errorToast, loadingToast } = toast();
    loadingToast({ message: "Deleting student..." });
    try {
      const res = await deleteStudent({ id: student.studentId }).unwrap();
      successToast({ message: res.message });
    } catch (error) {
      errorToast({ message: error.data.message });
    }
  };
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(student)}
        className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDelete(student)}
        className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
