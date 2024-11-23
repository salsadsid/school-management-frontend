import cryptoRandomString from "crypto-random-string";

export const initialStudentFormValues = {
  name: "",
  roll: "",
  password: cryptoRandomString({ length: 6, type: "distinguishable" }),
  classId: "",
};
