import * as Yup from "yup";

export const newSectionSchema = Yup.object().shape({
  name: Yup.string().required("Class Name is required"),
  class: Yup.string().required("Class is required").label("Class"),
});
