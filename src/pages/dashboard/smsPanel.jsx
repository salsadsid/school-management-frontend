// components/SMSDashboard.jsx
import {
  Alert,
  Button,
  Card,
  Input,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_NODE_ENV_DEVELOPMENT
    : import.meta.env.VITE_NODE_ENV_PRODUCTION;

export const SMSPanel = () => {
  const [transactions, setTransactions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [testNumber, setTestNumber] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(1000);
  const [apiStatus, setApiStatus] = useState("");

  console.log(startTime, endTime, testNumber, testMessage);
  // Date formatting helper
  const formatDate = (dateString) => {
    return dateString.replace("T", " ").substring(0, 19);
  };

  // Fetch transactions with error handling
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL + "/sms/transactions", {
        params: {
          start_time: formatDate(startTime),
          end_time: formatDate(endTime),
          page_size: pageSize,
        },
      });
      setTransactions(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  // Individual SMS handler
  const sendIndividualSMS = async (transactionId) => {
    try {
      await axios.post(API_BASE_URL, +"/sms/send-single", {
        transactionId,
      });
      setTransactions(
        transactions.map((t) =>
          t.id === transactionId ? { ...t, processed: true } : t
        )
      );
      setSuccess("SMS sent successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send SMS");
    }
  };

  // Bulk SMS handler
  const sendBulkSMS = async () => {
    try {
      await axios.post(API_BASE_URL + "/sms/send-bulk", {
        transactionIds: transactions.map((t) => t.transactionId),
      });
      setTransactions(transactions.map((t) => ({ ...t, processed: true })));
      setSuccess("Bulk SMS sent successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Bulk send failed");
    }
  };

  const previewBulkSMS = async () => {
    try {
      await axios.get(API_BASE_URL + "/sms/preview");
      setSuccess("preview fetched successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "preview failed");
    }
  };

  // Test SMS handler
  const sendTestSMS = async () => {
    try {
      const response = await axios.post(API_BASE_URL + "/sms/test", {
        number: testNumber,
        message: testMessage,
      });
      setSuccess(response.response.responseResult);
      setTestNumber("");
      setTestMessage("");
    } catch (err) {
      setError(err.response?.data?.error || "Test SMS failed");
    }
  };
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setApiStatus(`Last update: ${new Date().toLocaleTimeString()}`);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Card className="mb-6 p-6 shadow-lg">
        <Typography variant="h3" color="blue-gray" className="mb-6">
          BioTime Transaction Control
        </Typography>

        {/* Time Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Input
            type="datetime-local"
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="datetime-local"
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <Input
            type="number"
            label="Page Size"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          />
          <Button
            onClick={fetchTransactions}
            disabled={loading}
            className="flex items-center justify-center"
          >
            {loading ? <Spinner className="h-5 w-5" /> : "Fetch Transactions"}
          </Button>
        </div>

        {/* Status Bar */}
        <div className="mb-4 flex justify-between items-center">
          <Typography color="gray" className="font-medium">
            {apiStatus}
          </Typography>
          <Typography color="gray" className="text-sm">
            Server Time: {new Date().toLocaleTimeString()}
          </Typography>
        </div>

        {/* Error/Success Alerts */}
        {error && (
          <Alert color="red" className="mb-4" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert color="green" className="mb-4" onClose={() => setSuccess("")}>
            {success}
          </Alert>
        )}
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
            <table className="min-w-max w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Punch Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verify Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.empCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(transaction.punchTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.rawData.verify_type_display}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.processed
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {transaction.processed ? "Sent" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`px-4 py-2 text-xs rounded-md font-medium ${
                          transaction.processed
                            ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        } transition-colors duration-200`}
                        disabled={transaction.processed}
                        onClick={() =>
                          sendIndividualSMS(transaction.transactionId)
                        }
                      >
                        {transaction.processed ? "Sent ✓" : "Send SMS"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mt-6 flex justify-end">
          <Button
            color="green"
            onClick={sendBulkSMS}
            // disabled={
            //   transactions.length === 0 ||
            //   transactions.every((t) => t.processed)
            // }
          >
            Send Bulk SMS
            {/* ({transactions.filter((t) => !t.processed).length}{" "}
            pending) */}
          </Button>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            color="green"
            onClick={previewBulkSMS}
            // disabled={
            //   transactions.length === 0 ||
            //   transactions.every((t) => t.processed)
            // }
          >
            Preview Bulk SMS
            {/* ({transactions.filter((t) => !t.processed).length}{" "}
            pending) */}
          </Button>
        </div>
        {/* Test SMS Panel */}
        <Card className="mt-8 p-6 shadow-md">
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Test SMS Panel
          </Typography>
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Phone Number"
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
            />
            <Textarea
              label="Message"
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              rows={4}
            />
            <Button color="amber" onClick={sendTestSMS}>
              Send Test SMS
            </Button>
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default SMSPanel;
