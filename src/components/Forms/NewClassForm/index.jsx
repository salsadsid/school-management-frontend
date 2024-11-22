import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";
import { useCreateClassMutation } from "../../../redux/api/classApi";
import { useGetTeachersQuery } from "../../../redux/api/teacherApi";
import useNewClassForm from "./useNewClassForm";

const NewClassForm = () => {
  const { renderNewClassFormHookProps } = useNewClassForm();

  const { register, handleSubmit, control, errors } =
    renderNewClassFormHookProps;
  const [createClass] = useCreateClassMutation();
  const { data: teachers, isLoading: isTeachersLoading } =
    useGetTeachersQuery();
  const submitHandler = (data) => {
    console.log(data);
    try {
      const res = createClass(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">
      <Typography variant="h3" color="blue-gray" className="mb-2 text-center">
        New Class
      </Typography>
      <form
        className="mx-auto max-w-[24rem] text-left"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-6">
          <div className="mb-6">
            <Input label="Class Name" {...register("name")} />
            {errors?.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
        </div>
        {!isTeachersLoading && (
          <Controller
            name="teacherId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Teacher"
                className="mb-6"
                variant="outlined"
                value={value}
                onChange={onChange}
              >
                {teachers?.map((teacher) => (
                  <Option key={teacher.email} value={teacher._id}>
                    {teacher.email}
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

export default NewClassForm;
