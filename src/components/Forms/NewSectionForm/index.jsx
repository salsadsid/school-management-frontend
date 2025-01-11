import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

import { Controller } from "react-hook-form";
import { useCreateSectionMutation } from "../../../redux/api/sectionApi";
import { useGetTeachersQuery } from "../../../redux/api/teacherApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import FormValidationError from "../../Errors/FormValidationError";
import useNewSectionForm from "./useNewSectionForm";
const NewSectionForm = ({ classes }) => {
  const { renderNewSectionFormHookProps } = useNewSectionForm();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = renderNewSectionFormHookProps;
  const [createSection] = useCreateSectionMutation();
  const { data: teachers, isLoading: isTeachersLoading } =
    useGetTeachersQuery();
  console.log(errors);
  const submitHandler = async (data) => {
    console.log(data);
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();
    try {
      const res = await createSection(data).unwrap();
      console.log(res);
      successToast({ message: "Section created successfully" });
      reset();
    } catch (err) {
      console.log(err);
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  return (
    <div className="w-full mx-auto bg-gradient-to-br from-white to-blue-50  rounded-lg p-8 ">
      <div className="max-w-[28rem] mx-auto">
        <div className="text-center">
          <Typography variant="h3" color="blue" className="mb-4 font-bold">
            🏫 Create New Section
          </Typography>
          <Typography variant="small" color="gray" className="mb-6">
            Add a new section to organize your class better. Select the class
            and assign a teacher below.
          </Typography>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          {/* Section Name */}
          <div className="space-y-1">
            <Input
              label="Section Name"
              placeholder="ex - 6A"
              {...register("name")}
            />
            {errors?.name && (
              <FormValidationError errorMessage={errors?.name?.message} />
            )}
          </div>

          {/* Class Dropdown */}
          <div className="space-y-1">
            {classes.length > 0 && (
              <Controller
                name="class"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select label="Class" value={value} onChange={onChange}>
                    {classes?.map((classItem) => (
                      <Option key={classItem._id} value={classItem._id}>
                        {classItem.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            )}
            {errors?.class && (
              <FormValidationError errorMessage={errors?.class?.message} />
            )}
          </div>

          {/* Teacher Dropdown */}
          <div className="space-y-1">
            {!isTeachersLoading && teachers.length > 0 && (
              <Controller
                name="teacher"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select label="Teacher" value={value} onChange={onChange}>
                    {teachers?.map((teacher) => (
                      <Option key={teacher.email} value={teacher._id}>
                        {teacher.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            )}
            {errors?.teacher && (
              <FormValidationError errorMessage={errors?.teacher?.message} />
            )}
          </div>

          {/* Submit Button */}
          <Button
            size="lg"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            🚀 Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewSectionForm;
