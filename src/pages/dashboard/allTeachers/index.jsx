import { Typography } from "@material-tailwind/react";
import React from "react";
import RenderData from "../../../components/RenderData";
import { useGetTeachersQuery } from "../../../redux/api/teacherApi";
import { DataTable } from "../admissionSubmission/DataTable/DataTable";
import { teacherColumns } from "./columns";

export const AllTeachers = () => {
  const { data: teachers, ...teachersApiState } = useGetTeachersQuery();
  console.log(teachers);
  return (
    <div className="mx-auto max-w-full min-h-[82vh] px-4 md:px-4 md:py-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" className="">
          All Teachers
        </Typography>
      </div>
      <RenderData data={teachers} apiState={teachersApiState}>
        {teachers && (
          <DataTable
            gFilter={true}
            cFilter={false}
            columns={teacherColumns}
            data={teachers}
          />
        )}
      </RenderData>
    </div>
  );
};

export default AllTeachers;
