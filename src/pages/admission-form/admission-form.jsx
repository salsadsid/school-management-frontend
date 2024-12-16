import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// Validation Schema with Yup
const admissionFormSchema = Yup.object().shape({
  studentName: Yup.string().required("Student's name is required"),
  fatherName: Yup.string().required("Father's name is required"),
  motherName: Yup.string().required("Mother's name is required"),
  admissionRollNo: Yup.string().required("Admission Roll No is required"),
  session: Yup.string().required("Session is required"),
  presentAddress: Yup.string().required("Present Address is required"),
  permanentAddress: Yup.string().required("Permanent Address is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  bloodGroup: Yup.string().required("Blood Group is required"),
  height: Yup.string(),
  weight: Yup.string(),
  emergencyContact: Yup.string().required("Emergency contact is required"),
});

export const AdmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(admissionFormSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);
  };

  return (
    <div className="max-w-5xl mx-auto my-10 bg-white p-6 shadow-lg rounded-lg">
      <Typography
        variant="h4"
        color="blue-gray"
        className="text-center mb-4 font-bold"
      >
        Admission Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student's Name */}
          <div>
            <Input label="Student's Name" {...register("studentName")} />
            {errors.studentName && (
              <Typography variant="small" color="red">
                {errors.studentName.message}
              </Typography>
            )}
          </div>

          {/* Admission Roll No */}
          <div>
            <Input label="Admission Roll No" {...register("admissionRollNo")} />
            {errors.admissionRollNo && (
              <Typography variant="small" color="red">
                {errors.admissionRollNo.message}
              </Typography>
            )}
          </div>

          {/* Session */}
          <div>
            <Input label="Session" {...register("session")} />
            {errors.session && (
              <Typography variant="small" color="red">
                {errors.session.message}
              </Typography>
            )}
          </div>

          {/* Father's Name */}
          <div>
            <Input label="Father's Name" {...register("fatherName")} />
            {errors.fatherName && (
              <Typography variant="small" color="red">
                {errors.fatherName.message}
              </Typography>
            )}
          </div>

          {/* Mother's Name */}
          <div>
            <Input label="Mother's Name" {...register("motherName")} />
            {errors.motherName && (
              <Typography variant="small" color="red">
                {errors.motherName.message}
              </Typography>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <Input
              label="Date of Birth"
              type="date"
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <Typography variant="small" color="red">
                {errors.dateOfBirth.message}
              </Typography>
            )}
          </div>

          {/* Blood Group */}
          <div>
            <Input label="Blood Group" {...register("bloodGroup")} />
            {errors.bloodGroup && (
              <Typography variant="small" color="red">
                {errors.bloodGroup.message}
              </Typography>
            )}
          </div>

          {/* Height */}
          <div>
            <Input label="Height" {...register("height")} />
          </div>

          {/* Weight */}
          <div>
            <Input label="Weight" {...register("weight")} />
          </div>

          {/* Present Address */}
          <div className="md:col-span-2">
            <Textarea
              label="Present Address"
              {...register("presentAddress")}
              rows={2}
            />
            {errors.presentAddress && (
              <Typography variant="small" color="red">
                {errors.presentAddress.message}
              </Typography>
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
              <Typography variant="small" color="red">
                {errors.permanentAddress.message}
              </Typography>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="md:col-span-2">
            <Input
              label="Emergency Contact"
              {...register("emergencyContact")}
            />
            {errors.emergencyContact && (
              <Typography variant="small" color="red">
                {errors.emergencyContact.message}
              </Typography>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <Button color="blue" size="lg" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
