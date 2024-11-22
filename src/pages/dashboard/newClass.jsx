import { Card } from "@material-tailwind/react";
import React from "react";
import NewClassForm from "../../components/Forms/NewClassForm";

export const NewClass = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-12 md:py-12">
      <Card className="overflow-hidden p-4 xl:col-span-2 border border-blue-gray-100 shadow-sm">
        <NewClassForm />
      </Card>
    </div>
  );
};

export default NewClass;
