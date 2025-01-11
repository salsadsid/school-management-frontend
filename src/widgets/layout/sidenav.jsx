import { setOpenSidenav, useMaterialTailwindController } from "@/context";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PresentationChartBarIcon } from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  isSystem,
  schoolNameWithLogo,
} from "../../configs/systemConfiguration";
export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { user_info } = useSelector((state) => state.auth);
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const filteredRoutes = routes
    .map((section) => ({
      ...section,
      pages: section.pages.filter((page) =>
        page.roles.includes(user_info.role)
      ),
    }))
    .filter((section) => section.pages.length > 0);
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          // color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 " />
        </IconButton>
      </div>
      <div className="m-4">
        <List>
          {filteredRoutes
            .filter(({ layout }) => layout !== "auth")
            .map(({ layout, title, pages, isAccordion }, key) => (
              <div key={key}>
                {isAccordion ? (
                  <Accordion
                    open={open === key}
                    icon={
                      <ChevronDownIcon strokeWidth={3} className="h-3 w-3" />
                    }
                    key={key}
                  >
                    <ListItem className="p-0" selected={open === 1}>
                      <AccordionHeader
                        onClick={() => handleOpen(key)}
                        className={`border-b-0 p-3 ${
                          open === key ? "bg-teal-50" : ""
                        }`}
                      >
                        <ListItemPrefix>
                          <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="mr-auto text-sm font-normal"
                        >
                          {title}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                      <ul>
                        {pages
                          .filter(({ hidden }) => !hidden)
                          .map(({ icon, name, path }) => (
                            <li key={name}>
                              <NavLink to={`/${layout}${path}`}>
                                {({ isActive }) => (
                                  <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={
                                      isActive
                                        ? sidenavColor
                                        : sidenavType === "dark"
                                        ? "white"
                                        : "blue-gray"
                                    }
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                  >
                                    {icon}
                                    <Typography
                                      color="inherit"
                                      className="font-medium text-sm capitalize"
                                    >
                                      {name}
                                    </Typography>
                                  </Button>
                                )}
                              </NavLink>
                            </li>
                          ))}
                      </ul>
                    </AccordionBody>
                  </Accordion>
                ) : (
                  <ul key={key} className="mb-4 flex flex-col gap-1">
                    {title && (
                      <li className="mx-3.5 mt-4 mb-2">
                        <Typography
                          variant="small"
                          color={sidenavType === "dark" ? "white" : "blue-gray"}
                          className="font-black uppercase opacity-75"
                        >
                          {title}
                        </Typography>
                      </li>
                    )}
                    {pages
                      .filter(({ hidden }) => !hidden)
                      .map(({ icon, name, path }) => (
                        <li key={name}>
                          <NavLink to={`/${layout}${path}`}>
                            {({ isActive }) => (
                              <Button
                                variant={isActive ? "gradient" : "text"}
                                color={
                                  isActive
                                    ? sidenavColor
                                    : sidenavType === "dark"
                                    ? "white"
                                    : "blue-gray"
                                }
                                className="flex items-center gap-4 px-4 capitalize"
                                fullWidth
                              >
                                {icon}
                                <Typography
                                  color="inherit"
                                  className="font-medium capitalize"
                                >
                                  {name}
                                </Typography>
                              </Button>
                            )}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </List>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: isSystem ? "School Management" : schoolNameWithLogo,
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
