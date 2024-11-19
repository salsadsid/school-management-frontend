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
export function Login() {
  return (
    <section className="grid text-center h-screen items-center p-8">
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
      {/* <LoginForm /> */}
    </section>
  );
}

export default Login;
