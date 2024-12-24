import { Button } from "@material-tailwind/react";
import React from "react";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useManageQueryParams from "../../hooks/useManageQueryParams";
import DownloadApplication from "../../widgets/download-application/download-application";

export default function SuccessComponent({
  successMessage = "Thank you for your submission!",
  backButton = true,
  backButtonText = "Back to Home",
  backTo = "/", // default to home
}) {
  const { readQueryParam } = useManageQueryParams();
  const query = readQueryParam("applicationId");

  return (
    <main className="flex flex-col items-center justify-center ">
      <img src="assets/success_tick.gif" alt="Success" className="w-[500px]" />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <p className="text-2xl font-bold text-gray-800">{successMessage}</p>
      </div>

      {query && <DownloadApplication query={query} />}

      {backButton && (
        <Link to={backTo}>
          <Button
            variant="text"
            size="lg"
            className="flex normal-case mt-6 bg-blue-gray-50  items-center gap-2"
          >
            <FaLeftLong />
            {backButtonText}
          </Button>
        </Link>
      )}
    </main>
  );
}
