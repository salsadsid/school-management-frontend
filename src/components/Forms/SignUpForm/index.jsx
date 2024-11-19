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
import { useRegisterUserMutation } from "../../../redux/api/authApi";
import useSignUpFormHook from "./useSignUpFormHook";
import { roles } from "./utils";
const SignUpForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { renderSignUpFormHookProps } = useSignUpFormHook();
  const [registerUser] = useRegisterUserMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = renderSignUpFormHookProps;

  const submitHandler = async (data) => {
    try {
      const res = await registerUser(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full">
      <form
        className="mx-auto max-w-xl text-left"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign Up
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password
        </Typography>
        <div className="mb-6">
          <Input label="Email" {...register("email")} />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
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
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
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
        ></Controller>

        <Button size="lg" className="mt-6" fullWidth type="submit">
          sign in
        </Button>
        <div className="!mt-4 flex justify-end">
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            variant="small"
            className="font-medium"
          >
            Forgot password
          </Typography>
        </div>

        <Typography
          variant="small"
          color="gray"
          className="!mt-4 text-center font-normal"
        >
          Not registered?{" "}
          <a href="#" className="font-medium text-gray-900">
            Create account
          </a>
        </Typography>
      </form>
    </div>
  );
};

export default SignUpForm;
