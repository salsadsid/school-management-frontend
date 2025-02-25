import RenderData from "../../../components/RenderData";
import { useGetAllStudentsQuery } from "../../../redux/api/studentApi";
import { DataTable } from "../admissionSubmission/DataTable/DataTable";
import { studentColumns } from "./columns";

export const Students = () => {
  const { data: students, ...studentsApiState } = useGetAllStudentsQuery();
  //   console.log(data);
  return (
    <div className="mx-auto ">
      <RenderData data={students} apiState={studentsApiState}>
        <DataTable columns={studentColumns} data={students} />
      </RenderData>
    </div>
  );
};

export default Students;
