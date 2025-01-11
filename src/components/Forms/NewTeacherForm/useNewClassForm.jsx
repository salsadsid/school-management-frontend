import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { initialNewTeacherFormValues } from "./utils";
import { newTeacherSchema } from "./validator";

const useNewTeacherForm = () => {
  const renderNewTeacherFormHookProps = useForm({
    defaultValues: initialNewTeacherFormValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(newTeacherSchema),
  });

  return {
    renderNewTeacherFormHookProps,
  };
};

export default useNewTeacherForm;
