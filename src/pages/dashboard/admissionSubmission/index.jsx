import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { CiExport } from "react-icons/ci";
import { useGetAllAdmissionInfoQuery } from "../../../redux/api/admissionApi";
import { DataTable } from "./DataTable/DataTable";
import { columns } from "./DataTable/columns";
import { websiteDataJsonToCSV } from "./utils";

export const AdmissionSubmission = () => {
  const {
    data: admissionInfo,
    isLoading,
    error,
  } = useGetAllAdmissionInfoQuery();

  const handleExportData = () => {
    let csvData = websiteDataJsonToCSV(admissionInfo);
    let blob = new Blob([csvData], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `admission-submission-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
  };
  return (
    <div className="mx-auto max-w-full px-4 md:px-4 md:py-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" className="">
          Admission Submissions
        </Typography>

        <Button
          className="flex items-center gap-2"
          size="sm"
          onClick={handleExportData}
          color="teal"
          disabled={isLoading || !admissionInfo?.length || error} // disable button if there is no data
        >
          <CiExport size={22} /> Export
        </Button>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        admissionInfo?.length && (
          <DataTable
            columns={columns}
            data={admissionInfo}
            handleNext={"end"}
            handlePrevious={"end"}
          />
        )
      )}
    </div>
  );
};

export default AdmissionSubmission;
