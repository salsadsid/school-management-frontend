import * as Yup from "yup";

export const newClassSchema = Yup.object().shape({
  name: Yup.string().required("Class Name is required"),
  teacher: Yup.string().required("Teacher is required").label("Teacher"),
});
