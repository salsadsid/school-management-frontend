import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useManageQueryParams from "../../../hooks/useManageQueryParams";
import {
  useCreateClassMutation,
  useGetClassQuery,
  useUpdateClassMutation,
} from "../../../redux/api/classApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import FormValidationError from "../../Errors/FormValidationError";
import useNewClassForm from "./useNewClassForm";
const NewClassForm = ({ teachers }) => {
  const { readQueryParam, deleteQueryParam } = useManageQueryParams();
  const classId = readQueryParam("classId");
  const navigate = useNavigate();
  const isEditMode = !!classId;

  // Add default values to the form hook
  const { renderNewClassFormHookProps } = useNewClassForm({
    defaultValues: {
      name: "",
      teacher: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = renderNewClassFormHookProps;

  const [createClass] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();

  // Fix loading state name
  const { data: classData, isLoading: isClassLoading } = useGetClassQuery(
    { id: classId },
    { skip: !classId }
  );

  // Reset form when class data loads
  useEffect(() => {
    if (classData && isEditMode) {
      reset({
        name: classData.name,
        teacher: classData.teacher?._id || "",
      });
    }
  }, [classData, reset, isEditMode]);

  const submitHandler = async (data) => {
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();

    try {
      if (isEditMode) {
        // Update existing class
        console.log(data);
        await updateClass({
          id: classId,
          data: data,
        }).unwrap();
        successToast({ message: "Class updated successfully" });
      } else {
        // Create new class
        const res = await createClass(data).unwrap();
        successToast({ message: "Class created successfully" });
        reset();
        if (res?.data) {
          navigate(`/dashboard/classes/${res?.data?._id}`);
        }
      }

      // Navigate back or refresh data as needed
      deleteQueryParam("classId");
      navigate("/dashboard/classes");
    } catch (err) {
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  if (isClassLoading) return <p>Loading...</p>;

  return (
    <div className="w-full bg-white p-8">
      <Typography
        variant="h3"
        color="blue"
        className="mb-4 text-center font-bold"
      >
        {isEditMode ? "✏️ Edit Class" : "✨ Create New Class"}
      </Typography>
      <Typography variant="small" color="gray" className="mb-8 text-center">
        {isEditMode
          ? "Update the class details below."
          : "Fill out the details below to add a new class."}
      </Typography>

      <form
        className="mx-auto max-w-[28rem] space-y-6"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* Class Name Input */}
        <div className="space-y-1">
          <Input
            label="Class Name"
            placeholder="e.g., Class 1"
            {...register("name")}
          />
          {errors?.name && (
            <FormValidationError errorMessage={errors?.name?.message} />
          )}
        </div>

        {/* Teacher Select Dropdown */}
        <div className="space-y-1">
          {teachers?.length > 0 ? (
            <Controller
              name="teacher"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Teacher"
                  value={value}
                  onChange={onChange}
                  error={!!errors.teacher}
                >
                  {teachers.map((teacher) => (
                    <Option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
          ) : (
            <div className="text-gray-500 text-sm">Loading teachers...</div>
          )}
          {errors?.teacher && (
            <FormValidationError errorMessage={errors?.teacher?.message} />
          )}
        </div>

        {/* Submit Button */}
        <Button
          size="lg"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          type="submit"
          disabled={isClassLoading || (isEditMode && !isDirty)}
        >
          {isEditMode ? "💾 Save Changes" : "🚀 Create Class"}
        </Button>
      </form>
    </div>
  );
};
export default NewClassForm;
