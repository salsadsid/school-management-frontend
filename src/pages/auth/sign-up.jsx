import SignUpForm from "../../components/Forms/SignUpForm";
import { loginPageImage } from "../../configs/systemConfiguration";

export function SignUp() {
  return (
    <section className="m-8 flex items-center">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/assets/login_graphic.png"
          alt={loginPageImage.alt}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center mt-12">
        <SignUpForm />
      </div>
    </section>
  );
}

export default SignUp;
