import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // or your routing library
import useManageQueryParams from "../../../hooks/useManageQueryParams";
import {
  useCreateStudentMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/api/studentApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import FormValidationError from "../../Errors/FormValidationError";
import useNewStudentForm from "./useNewStudentForm";
// Updated NewStudentForm component
const NewStudentForm = ({ classes, sections }) => {
  const { readQueryParam } = useManageQueryParams();
  const studentId = readQueryParam("studentId");
  const navigate = useNavigate();
  const isEditMode = !!studentId;

  // Fetch student data if in edit mode
  const { data: studentData, isLoading: isStudentLoading } = useGetStudentQuery(
    { id: studentId },
    { skip: !studentId }
  );

  const [createStudent] = useCreateStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const { renderNewStudentFormHookProps } = useNewStudentForm(isEditMode);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = renderNewStudentFormHookProps;

  // Populate form when student data loads
  useEffect(() => {
    if (studentData && isEditMode) {
      reset({
        name: studentData.name,
        studentId: studentData.studentId,
        classId: studentData.classId,
        phoneNumber1: studentData.phoneNumber1,
        phoneNumber2: studentData.phoneNumber2,
        // Password optional in update
      });
    }
  }, [studentData, reset, isEditMode]);

  const submitHandler = async (data) => {
    const toast = createPromiseToast();
    const { successToast, errorToast, loadingToast } = toast();

    try {
      if (isEditMode) {
        loadingToast({ message: "Updating student..." });
        await updateStudent({
          id: studentId,
          data: {
            name: data.name,
            studentId: data.studentId,
            classId: data.classId,
            phoneNumber1: data.phoneNumber1,
            phoneNumber2: data.phoneNumber2,
          },
        }).unwrap();
        successToast({ message: "Student updated successfully" });
      } else {
        loadingToast({ message: "Adding student ..." });
        await createStudent({
          name: data.name,
          studentId: data.studentId,
          password: data.password,
          classId: data.classId,
          phoneNumber1: data.phoneNumber1,
          phoneNumber2: data.phoneNumber2,
        }).unwrap();
        successToast({ message: "Student added successfully" });
      }
      // navigate("/students"); // Redirect after success
    } catch (err) {
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto  p-10">
      {/* Updated Header */}
      <div className="text-center mb-8">
        <Typography variant="h3" color="indigo" className="font-bold mb-2">
          {isEditMode ? "✏️ Edit Student" : "🎓 Add a New Student"}
        </Typography>
        <Typography variant="small" color="gray" className="text-base">
          {isEditMode
            ? "Update student information below"
            : "Please fill in the details below to enroll a new student"}
        </Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              readOnly={isEditMode}
              label="Student ID"
              placeholder="ex : 2022-12345"
              {...register("studentId")}
            />
            {errors?.studentId && (
              <FormValidationError errorMessage={errors.studentId.message} />
            )}
          </div>

          {/* Roll Number */}

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

          <div>
            <Input label="Phone 1" {...register("phoneNumber1")} />
            {errors?.phoneNumber1 && (
              <FormValidationError errorMessage={errors.phoneNumber1.message} />
            )}
          </div>

          <div>
            <Input label="Phone 2 (optional)" {...register("phoneNumber2")} />
            {errors?.phoneNumber2 && (
              <FormValidationError errorMessage={errors.phoneNumber2.message} />
            )}
          </div>

          {/* Password Field - Optional in Update */}
          <div>
            <Input
              disabled={isEditMode}
              label="Password"
              type="text"
              {...register("password")}
              placeholder={isEditMode ? "Leave blank to keep existing" : ""}
            />
            {errors?.password && (
              <FormValidationError errorMessage={errors.password.message} />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button type="submit" color="indigo">
            {isEditMode ? "💾 Save Changes" : "✨ Submit Student"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewStudentForm;
