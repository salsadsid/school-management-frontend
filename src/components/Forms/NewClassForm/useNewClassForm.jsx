import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { initialNewClassFormValues } from "./utils";
import { newClassSchema } from "./validator";

const useNewClassForm = () => {
  const renderNewClassFormHookProps = useForm({
    defaultValues: initialNewClassFormValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(newClassSchema),
  });

  return {
    renderNewClassFormHookProps,
  };
};

export default useNewClassForm;
