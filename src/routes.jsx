import {
  HomeIcon,
  RectangleStackIcon,
  ServerStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
// import Classes from "./pages/dashboard/classes";
// import NewClass from "./pages/dashboard/newclass";

import { SignIn, SignUp } from "@/pages/auth";
import { Classes, NewClass, NewStudent } from "@/pages/dashboard";

// import NewStudent from "./pages/dashboard/newStudent";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "All Classes",
        path: "/classes",
        element: <Classes />,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: "New Class",
        path: "/classes-new",
        element: <NewClass />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "New Student",
        path: "/student-new",
        element: <NewStudent />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    visiable: false,
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
