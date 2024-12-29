import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

import { Controller } from "react-hook-form";
import { useCreateClassMutation } from "../../../redux/api/classApi";
import { useGetTeachersQuery } from "../../../redux/api/teacherApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import FormValidationError from "../../Errors/FormValidationError";
import useNewClassForm from "./useNewClassForm";
const NewClassForm = () => {
  const { renderNewClassFormHookProps } = useNewClassForm();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = renderNewClassFormHookProps;
  const [createClass] = useCreateClassMutation();
  const { data: teachers, isLoading: isTeachersLoading } =
    useGetTeachersQuery();
  console.log(errors);
  const submitHandler = async (data) => {
    console.log(data);
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();
    try {
      const res = await createClass(data).unwrap();
      console.log(res);
      successToast({ message: "Class created successfully" });
    } catch (err) {
      console.log(err);
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  return (
    <div className="w-full bg-white  p-8">
      <Typography
        variant="h3"
        color="blue"
        className="mb-4 text-center font-bold"
      >
        ✨ Create New Class
      </Typography>
      <Typography variant="small" color="gray" className="mb-8 text-center">
        Fill out the details below to add a new class.
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
            className=""
          />
          {errors?.name && (
            <FormValidationError errorMessage={errors?.name?.message} />
          )}
        </div>

        {/* Teacher Select Dropdown */}
        <div className="space-y-1">
          {!isTeachersLoading ? (
            <Controller
              name="teacher"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Teacher"
                  variant="outlined"
                  className=""
                  value={value}
                  onChange={onChange}
                >
                  {teachers?.map((teacher) => (
                    <Option key={teacher.email} value={teacher._id}>
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
        >
          🚀 Submit
        </Button>
      </form>
    </div>
  );
};

export default NewClassForm;
