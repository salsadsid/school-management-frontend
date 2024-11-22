import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import Classes from "./pages/dashboard/classes";
// import NewClass from "./pages/dashboard/newclass";

import { Classes, NewClass } from "@/pages/dashboard";

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
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "All Classee",
      //   path: "/classes",
      //   element: <Profile />,
      // },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "New Class",
        path: "/classes-new",
        element: <NewClass />,
      },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
