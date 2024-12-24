import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormValidationError from "../../components/Errors/FormValidationError";
import { createPromiseToast } from "../../utils/promiseToast";
import DownloadApplication from "../../widgets/download-application/download-application";
// Validation Schema with Yup
const applicationDownloadFormSchema = Yup.object().shape({
  id: Yup.string().required("Application ID is required"),
});

export const ApplicationDownload = () => {
  const [applicationId, setApplicationId] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicationDownloadFormSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Submitted Data:", data);
    const toast = createPromiseToast();
    const { errorToast } = toast();
    try {
      setLoading(true);
      setApplicationId(data.id);
    } catch (err) {
      console.error(err);
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    } finally {
      setLoading(false);
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
        <div className="">
          <div>
            <p className="text-lg mb-4 text-gray-800 font-semibold md:col-span-2 ">
              Enter your Application ID
            </p>

            {/* Student's Name */}
            <div>
              <Input label="ID" {...register("id")} />
              {errors.id && (
                <FormValidationError errorMessage={errors.id.message} />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 ">
            <Button
              color="teal"
              type="submit"
              className="md:w-1/4 w-full flex justify-center normal-case text-lg font-medium"
              loading={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </form>
      {applicationId && <DownloadApplication query={applicationId} />}
    </div>
  );
};
