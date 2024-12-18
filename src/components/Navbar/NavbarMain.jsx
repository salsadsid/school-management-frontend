import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

function NavItem({ label, to }) {
  return (
    <Link to={to}>
      <Typography as="li" color="blue-gray" className="p-1 font-medium">
        {label}
      </Typography>
    </Link>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <Link to="/dashboard">
        <NavItem label="About Us" />
      </Link>
      <NavItem label="Pricing" />
      <NavItem label="Contact Us" />
    </ul>
  );
}

export function NavbarMain() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <Navbar color="amber" fullWidth>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            color="blue-gray"
            className="mr-4 cursor-pointer text-lg font-bold"
          >
            School Management
          </Typography>
        </Link>
        <div className="hidden lg:block">
          <Link to="/dashboard">
            <Typography color="blue-gray" className="mr-4 cursor-pointer">
              Dashboard
            </Typography>
          </Link>
        </div>
        <Link to="auth/sign-in">
          <Button color="gray" className="hidden lg:inline-block">
            Login
          </Button>
        </Link>
        <Link to="auth/sign-up">
          <Button color="gray" className="hidden lg:inline-block">
            Sign Up
          </Button>
        </Link>

        <Button
          color="gray"
          onClick={() => dispatch(logout())}
          className="hidden lg:inline-block"
        >
          Log out
        </Button>

        <IconButton
          size="sm"
          variant="text"
          color="blue-gray"
          onClick={handleOpen}
          className="ml-auto inline-block text-blue-gray-900 lg:hidden"
        >
          {open ? (
            <FaXmark className="h-6 w-6" strokeWidth={2} />
          ) : (
            <FaBars className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="mt-2 rounded-xl bg-white py-2">
          <NavList />
          <Button className="mb-2" fullWidth>
            Sign in
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarMain;
