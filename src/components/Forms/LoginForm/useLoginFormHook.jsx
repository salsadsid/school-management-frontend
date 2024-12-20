import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  initialStudentLoginFormValues,
  initialTeacherLoginFormValues,
} from "./utils";
import { loginSchemaStudent, loginSchemaTeacher } from "./validator";

const useLoginFormHook = ({ isTeacher = false }) => {
  const renderLoginFormHookProps = useForm({
    defaultValues: isTeacher
      ? initialTeacherLoginFormValues
      : initialStudentLoginFormValues,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(isTeacher ? loginSchemaTeacher : loginSchemaStudent),
  });

  return {
    renderLoginFormHookProps,
  };
};

export default useLoginFormHook;
