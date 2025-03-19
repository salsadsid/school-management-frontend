import { SignIn, SignUp } from "@/pages/auth";
import {
  AddTeacher,
  AdmissionSubmission,
  AllTeachers,
  Attendance,
  Classes,
  Home,
  MyProfile,
  NewClass,
  NewSection,
  NewStudent,
  SMSNoticeSender,
  SMSPanel,
  Students,
  ViewAttendance,
} from "@/pages/dashboard";
import {
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  HomeIcon,
  RectangleStackIcon,
  ServerStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { MdSms } from "react-icons/md";
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
        roles: ["admin", "moderator", "teacher", "student"], // Accessible by all
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "My Profile",
        path: "/profile",
        element: <MyProfile />,
        roles: ["admin", "moderator", "teacher", "student"], // Accessible by all
        hidden: true,
      },
    ],
  },
  {
    layout: "dashboard",
    title: "Teacher Management",
    isAccordion: true,
    icon: <UserIcon {...icon} />,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "All Teachers",
        path: "/teachers",
        element: <AllTeachers />,
        roles: ["admin", "moderator"],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Add Teacher",
        path: "/teachers-new",
        element: <AddTeacher />,
        roles: ["admin", "moderator"],
      },
    ],
  },
  {
    layout: "dashboard",
    title: "Class Management",
    isAccordion: true,
    icon: <ClipboardDocumentCheckIcon {...icon} />,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "All Classes",
        path: "/classes",
        element: <Classes />,
        roles: ["admin", "moderator"],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Add Class",
        path: "/classes-new",
        element: <NewClass />,
        roles: ["admin", "moderator"],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Add Section",
        path: "/section-new",
        element: <NewSection />,
        roles: ["admin", "moderator"],
      },
    ],
  },

  {
    layout: "dashboard",
    title: "Students Management",
    isAccordion: true,
    icon: <UserGroupIcon {...icon} />,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "All Students",
        path: "/students",
        element: <Students />,
        roles: ["admin", "moderator"],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "New Student",
        path: "/student-new",
        element: <NewStudent />,
        roles: ["admin", "moderator"],
      },
    ],
  },
  {
    layout: "dashboard",
    title: "SMS Management",
    isAccordion: true,
    icon: <MdSms {...icon} />,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "SMS Notice Sender",
        path: "/sms-notice-sender",
        element: <SMSNoticeSender />,
        roles: ["admin", "moderator"],
      },
    ],
  },
  {
    layout: "dashboard",
    title: "Admission Management",
    isAccordion: true,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "All Applications",
        path: "/applications",
        element: <AdmissionSubmission />,
        roles: ["admin"],
      },
    ],
  },

  {
    layout: "dashboard",
    title: "Attendance Management",
    isAccordion: true,
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Attendance",
        path: "/attendance",
        element: <Attendance />,
        roles: ["admin"],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "View Attendance",
        path: "/view-attendance",
        element: <ViewAttendance />,
        roles: ["admin"],
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "SMS Panel",
        path: "/sms-panel",
        element: <SMSPanel />,
        roles: ["admin"],
      },
    ],
  },
];

export const baseRoutes = [
  {
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Sign In",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Sign Up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
