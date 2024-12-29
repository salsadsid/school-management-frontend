import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { initialNewSectionFormValues } from "./utils";
import { newSectionSchema } from "./validator";

const useNewSectionForm = () => {
  const renderNewSectionFormHookProps = useForm({
    defaultValues: initialNewSectionFormValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(newSectionSchema),
  });

  return {
    renderNewSectionFormHookProps,
  };
};

export default useNewSectionForm;
