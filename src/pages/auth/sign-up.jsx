import SignUpForm from "../../components/Forms/SignUpForm";

export function SignUp() {
  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <SignUpForm />
      </div>
    </section>
  );
}

export default SignUp;
