import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";
import { useGetClassesQuery } from "../../../redux/api/classApi";
import { useCreateStudentMutation } from "../../../redux/api/studentApi";
import useNewStudentForm from "./useNewClassForm";

const NewStudentForm = () => {
  const { renderNewStudentFormHookProps } = useNewStudentForm();
  const [createStudent] = useCreateStudentMutation();
  const { register, handleSubmit, control, errors } =
    renderNewStudentFormHookProps;
  const { data: classes, isLoading: isClassesLoading } = useGetClassesQuery();

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const res = await createStudent(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <Typography variant="h3" color="blue-gray" className="mb-2 text-center">
        New Student
      </Typography>
      <form
        className="mx-auto max-w-[24rem] text-left"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-6">
          <div className="mb-6">
            <Input label="Full Name" {...register("name")} />
            {errors?.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-6">
            <Input label="Student ID" {...register("studentId")} />
            {errors?.roll && (
              <span className="text-red-500">{errors.roll.message}</span>
            )}
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-6">
            <Input label="Password" type="text" {...register("password")} />
            {errors?.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
        {!isClassesLoading && (
          <Controller
            name="classId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Class"
                className="mb-6"
                variant="outlined"
                value={value}
                onChange={onChange}
              >
                {classes?.map((cls) => (
                  <Option key={cls._id} value={cls._id}>
                    {cls.name}
                  </Option>
                ))}
              </Select>
            )}
          ></Controller>
        )}

        <Button size="lg" className="mt-6" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewStudentForm;
