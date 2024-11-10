import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMain from "../../components/Navbar/NavbarMain";

const MainLayout = () => {
  return (
    <div>
      <NavbarMain />
      <Outlet />
    </div>
  );
};

export default MainLayout;
