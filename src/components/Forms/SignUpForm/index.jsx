import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { enablesignup } from "../../../configs/systemConfiguration";
import { useRegisterUserMutation } from "../../../redux/api/authApi";
import { createPromiseToast } from "../../../utils/promiseToast";
import AlertMessage from "../../Alerts";
import FormValidationError from "../../Errors/FormValidationError";
import useSignUpFormHook from "./useSignUpFormHook";
import { roles } from "./utils";
const SignUpForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { renderSignUpFormHookProps } = useSignUpFormHook();
  const [registerUser] = useRegisterUserMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = renderSignUpFormHookProps;

  console.log(errors);
  const submitHandler = async (data) => {
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();
    try {
      const res = await registerUser(data).unwrap();
      console.log(res, "res");
      successToast({ message: "Registration successful. Please login" });
      navigate("/auth/sign-in");
    } catch (err) {
      errorToast({ message: err?.data?.message ?? "An error occurred" });
    }
  };
  return (
    <div className="w-full">
      <form
        className="mx-auto max-w-xl text-left"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
          Sign Up
        </Typography>
        <Typography className="mb-6 text-gray-600 font-normal text-center text-[18px]">
          Enter your email, password and role.
        </Typography>
        <div className="mb-6">
          <Input label="Name" {...register("name")} />
          {errors.name && (
            <FormValidationError errorMessage={errors.name.message} />
          )}
        </div>
        <div className="mb-6">
          <Input label="Email" {...register("email")} />
          {errors.email && (
            <FormValidationError errorMessage={errors.email.message} />
          )}
        </div>

        <div className="mb-6">
          <Input
            size="lg"
            placeholder="********"
            label="Password"
            {...register("password")}
            type={passwordShown ? "text" : "password"}
            icon={
              <i onClick={togglePasswordVisiblity}>
                {passwordShown ? (
                  <BsEye className="h-5 w-5" />
                ) : (
                  <BsEyeSlash className="h-5 w-5" />
                )}
              </i>
            }
          />
          {errors.password && (
            <FormValidationError errorMessage={errors.password.message} />
          )}
        </div>
        <div className="mb-6">
          <Controller
            name="role"
            control={renderSignUpFormHookProps.control}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Role"
                className="mb-6"
                variant="outlined"
                value={value}
                onChange={onChange}
              >
                {roles.map((role) => (
                  <Option key={role.name} value={role.name}>
                    {role.label}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.role && (
            <FormValidationError errorMessage={errors.role.message} />
          )}
        </div>
        {!enablesignup && (
          <AlertMessage
            className="rounded flex mt-6 items-center  border-[#2ec946] bg-red-100 font-medium text-red-800"
            icon={<MdErrorOutline />}
          >
            You can&apos;t sign up at this moment.
          </AlertMessage>
        )}
        <Button
          disabled={!enablesignup}
          size="lg"
          className="mt-6"
          fullWidth
          type="submit"
        >
          sign up
        </Button>

        <Typography
          variant="small"
          color="gray"
          className="!mt-4 text-center font-normal"
        >
          Already have an account?{" "}
          <Link
            to="/auth/sign-in"
            className="font-medium hover:underline text-gray-900"
          >
            Log in
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default SignUpForm;
