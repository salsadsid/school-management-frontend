"use client";
import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@/app/MTWrapper";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiBars3,
  HiCommandLine,
  HiMiniRectangleStack,
  HiSquares2X2,
  HiUserCircle,
  HiXMark,
} from "react-icons/hi2";
function NavItem({ children }) {
  return (
    <li>
      <Typography
        as="a"
        href="#"
        variant="paragraph"
        color="blue-gray"
        className="text-blue-gray-700 flex items-center gap-2 font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}
export default function NavBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);
  return (
    <Navbar shadow={false} fullWidth className="border-0">
      <div className="container mx-auto flex items-center justify-between">
        <Typography color="blue-gray" className="text-lg font-bold">
          School Management
        </Typography>
        <ul className="ml-10 hidden items-center gap-6 lg:flex">
          <NavItem>
            <HiMiniRectangleStack className="h-5 w-5" />
            Pages
          </NavItem>
          <NavItem>
            <HiUserCircle className="h-5 w-5" />
            Account
          </NavItem>
          <NavItem>
            <HiSquares2X2 className="h-5 w-5" />
            Blocks
          </NavItem>
          <NavItem>
            <HiCommandLine className="h-5 w-5" />
            Docs
          </NavItem>
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <Link href="/login">
            <Button variant="text">Log in</Button>
          </Link>
          <Link href="/register">
            <Button color="gray">Sign up</Button>
          </Link>
        </div>
        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <HiXMark strokeWidth={2} className="h-6 w-6" />
          ) : (
            <HiBars3 strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            <NavItem>
              <HiMiniRectangleStack className="h-5 w-5" />
              Pages
            </NavItem>
            <NavItem>
              <HiUserCircle className="h-5 w-5" />
              Account
            </NavItem>
            <NavItem>
              <HiSquares2X2 className="h-5 w-5" />
              Blocks
            </NavItem>
            <NavItem>
              <HiCommandLine className="h-5 w-5" />
              Docs
            </NavItem>
          </ul>
          <div className="mt-6 mb-4 flex items-center gap-4">
            <Button variant="text">Log in</Button>
            <Button color="gray">buy now</Button>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
