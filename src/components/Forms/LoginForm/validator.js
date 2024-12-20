import * as Yup from "yup";

export const loginSchemaTeacher = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export const loginSchemaStudent = Yup.object().shape({
  studentId: Yup.string().required("Student ID is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});
