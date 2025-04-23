import {
  Avatar,
  Button,
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isSystem } from "../../configs/systemConfiguration";
import { logout } from "../../redux/slices/authSlice";

export function NavbarMain() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen((cur) => !cur);
  const { user_info } = useSelector((state) => state.auth);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <Navbar
      className="bg-blue-900/90 backdrop-blur-sm border-b border-blue-800/50"
      fullWidth
      shadow={false}
    >
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="mr-4 cursor-pointer text-lg font-bold hover:text-amber-300 transition-colors">
            {isSystem && "School Management System"}
            {!isSystem && (
              <span className="flex items-center gap-2">
                <img
                  src="/assets/school_logo.png"
                  alt="School Logo"
                  className="h-12 w-12 rounded-full bg-white p-1"
                />
                H. A. K. ACADEMY
              </span>
            )}
          </Typography>
        </Link>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="download-application">
            <Button
              color="amber"
              variant="gradient"
              className="hidden lg:inline-block"
            >
              Download Application
            </Button>
          </Link>

          {user_info && (
            <div className="hidden lg:block">
              <Link to="/dashboard/">
                <Typography className="mr-4 cursor-pointer font-medium hover:text-amber-300 transition-colors">
                  Dashboard
                </Typography>
              </Link>
            </div>
          )}

          {!user_info && (
            <>
              <Link to="auth/sign-in">
                <Button
                  color="amber"
                  variant="outlined"
                  className="hidden lg:inline-block border-amber-500 text-white hover:bg-amber-500/20"
                >
                  Login
                </Button>
              </Link>
              <Link to="auth/sign-up">
                <Button
                  color="amber"
                  variant="gradient"
                  className="hidden lg:inline-block"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}

          {user_info && (
            <Menu placement="bottom-end">
              <MenuHandler>
                <Avatar
                  variant="circular"
                  alt="user avatar"
                  className="cursor-pointer border-2 border-amber-400 hover:border-amber-300"
                  src="/assets/school_avator.png"
                />
              </MenuHandler>
              <MenuList className="bg-blue-900/90 backdrop-blur-sm border border-blue-800/50">
                <p className="flex items-center gap-2 pb-4 pt-2 justify-center text-white">
                  Hello, {user_info?.email?.split("@")[0]}
                </p>
                <MenuItem className="flex items-center gap-2 hover:bg-blue-800/50">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="text-amber-400"
                  >
                    {/* ... existing path ... */}
                  </svg>
                  <Link to="/dashboard/profile">
                    <Typography
                      variant="small"
                      className="font-medium text-white"
                    >
                      My Profile
                    </Typography>
                  </Link>
                </MenuItem>

                <hr className="my-2 border-blue-800/50" />
                <MenuItem
                  className="flex items-center gap-2 hover:bg-blue-800/50"
                  onClick={() => dispatch(logout())}
                >
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="currentColor"
                    className="text-amber-400"
                  >
                    {/* ... existing path ... */}
                  </svg>
                  <Typography
                    variant="small"
                    className="font-medium text-white"
                  >
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>

        <IconButton
          size="sm"
          variant="text"
          className="ml-auto text-white hover:bg-blue-800/50 lg:hidden"
          onClick={handleOpen}
        >
          {open ? (
            <FaXmark className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </IconButton>
      </div>

      <Collapse open={open}>
        <div className="mt-2 rounded-xl bg-blue-900/90 backdrop-blur-sm py-4 px-2 space-y-4 border border-blue-800/50">
          <Link to="/dashboard/">
            <Typography className="text-white hover:text-amber-300 px-4 py-2">
              Dashboard
            </Typography>
          </Link>
          <Link to="/download-application">
            <Typography className="text-white hover:text-amber-300 px-4 py-2">
              Download Application
            </Typography>
          </Link>

          {!user_info && (
            <div className="px-4 space-y-2">
              <Link to="auth/sign-in" className="block">
                <Button color="amber" variant="gradient" className="w-full">
                  Sign in
                </Button>
              </Link>
            </div>
          )}

          {user_info && (
            <div className="px-4 space-y-2">
              <p className="text-white font-semibold mt-4">
                Hello, {user_info.email?.split("@")[0]}
              </p>
              <Button
                color="amber"
                variant="gradient"
                onClick={() => dispatch(logout())}
                className="w-full"
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarMain;
