import { Button } from "@material-tailwind/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { BiDownload } from "react-icons/bi";
import { FaLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useManageQueryParams from "../../hooks/useManageQueryParams";
import { useGetAnAdmissionInfoQuery } from "../../redux/api/admissionApi";
import RenderApplicationFormPdf from "../../widgets/pdf-render/application-form-render";

export default function SuccessComponent({
  successMessage = "Thank you for your submission!",
  backButton = true,
  backButtonText = "Back to Home",
  backTo = "/", // default to home
}) {
  const { readQueryParam } = useManageQueryParams();
  const query = readQueryParam("applicationId");
  const {
    data: applicationData,
    isLoading,
    isSuccess,
  } = useGetAnAdmissionInfoQuery({ id: query }, { skip: !query });

  console.log(applicationData);
  return (
    <main className="flex flex-col items-center justify-center ">
      <img src="assets/success_tick.gif" alt="Success" className="w-[500px]" />
      <div className="flex flex-wrap items-center justify-center gap-4">
        <p className="text-2xl font-bold text-gray-800">{successMessage}</p>
      </div>

      {isSuccess && (
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
                  Loading Document...
                </Button>
              ) : (
                <Button
                  color="teal"
                  variant="outlined"
                  className="flex text-sm items-center gap-2"
                >
                  <BiDownload />
                  Download
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
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
