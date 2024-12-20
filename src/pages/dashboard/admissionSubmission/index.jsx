import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { CiExport } from "react-icons/ci";
import { useGetAllAdmissionInfoQuery } from "../../../redux/api/admissionApi";
import { DataTable } from "./DataTable/DataTable";
import { columns } from "./DataTable/columns";
import TableSkeleton from "./components/TableSkeleton";
import { admissionDataJsonToCSV } from "./utils";

export const AdmissionSubmission = () => {
  const {
    data: admissionInfo,
    isLoading,
    error,
  } = useGetAllAdmissionInfoQuery();
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
          disabled={isLoading || !admissionInfo?.length || error} // disable button if there is no data
        >
          <CiExport size={22} /> Export ALl
        </Button>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : admissionInfo?.length ? (
        <DataTable columns={columns} data={admissionInfo} />
      ) : (
        <Typography color="red" className="text-center">
          No admission submission data found
        </Typography>
      )}
    </div>
  );
};

export default AdmissionSubmission;
