import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { CiExport } from "react-icons/ci";
import RenderData from "../../../components/RenderData";
import { useGetAllAdmissionInfoQuery } from "../../../redux/api/admissionApi";
import { DataTable } from "./DataTable/DataTable";
import { columns } from "./DataTable/columns";
import { admissionDataJsonToCSV } from "./utils";

export const AdmissionSubmission = () => {
  const { data: admissionInfo, ...admissionInfoApiState } =
    useGetAllAdmissionInfoQuery();
  const [downloadLoading, setDownloadLoading] = React.useState(false);
  const handleExportData = () => {
    setDownloadLoading(true);
    let csvData = admissionDataJsonToCSV(admissionInfo);
    let blob = new Blob([csvData], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `admission-submission-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    setDownloadLoading(false);
  };
  return (
    <div className="mx-auto max-w-full min-h-[82vh] px-4 md:px-4 md:py-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" className="">
          Admission Submissions
        </Typography>

        <Button
          className="flex items-center gap-2"
          size="sm"
          onClick={handleExportData}
          color="teal"
          loading={downloadLoading}
          disabled={!admissionInfo?.length} // disable button if there is no data
        >
          <CiExport size={22} /> Export ALl
        </Button>
      </div>
      <RenderData data={admissionInfo} apiState={admissionInfoApiState}>
        <DataTable columns={columns} data={admissionInfo} />
      </RenderData>
    </div>
  );
};

export default AdmissionSubmission;
