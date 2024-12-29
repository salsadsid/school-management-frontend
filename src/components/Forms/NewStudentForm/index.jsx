import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";
import { useCreateStudentMutation } from "../../../redux/api/studentApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import FormValidationError from "../../Errors/FormValidationError";
import useNewStudentForm from "./useNewStudentForm";

const NewStudentForm = ({ classes, sections }) => {
  const { renderNewStudentFormHookProps } = useNewStudentForm();
  const [createStudent] = useCreateStudentMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = renderNewStudentFormHookProps;

  const submitHandler = async (data) => {
    console.log(data);
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();
    try {
      const res = await createStudent({
        name: data.name,
        studentId: data.studentId,
        password: data.password,
        classId: data.classId,
        section: data.sectionId,
        rollNumber: data.rollNumber,
      }).unwrap();
      console.log(res);
      successToast({ message: "Student created successfully" });
    } catch (err) {
      console.log(err);
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <Typography variant="h3" color="indigo" className="font-bold mb-2">
          🎓 Add a New Student
        </Typography>
        <Typography variant="small" color="gray" className="text-base">
          Please fill in the details below to enroll a new student in the
          system.
        </Typography>
      </div>

      {/* Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* Full Name */}
        <div>
          <Input label="Full Name" {...register("name")} />
          {errors?.name && (
            <FormValidationError errorMessage={errors.name.message} />
          )}
        </div>

        {/* Student ID */}
        <div>
          <Input
            label="Student ID"
            placeholder="ex : 2022-12345"
            {...register("studentId")}
          />
          {errors?.studentId && (
            <FormValidationError errorMessage={errors.studentId.message} />
          )}
        </div>

        {/* Roll Number */}
        <div>
          <Input label="Roll Number" {...register("rollNumber")} />
          {errors?.rollNumber && (
            <FormValidationError errorMessage={errors.rollNumber.message} />
          )}
        </div>

        {/* Password */}
        <div>
          <Input label="Password" type="text" {...register("password")} />
          {errors?.password && (
            <FormValidationError errorMessage={errors.password.message} />
          )}
        </div>

        {/* Class Dropdown */}
        <div>
          {classes.length > 0 && (
            <Controller
              name="classId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select label="Class" value={value} onChange={onChange}>
                  {classes?.map((cls) => (
                    <Option key={cls._id} value={cls._id}>
                      {cls.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          )}
          {errors?.classId && (
            <FormValidationError errorMessage={errors.classId.message} />
          )}
        </div>

        {/* Section Dropdown */}
        <div>
          {sections.length > 0 && (
            <Controller
              name="sectionId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select label="Section" value={value} onChange={onChange}>
                  {sections?.map((cls) => (
                    <Option key={cls._id} value={cls._id}>
                      {cls.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          )}
          {errors?.sectionId && (
            <FormValidationError errorMessage={errors.sectionId.message} />
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 col-span-2 text-center">
          <Button
            size="lg"
            className="bg-indigo-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-indigo-600 transition duration-200"
            type="submit"
          >
            ✨ Submit Student
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewStudentForm;
