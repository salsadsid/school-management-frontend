import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { initialStudentFormValues } from "./utils";
import { newStudentSchema } from "./validator";

const useNewStudentForm = () => {
  const renderNewStudentFormHookProps = useForm({
    defaultValues: initialStudentFormValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(newStudentSchema),
  });

  return {
    renderNewStudentFormHookProps,
  };
};

export default useNewStudentForm;
