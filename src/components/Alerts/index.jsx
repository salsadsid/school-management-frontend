import { Alert } from "@material-tailwind/react";
import React from "react";

export default function AlertMessage({ icon, children, className, mode }) {
  return (
    <Alert icon={icon} className={className} mode={mode}>
      {children}
    </Alert>
  );
}
