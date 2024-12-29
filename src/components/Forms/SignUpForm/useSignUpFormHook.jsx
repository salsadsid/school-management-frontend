import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { initialSignUpFormValues } from "./utils";
import { signUpSchema } from "./validator";

const useSignUpFormHook = () => {
  const renderSignUpFormHookProps = useForm({
    defaultValues: initialSignUpFormValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(signUpSchema),
  });

  return {
    renderSignUpFormHookProps,
  };
};

export default useSignUpFormHook;
