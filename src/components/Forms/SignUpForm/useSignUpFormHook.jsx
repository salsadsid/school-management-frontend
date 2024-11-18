import { useForm } from "react-hook-form";
import { initialSignUpFormValues } from "./utils";

const useSignUpFormHook = () => {
  const renderSignUpFormHookProps = useForm({
    defaultValues: initialSignUpFormValues,
  });

  return {
    renderSignUpFormHookProps,
  };
};

export default useSignUpFormHook;
