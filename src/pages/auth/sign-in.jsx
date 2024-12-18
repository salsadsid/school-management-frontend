import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import LoginForm from "../../components/Forms/LoginForm";

const data = [
  {
    label: "Student Login",
    value: "student",
    component: <LoginForm isTeacher={false} />,
  },
  {
    label: "Teacher Login",
    value: "teacher",
    component: <LoginForm isTeacher={true} />,
  },
];
export function SignIn() {
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <Tabs
          value="teacher"
          className="md:min-w-[420px] md:max-w-md w-full mx-auto"
        >
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, component }) => (
              <TabPanel key={value} value={value}>
                {component}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
