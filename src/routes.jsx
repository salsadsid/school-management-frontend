import { SignIn, SignUp } from "@/pages/auth";
import {
  AdmissionSubmission,
  Attendance,
  Classes,
  Home,
  NewClass,
  NewSection,
  NewStudent,
  Students,
  ViewAttendance,
} from "@/pages/dashboard";

import {
  HomeIcon,
  RectangleStackIcon,
  ServerStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    layout: "dashboard",
    title: "Class Management",
    isAccordion: true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "All Classes",
        path: "/classes",
        element: <Classes />,
      },

      {
        icon: <UserCircleIcon {...icon} />,
        name: "Add Class",
        path: "/classes-new",
        element: <NewClass />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Add Section",
        path: "/section-new",
        element: <NewSection />,
      },
    ],
  },
  {
    layout: "dashboard",
    title: "Students Management",
    isAccordion: true,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "All Students",
        path: "/students",
        element: <Students />,
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
    layout: "dashboard",
    title: "Attendance",
    isAccordion: true,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Attendance",
        path: "/attendance-new",
        element: <Attendance />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "View Attendance",
        path: "/attendance",
        element: <ViewAttendance />,
      },
    ],
  },
  {
    layout: "dashboard",
    title: "Admission",
    isAccordion: true,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Form Submissions",
        path: "/form-submissions",
        element: <AdmissionSubmission />,
      },
    ],
  },

  {
    layout: "dashboard",
    title: "Exam Management",
    isAccordion: true,
    pages: [],
  },
  {
    layout: "dashboard",
    title: "Fee Management",
    isAccordion: true,
    pages: [],
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
