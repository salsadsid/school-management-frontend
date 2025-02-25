import cryptoRandomString from "crypto-random-string";

export const initialStudentFormValues = {
  name: "",
  studentId: "",
  password: cryptoRandomString({ length: 6, type: "distinguishable" }),
  classId: "",
  sectionId: "",
  rollNumber: "",
  phoneNumber1: "",
  phoneNumber2: "",
};
