import {
  Alert,
  Button,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../../configs/constOptions";
import { useGetClassesQuery } from "../../redux/api/classApi";
import { createPromiseToast } from "../../utils/promiseToast";

// Mock data - replace with actual class data from your backend
const mockClasses = [
  { id: "1", name: "Class 10A" },
  { id: "2", name: "Class 10B" },
  { id: "3", name: "Class 11A" },
  { id: "4", name: "Class 11B" },
];

export const SMSNoticeSender = () => {
  const { data: classes, isLoading: isClassLoading } = useGetClassesQuery();
  //   console.log(classes);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const totalStudents =
    classes?.length > 0
      ? classes
          .filter((cls) => selectedClasses.includes(cls._id))
          .reduce((acc, cls) => acc + cls.students.length, 0)
      : 0;
  const handleClassChange = (classId) => {
    setSelectedClasses((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();

    const confirmation = window.confirm(
      `Are you sure you want to send SMS to ${totalStudents} students?`
    );
    if (!confirmation) {
      setIsLoading(false);
      return;
    }
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(API_BASE_URL + "/sms/send-multi", {
        classIds: selectedClasses,
        message: message,
      });
      console.log(response.data);
      if (response.data.report.apiResponse.statusCode !== "200") {
        errorToast({
          message: response.data.report.apiResponse.responseResult,
        });
      } else {
        successToast({ message: "SMS sent successfully." });
      }
    } catch (error) {
      console.error("Error sending SMS:", error);
      errorToast({ message: "Failed to send SMS. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Typography variant="h2" className="mb-6 text-center">
        SMS Notice Sender
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border rounded-lg p-4">
          <Typography variant="h5" className="mb-4">
            Select Classes
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {isClassLoading && <div>Loading...</div>}
            {classes?.length > 0 &&
              classes.map((cls) => (
                <Checkbox
                  key={cls._id}
                  label={cls.name}
                  checked={selectedClasses.includes(cls._id)}
                  onChange={() => handleClassChange(cls._id)}
                  crossOrigin="anonymous" // Required prop for Checkbox
                />
              ))}
          </div>
          <Alert color="blue" className="mt-4">
            Total Students: {totalStudents}
          </Alert>
        </div>

        <div className="space-y-4">
          <Typography variant="h5">Message Content</Typography>
          <Textarea
            label="SMS Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            placeholder={`\nDear Parents,\nthis is to inform you that...\nThank you.`}
          />
          <Typography variant="small" className="text-gray-600">
            Character count: {message.length} (Max 160)
          </Typography>
          <Input
            type="text"
            label="Sender ID"
            onChange={(e) => setSenderId(e.target.value)}
            value={senderId}
            required
          />
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={
            isLoading ||
            selectedClasses.length === 0 ||
            message.length === 0 ||
            senderId !== "HAKACADEMY"
          }
        >
          {isLoading ? "Sending..." : "Send SMS Notices"}
        </Button>
      </form>
    </div>
  );
};

export default SMSNoticeSender;
