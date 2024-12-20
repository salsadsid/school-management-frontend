import { Button } from "@material-tailwind/react";
import React from "react";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SuccessComponent({
  successMessage = "Thank you for your submission!",
  backButton = true,
  backButtonText = "Back to Home",
  backTo = "/", // default to home
}) {
  return (
    <main className="flex flex-col items-center justify-center ">
      <img src="assets/success_tick.gif" alt="Success" className="w-[500px]" />
      <p className="text-2xl font-bold text-gray-800">{successMessage}</p>
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
