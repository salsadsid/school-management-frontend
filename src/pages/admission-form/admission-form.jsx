import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import cryptoRandomString from "crypto-random-string";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormValidationError from "../../components/Errors/FormValidationError";
import { useAddAdmissionInfoMutation } from "../../redux/api/admissionApi";
import { createPromiseToast } from "../../utils/promiseToast";

// Validation Schema with Yup
const admissionFormSchema = Yup.object().shape({
  admissionType: Yup.string()
    .required("Admission Type is required")
    .oneOf(["non_residential", "day_care", "night_care"])
    .label("Select Admission Type"),
  branch: Yup.string()
    .required("Branch is required")
    .oneOf(["school", "cadet"])
    .label("Select Branch"),
  studentName: Yup.string().required("Student's name is required"),
  studentNameBangla: Yup.string().required(
    "Student's name in Bangla is required"
  ),
  session: Yup.string().required("Session is required"),
  class: Yup.string()
    .required("Class is required")
    .oneOf([
      "class_1",
      "class_2",
      "class_3",
      "class_4",
      "class_5",
      "class_6",
      "class_7",
      "class_8",
    ])
    .label("Select Class"),
  fatherName: Yup.string().required("Father's name is required"),
  motherName: Yup.string().required("Mother's name is required"),
  presentAddress: Yup.string().required("Present Address is required"),
  permanentAddress: Yup.string().required("Permanent Address is required"),
  dateOfBirth: Yup.date()
    .typeError("Expected a value of type ${type} but got: ${value}")
    .required("Date of Birth is required"),
  height: Yup.string(),
  weight: Yup.string(),
  emergencyContactNo: Yup.string().required("Emergency contact is required"),
});

export const AdmissionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(admissionFormSchema),
  });
  const [addAdmissionInfo, { isLoading }] = useAddAdmissionInfoMutation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Form Submitted Data:", data);
    const applicationIdGenerated = cryptoRandomString({
      length: 6,
      type: "distinguishable",
    });
    const toast = createPromiseToast();
    const { errorToast } = toast();
    try {
      const response = await addAdmissionInfo({
        ...data,
        applicationId: applicationIdGenerated,
      }).unwrap();
      console.log(response);
      if (response.status === "success") {
        // Redirect to success page
        navigate(`/success?applicationId=${response?.results?.applicationId}`);
      }
    } catch (err) {
      console.error(err);
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white p-6 shadow-lg rounded-lg">
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-center mb-12 text-3xl font-bold"
      >
        Admission Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-lg text-gray-800 font-semibold md:col-span-2 ">
            Admission Type and Branch
          </p>
          {/* Admission Type */}
          <div>
            <Controller
              name="admissionType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Select Admission Type"
                  name="admissionType"
                  value={value}
                  onChange={onChange}
                >
                  <Option value="non_residential">Non Residential</Option>
                  <Option value="day_care">Day Care</Option>
                  <Option value="night_care">Night Care</Option>
                </Select>
              )}
            />

            {errors.admissionType && (
              <FormValidationError
                errorMessage={errors.admissionType.message}
              />
            )}
          </div>
          <div className="mb-6">
            <Controller
              name="branch"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Select Branch"
                  name="branch"
                  value={value}
                  onChange={onChange}
                >
                  <Option value="school">School Branch</Option>
                  <Option value="cadet">Cadet Coaching Branch</Option>
                </Select>
              )}
            />
            {errors.branch && (
              <FormValidationError errorMessage={errors.branch.message} />
            )}
          </div>

          <p className="text-lg text-gray-800 font-semibold md:col-span-2 ">
            Student&apos;s Information
          </p>

          {/* Student's Name */}
          <div>
            <Input
              label="Student's Name (Full Name) "
              {...register("studentName")}
            />
            {errors.studentName && (
              <FormValidationError errorMessage={errors.studentName.message} />
            )}
          </div>

          <div>
            <Input
              label="Student's Name (Bangla) "
              {...register("studentNameBangla")}
            />
            {errors.studentName && (
              <FormValidationError errorMessage={errors.studentName.message} />
            )}
          </div>

          {/* Admission Roll No */}
          {/* <div>
            <Input label="Admission Roll No" {...register("admissionRollNo")} />
            {errors.admissionRollNo && (
              <Typography variant="small" color="red">
                {errors.admissionRollNo.message}
              </Typography>
            )}
          </div> */}

          {/* Class */}
          <div>
            <Controller
              name="class"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Select Class"
                  name="class"
                  value={value}
                  onChange={onChange}
                >
                  <Option value="class_1">Class 1</Option>
                  <Option value="class_2">Class 2</Option>
                  <Option value="class_3">Class 3</Option>
                  <Option value="class_4">Class 4</Option>
                  <Option value="class_5">Class 5</Option>
                  <Option value="class_6">Class 6</Option>
                  <Option value="class_7">Class 7</Option>
                  <Option value="class_8">Class 8</Option>
                </Select>
              )}
            />

            {errors.class && (
              <FormValidationError errorMessage={errors.class.message} />
            )}
          </div>

          {/* Session */}
          <div className="mb-6">
            <Input label="Session" {...register("session")} />
            {errors.session && (
              <FormValidationError errorMessage={errors.session.message} />
            )}
          </div>

          {/* Father's Name */}
          <p className="text-lg text-gray-800 font-semibold md:col-span-2 ">
            Father&apos;s Information
          </p>
          <div className="col-start-1">
            <Input label="Father's Name" {...register("fatherName")} />
            {errors.fatherName && (
              <FormValidationError errorMessage={errors.fatherName.message} />
            )}
          </div>

          <div>
            <Input
              label="Father's Name (Bangla)"
              {...register("fatherNameBangla")}
            />
            {errors.fatherNameBangla && (
              <FormValidationError
                errorMessage={errors.fatherNameBangla.message}
              />
            )}
          </div>
          <div>
            <Input
              label="Father's Occupation"
              {...register("fatherOccupation")}
            />
            {errors.fatherOccupation && (
              <FormValidationError
                errorMessage={errors.fatherOccupation.message}
              />
            )}
          </div>

          <div>
            <Input
              label="Father's Yearly Income"
              {...register("fatherYearlyIncome")}
            />
            {errors.fatherYearlyIncome && (
              <FormValidationError
                errorMessage={errors.fatherYearlyIncome.message}
              />
            )}
          </div>
          <div>
            <Input
              label="Father's Contact No."
              {...register("fatherContactNo")}
            />
            {errors.fatherContactNo && (
              <FormValidationError
                errorMessage={errors.fatherContactNo.message}
              />
            )}
          </div>
          <p className="text-lg text-gray-800 font-semibold md:col-span-2 mt-6 ">
            Mother&apos;s Information
          </p>
          {/* Mother's Name */}
          <div>
            <Input label="Mother's Name" {...register("motherName")} />
            {errors.motherName && (
              <FormValidationError errorMessage={errors.motherName.message} />
            )}
          </div>
          <div>
            <Input
              label="Mother's Name (Bangla)"
              {...register("motherNameBangla")}
            />
            {errors.motherName && (
              <FormValidationError errorMessage={errors.motherName.message} />
            )}
          </div>
          <div>
            <Input
              label="Mother's Occupation"
              {...register("motherOccupation")}
            />
            {errors.motherOccupation && (
              <FormValidationError
                errorMessage={errors.motherOccupation.message}
              />
            )}
          </div>

          <div>
            <Input
              label="Mother's Contact No."
              {...register("motherContactNo")}
            />
            {errors.motherContactNo && (
              <FormValidationError
                errorMessage={errors.motherContactNo.message}
              />
            )}
          </div>

          <p className="text-lg mt-6 text-gray-800 font-semibold md:col-span-2 ">
            Student&apos;s Personal Information
          </p>
          {/* Date of Birth */}
          <div>
            <Input
              label="Date of Birth"
              type="date"
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <FormValidationError errorMessage={errors.dateOfBirth.message} />
            )}
          </div>

          {/* Blood Group */}
          <div>
            <Input
              label="Blood Group"
              placeholder="e.g. A+"
              {...register("bloodGroup")}
            />
            {errors.bloodGroup && (
              <FormValidationError errorMessage={errors.bloodGroup.message} />
            )}
          </div>

          {/* Height */}
          <div>
            <Input
              label="Height"
              placeholder={`e.g. 5'6"`}
              {...register("height")}
            />
          </div>

          {/* Weight */}
          <div>
            <Input
              label="Weight"
              placeholder="e.g. 35kg"
              {...register("weight")}
            />
          </div>
          <div>
            <Input
              label="Identification Mark"
              placeholder="e.g. Mole on the left cheek"
              {...register("identificationMark")}
            />
          </div>
          {/* Present Address */}
          <p className="text-lg text-gray-800 font-semibold md:col-span-2 mt-6">
            Student&apos;s Address
          </p>
          <div className="md:col-span-2">
            <Textarea
              label="Present Address"
              {...register("presentAddress")}
              rows={2}
            />
            {errors.presentAddress && (
              <FormValidationError
                errorMessage={errors.presentAddress.message}
              />
            )}
          </div>

          {/* Permanent Address */}
          <div className="md:col-span-2">
            <Textarea
              label="Permanent Address"
              {...register("permanentAddress")}
              rows={2}
            />
            {errors.permanentAddress && (
              <FormValidationError
                errorMessage={errors.permanentAddress.message}
              />
            )}
          </div>

          {/* Emergency Contact */}
          <p className="text-lg text-gray-800 font-semibold md:col-span-2 mt-6">
            Emergency Contact
          </p>
          <div>
            <Input
              label="Emergency Contact"
              {...register("emergencyContactNo")}
            />
            {errors.emergencyContactNo && (
              <FormValidationError
                errorMessage={errors.emergencyContactNo.message}
              />
            )}
          </div>
          <div>
            <Input
              label="Relationship"
              {...register("relationWithEmergencyContact")}
            />
            {errors.relationship && (
              <FormValidationError errorMessage={errors.relationship.message} />
            )}
          </div>

          <div className="md:col-span-2 mt-6">
            <Input
              label="Name of the previous institution"
              {...register("previousInstitution")}
            />
            {errors.previousInstitution && (
              <FormValidationError
                errorMessage={errors.previousInstitution.message}
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-12 ">
          <Button
            color="teal"
            size="lg"
            type="submit"
            className="md:w-1/2 w-full flex justify-center normal-case text-lg font-medium"
            loading={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Admission Form"}
          </Button>
        </div>
      </form>
    </div>
  );
};
