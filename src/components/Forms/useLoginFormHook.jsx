import { useForm } from "react-hook-form";
import {
  initialStudentLoginFormValues,
  initialTeacherLoginFormValues,
} from "./utils";

const useLoginFormHook = ({ isTeacher = false }) => {
  const renderLoginFormHookProps = useForm({
    defaultValues: isTeacher
      ? initialTeacherLoginFormValues
      : initialStudentLoginFormValues,
  });

  return {
    renderLoginFormHookProps,
  };
};

export default useLoginFormHook;
