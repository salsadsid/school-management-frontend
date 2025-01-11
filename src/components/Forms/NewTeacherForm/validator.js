import * as Yup from "yup";

export const newTeacherSchema = Yup.object().shape({
  name: Yup.string().required("Teacher name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  joiningDate: Yup.date()
    .typeError("Expected a value of type ${type} but got: ${value}")
    .optional(),
});
