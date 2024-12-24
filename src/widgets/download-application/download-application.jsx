import { Button } from "@material-tailwind/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { BiDownload } from "react-icons/bi";
import { useGetAnAdmissionInfoQuery } from "../../redux/api/admissionApi";
import RenderApplicationFormPdf from "../pdf-render/application-form-render";

export default function DownloadApplication({ query }) {
  const {
    data: applicationData,
    isLoading,
    isSuccess,
  } = useGetAnAdmissionInfoQuery({ id: query }, { skip: !query });
  return (
    <div>
      {isSuccess && applicationData && (
        <div className="flex mt-6 flex-wrap items-center justify-center gap-4">
          <div className="bg-teal-500 text-white py-2 px-4 rounded-full  inline-block">
            <p className="text-sm font-semibold">
              Application ID: {applicationData?.applicationId}
            </p>
          </div>
          <PDFDownloadLink
            document={<RenderApplicationFormPdf data={applicationData} />}
            fileName={`application-${applicationData?.studentName}-${applicationData.applicationId}.pdf`}
          >
            {({ loading }) =>
              loading || isLoading ? (
                <Button color="teal" variant="outlined" loading disabled>
                  Loading Application...
                </Button>
              ) : (
                <Button
                  color="teal"
                  variant="outlined"
                  className="flex text-sm items-center gap-2"
                >
                  <BiDownload />
                  Download Application
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
      {isLoading && (
        <div className="flex mt-6 flex-wrap items-center justify-center gap-4">
          <Button color="teal" variant="outlined" loading disabled>
            Loading Application...
          </Button>
        </div>
      )}
      {!applicationData && !isLoading && (
        <p className=" mt-6 text-red-400 text-center">
          No Application with ID:{" "}
          <span className="p-1 bg-red-50 rounded font-bold">{query}</span>{" "}
          Please check the Application ID and try again.
        </p>
      )}
    </div>
  );
}
