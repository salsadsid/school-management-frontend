import cryptoRandomString from "crypto-random-string";

export const initialNewTeacherFormValues = {
  name: "",
  //   description: "",
  email: "",
  password: cryptoRandomString({ length: 6, type: "distinguishable" }),
  // classCode: "",
  // maxCapacity: "",
};
