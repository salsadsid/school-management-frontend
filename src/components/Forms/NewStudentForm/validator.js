import * as Yup from "yup";

export const newStudentSchema = (isEditMode) =>
  Yup.object().shape({
    name: Yup.string().required("Name is required"),
    studentId: Yup.string().required("Student ID is required"),
    password: isEditMode
      ? Yup.string().optional()
      : Yup.string()
          .min(4, "Password must be at least 4 characters")
          .required("Password is required"),
    classId: Yup.string().required("Class is required").label("Class"),
    sectionId: Yup.string().required("Section is required").label("Section"),
    rollNumber: Yup.string().required("Roll Number is required"),
    phoneNumber1: Yup.string().required("Phone Number is required"),
    phoneNumber2: Yup.string().optional(),
  });
