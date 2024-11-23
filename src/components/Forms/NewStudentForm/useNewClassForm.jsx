import { useForm } from "react-hook-form";
import { initialStudentFormValues } from "./utils";

const useNewStudentForm = () => {
  const renderNewStudentFormHookProps = useForm({
    defaultValues: initialStudentFormValues,
  });

  return {
    renderNewStudentFormHookProps,
  };
};

export default useNewStudentForm;
