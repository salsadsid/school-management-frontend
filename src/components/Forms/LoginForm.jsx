import { useState } from "react";

import { Button, Input, Typography } from "@material-tailwind/react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useLoginFormHook from "./useLoginFormHook";

const LoginForm = ({ isTeacher }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { renderLoginFormHookProps } = useLoginFormHook({ isTeacher });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = renderLoginFormHookProps;

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Typography variant="h3" color="blue-gray" className="mb-2">
        Log in
      </Typography>
      <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
        Enter your {isTeacher ? "email" : "Student ID"} and password
      </Typography>

      <form
        className="mx-auto max-w-[24rem] text-left"
        onSubmit={handleSubmit(submitHandler)}
      >
        {isTeacher ? (
          <div className="mb-6">
            <Input label="Email" {...register("email")} />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <Input label="Student ID" {...register("studentId")} />
            {errors.studentId && (
              <span className="text-red-500">{errors.studentId.message}</span>
            )}
          </div>
        )}
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

export default LoginForm;
