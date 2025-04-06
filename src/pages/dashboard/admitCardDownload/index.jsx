import { Button, Input, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../../../configs/constOptions";
import { useGetClassesQuery } from "../../../redux/api/classApi";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export const AdmitCardDownload = () => {
  // const [open, setOpen] = React.useState(0);
  // const [selectedStudent, setSelectedStudent] = useState(null);
  // const { data: classes, isLoading, isFetching } = useGetClassesQuery();
  // const isLoadingState = isLoading || isFetching;
  // const downloadTriggered = useRef(false);
  // const [examName, setExamName] = useState("");
  // const [selectedClass, setSelectedClass] = useState(null);
  // const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // // Reset the download trigger when selected student changes
  // useEffect(() => {
  //   downloadTriggered.current = false;
  // }, [selectedStudent]);
  // console.log(selectedStudent);

  const [examName, setExamName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [classId, setClassId] = React.useState(null);
  const [error, setError] = React.useState("");
  const { data: classes } = useGetClassesQuery();
  const handleDownload = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        API_BASE_URL + "/admit-card/generate-admit-cards",
        {
          examName: examName.trim(),
          classId,
        },
        {
          responseType: "blob",
          validateStatus: (status) => status < 500,
        }
      );

      if (response.headers["content-type"] === "application/pdf") {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `admit-cards-${classId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        // Handle JSON errors
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result);
            setError(errorData.message || "Unknown error occurred");
          } catch {
            setError("Invalid server response");
          }
        };
        reader.readAsText(response.data);
      }
    } catch (error) {
      setError("Network error - please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="p-4">
      {/* <h2 className="text-3xl font-semibold">
        Preview and Download Admit Card
      </h2>
      <p className="text-gray-600 mt-2">
        Enter the exam name and select the class to download the admit card for
        the students. Click on the download button to generate the admit card.
      </p>
      <p className="my-4"> Exam Name: </p>
      <Input
        label="Exam Name"
        // className="py-4"
        placeholder="Enter exam name"
        onChange={(e) => setExamName(e.target.value)}
        value={examName}
      />
      <article className="mt-4">
        {isLoadingState && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        )}

        {classes?.length > 0 && (
          <div className="space-y-4">
            {classes.map((classItem) => (
              <Accordion
                key={classItem._id}
                open={open === classItem._id}
                icon={<Icon id={classItem._id} open={open} />}
              >
                <AccordionHeader onClick={() => handleOpen(classItem._id)}>
                  {classItem.name}
                </AccordionHeader>
                <AccordionBody>
                  {classItem.students.map((student) => (
                    <div
                      key={student._id}
                      className="flex justify-between items-center p-2"
                    >
                      <span>{student.name}</span>
                      <Button
                        color="teal"
                        variant="outlined"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setSelectedClass(classItem.name);
                          setSelectedStudent(student);
                        }}
                        disabled={!!selectedStudent}
                      >
                        <BiDownload />
                        {selectedStudent?._id === student._id
                          ? "Generating..."
                          : "Download"}
                      </Button>
                    </div>
                  ))}
                </AccordionBody>
              </Accordion>
            ))}
          </div>
        )}

        {selectedStudent && (
          <PDFDownloadLink
            document={
              <AdmitCard
                student={selectedStudent}
                examName={examName}
                className={selectedClass}
              />
            }
            fileName={`admit-card-${selectedStudent.studentId}.pdf`}
          >
            {({ loading, url }) => {
              if (!loading && url && !downloadTriggered.current) {
                downloadTriggered.current = true;
                const link = document.createElement("a");
                link.href = url;
                link.download = `admit-card-${selectedStudent.studentId}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // Use setTimeout to defer state update
                setTimeout(() => setSelectedStudent(null));
              }
              return null;
            }}
          </PDFDownloadLink>
        )}
      </article> */}
      <div className="p-4 space-y-4">
        <Input
          type="text"
          label="Exam Name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
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

        <a
          href={`${API_BASE_URL}/admit-card/generate-admit-cards?examName=${examName}&classId=${classId}`}
          target="_blank"
          rel="noreferrer"
          className={`${
            loading ? "pointer-events-none" : ""
          } flex mx-auto max-w-sm items-center justify-center mt-4`}
          disabled={loading || !examName || !classId} // Disable button if loading or no exam name or class ID
        >
          <Button className="w-full">Download Admit Cards (PDF)</Button>
        </a>
      </div>
    </section>
  );
};

export default AdmitCardDownload;
