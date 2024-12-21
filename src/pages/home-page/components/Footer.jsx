import { Typography } from "@material-tailwind/react";
import React from "react";
import { useServerConeectionCheckQuery } from "../../../redux/api/serverCheckApi";

const Footer = () => {
  const { data, isError, isLoading } = useServerConeectionCheckQuery();
  return (
    <footer className="bg-teal-500 relative text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <Typography className="text-lg font-bold mb-2">
          H.A.K Academy
        </Typography>
        <Typography className="mb-4">
          Empowering the future of education | Estd: 2003
        </Typography>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/hak.academy/"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-gray-200"
          >
            Facebook Page
          </a>
          <a href="#" className="text-white hover:text-gray-200">
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="absolute bottom-0  right-1 text-xs text-gray-400">
        {isLoading
          ? "Checking server status..."
          : isError
          ? "server is down"
          : data?.status === "ok"
          ? "server is up"
          : "server is down"}
        , salsadsid
      </div>
    </footer>
  );
};

export default Footer;
