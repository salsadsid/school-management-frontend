import { Button, Input, Typography } from "@material-tailwind/react";

import { useCreateUserAndTeacherMutation } from "../../../redux/api/teacherApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import FormValidationError from "../../Errors/FormValidationError";
import useNewTeacherForm from "./useNewClassForm";
const NewTeacherForm = () => {
  const { renderNewTeacherFormHookProps } = useNewTeacherForm();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = renderNewTeacherFormHookProps;
  const [createUserAndTeacher] = useCreateUserAndTeacherMutation();
  console.log(errors);
  const submitHandler = async (data) => {
    console.log(data);
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();
    try {
      const res = await createUserAndTeacher(data).unwrap();
      console.log(res);
      successToast({ message: "Teacher added successfully" });
      reset();
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
        ✨ Add Teacher
      </Typography>
      <Typography variant="small" color="gray" className="mb-8 text-center">
        Fill out the details below to add a new teacher.
      </Typography>
      <form
        className="mx-auto max-w-[28rem] space-y-6"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* Class Name Input */}
        <div className="space-y-1">
          <Input
            label="Teacher Name"
            placeholder="e.g., John Doe"
            {...register("name")}
            className=""
          />
          {errors?.name && (
            <FormValidationError errorMessage={errors?.name?.message} />
          )}
        </div>

        {/* Teacher Select Dropdown */}
        <div className="space-y-1">
          <Input
            label="Email"
            placeholder="e.g., john.doe@gmail.com"
            {...register("email")}
            className=""
          />
          {errors?.email && (
            <FormValidationError errorMessage={errors?.email?.message} />
          )}
        </div>
        <div>
          <Input label="Password" type="text" {...register("password")} />
          {errors?.password && (
            <FormValidationError errorMessage={errors.password.message} />
          )}
        </div>
        <div className="space-y-1">
          <Input
            label="Joining Date"
            placeholder="e.g., john.doe@gmail.com"
            {...register("joiningDate")}
            className=""
            type="date"
          />
          {errors?.joiningDate && (
            <FormValidationError errorMessage={errors?.joiningDate?.message} />
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

export default NewTeacherForm;
