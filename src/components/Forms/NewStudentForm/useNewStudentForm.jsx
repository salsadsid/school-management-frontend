import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { initialStudentFormValues } from "./utils";
import { newStudentSchema } from "./validator";

const useNewStudentForm = (isEditMode) => {
  const renderNewStudentFormHookProps = useForm({
    defaultValues: {
      ...initialStudentFormValues,
      password: isEditMode ? "" : initialStudentFormValues.password,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(newStudentSchema(isEditMode)),
  });

  return {
    renderNewStudentFormHookProps,
  };
};

export default useNewStudentForm;
