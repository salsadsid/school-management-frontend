import { useForm } from "react-hook-form";
import { initialNewClassFormValues } from "./utils";

const useNewClassForm = () => {
  const renderNewClassFormHookProps = useForm({
    defaultValues: initialNewClassFormValues,
  });

  return {
    renderNewClassFormHookProps,
  };
};

export default useNewClassForm;
