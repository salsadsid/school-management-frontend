import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import LoginForm from "../../components/Forms/LoginForm";
import { loginPageImage } from "../../configs/systemConfiguration";

const data = [
  {
    label: "Student",
    value: "student",
    component: <LoginForm isTeacher={false} />,
  },
  {
    label: "Admin/Teacher",
    value: "teacher",
    component: <LoginForm isTeacher={true} />,
  },
];
export function SignIn() {
  return (
    <section className="m-8 flex items-center gap-4">
      <div className="w-full lg:w-3/5 mt-12">
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
          src={loginPageImage.src}
          alt={loginPageImage.alt}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
