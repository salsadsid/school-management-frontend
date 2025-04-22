import { Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import RenderData from "../../../components/RenderData";
import { useGetClassesQuery } from "../../../redux/api/classApi";
import { useGetAllStudentsQuery } from "../../../redux/api/studentApi";
import { DataTable } from "../admissionSubmission/DataTable/DataTable";
import { studentColumns } from "./columns";

export const Students = () => {
  //   console.log(data);
  const { data: classes, isLoading } = useGetClassesQuery();
  const [classId, setClassId] = useState(() => classes?.[0]?._id || null);
  const { data: students, ...studentsApiState } = useGetAllStudentsQuery({
    classId: classId ? classId : undefined,
  });

  const isLoadingState = isLoading || studentsApiState.isLoading;

  return (
    <div className="mx-auto">
      <div className="max-w-lg mx-auto my-6">
        {isLoadingState && <Loading />}
        {classes?.length > 0 && (
          <Select
            label="Class"
            value={classId}
            onChange={(e) => {
              setClassId(e);
            }}
          >
            {classes?.map((cls) => (
              <Option key={cls._id} value={cls._id}>
                {cls.name}
              </Option>
            ))}
          </Select>
        )}
      </div>
      <RenderData data={students} apiState={studentsApiState}>
        <DataTable columns={studentColumns} data={students} />
      </RenderData>
    </div>
  );
};

export default Students;
