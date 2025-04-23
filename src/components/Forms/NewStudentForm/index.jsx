import { CameraIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../configs/constOptions";
import useManageQueryParams from "../../../hooks/useManageQueryParams";
import {
  useCreateStudentMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/api/studentApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import FormValidationError from "../../Errors/FormValidationError";
import useNewStudentForm from "./useNewStudentForm";

const NewStudentForm = ({ classes, sections }) => {
  const { readQueryParam, deleteQueryParam } = useManageQueryParams();
  const studentId = readQueryParam("studentId");
  const navigate = useNavigate();
  const isEditMode = !!studentId;
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState(null);
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

  useEffect(() => {
    if (studentData && isEditMode) {
      reset({
        name: studentData.name,
        studentId: studentData.studentId,
        classId: studentData.classId,
        phoneNumber1: studentData.phoneNumber1,
        phoneNumber2: studentData.phoneNumber2,
      });
      // Set initial image preview
      if (studentData.imageCloudinary || studentData.imageLocal) {
        setImagePreview(
          studentData.imageCloudinary ||
            API_BASE_URL + "/" + studentData.imageLocal
        );
      }
    }
  }, [studentData, reset, isEditMode]);
  console.log(imagePreview);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageError(null); // Reset previous errors

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Image must be in JPG or PNG format");
      removeImage();
      return;
    }

    // Validate file size (300KB = 307200 bytes)
    if (file.size > 307200) {
      setImageError("Image size must be less than 300 KB");
      removeImage();
      return;
    }

    // Proceed with valid file
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitHandler = async (data) => {
    const toast = createPromiseToast();
    const { successToast, errorToast, loadingToast } = toast();

    try {
      const formData = new FormData();

      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
      });

      // Append image file if exists
      if (imageFile) {
        formData.append("studentImage", imageFile);
      }
      console.log(formData);

      if (isEditMode) {
        loadingToast({ message: "Updating student..." });
        await updateStudent({
          id: studentId,
          data: formData,
        }).unwrap();
        successToast({ message: "Student updated successfully" });
      } else {
        loadingToast({ message: "Adding student..." });
        await createStudent(formData).unwrap();
        successToast({ message: "Student added successfully" });
      }

      navigate("/dashboard/student-new");
      deleteQueryParam("studentId");
      reset();
      removeImage();
    } catch (err) {
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-10">
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

      <form onSubmit={handleSubmit(submitHandler)}>
        {/* Image Upload Section */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-indigo-100 overflow-hidden bg-gray-100">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Student Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CameraIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="absolute bottom-0 right-0 flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="studentImage"
              />
              <label
                htmlFor="studentImage"
                className="cursor-pointer p-2 bg-indigo-500 rounded-full shadow-lg hover:bg-indigo-600 transition-colors"
              >
                <CameraIcon className="w-5 h-5 text-white" />
              </label>

              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-2 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  <TrashIcon className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </div>

          {errors?.image && (
            <FormValidationError errorMessage={errors.image.message} />
          )}
          {imageError && <FormValidationError errorMessage={imageError} />}
        </div>

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
          <Button
            type="submit"
            color="indigo"
            className="flex items-center gap-2 mx-auto"
          >
            {isEditMode ? "💾 Save Changes" : "✨ Submit Student"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewStudentForm;
