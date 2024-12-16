import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../redux/api/authApi";
import FormValidationError from "../../Errors/FormValidationError";
import useLoginFormHook from "./useLoginFormHook";

const LoginForm = ({ isTeacher }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const { renderLoginFormHookProps } = useLoginFormHook({ isTeacher });
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = renderLoginFormHookProps;

  const submitHandler = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      console.log(res, "res");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        className="mx-auto max-w-[24rem] text-left"
        onSubmit={handleSubmit(submitHandler)}
      >
        <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
          Log in
        </Typography>
        <Typography className="mb-6 text-gray-600 font-normal text-center text-[18px]">
          Enter your {isTeacher ? "email" : "Student ID"} and password
        </Typography>
        {isTeacher ? (
          <div className="mb-6">
            <Input label="Email" {...register("email")} />
            {errors.email && (
              <FormValidationError errorMessage={errors.email.message} />
            )}
          </div>
        ) : (
          <div className="mb-6">
            <Input label="Student ID" {...register("studentId")} />
            {errors.studentId && (
              <FormValidationError errorMessage={errors.studentId.message} />
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
            <FormValidationError errorMessage={errors.password.message} />
          )}
        </div>
        <Button size="lg" className="mt-6" fullWidth type="submit">
          sign in
        </Button>
        {/* <div className="!mt-4 flex justify-end">
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            variant="small"
            className="font-medium"
          >
            Forgot password
          </Typography>
        </div> */}

        {isTeacher && (
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <Link
              to="/auth/sign-up"
              className="font-medium hover:underline text-gray-900"
            >
              Create account
            </Link>
          </Typography>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
