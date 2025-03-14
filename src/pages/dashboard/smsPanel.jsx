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
      const response = await axios.get(
        "http://localhost:3000/api/v1/sms/transactions",
        {
          params: {
            start_time: formatDate(startTime),
            end_time: formatDate(endTime),
            page_size: pageSize,
          },
        }
      );
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
      await axios.post("http://localhost:3000/api/v1/sms/send-single", {
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
      await axios.post("http://localhost:3000/api/v1/sms/send-bulk", {
        transactionIds: transactions.map((t) => t.transactionId),
      });
      setTransactions(transactions.map((t) => ({ ...t, processed: true })));
      setSuccess("Bulk SMS sent successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Bulk send failed");
    }
  };

  // Test SMS handler
  const sendTestSMS = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/sms/test", {
        number: testNumber,
        message: testMessage,
      });
      setSuccess("Test SMS sent successfully!");
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
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-max">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student ID</th>
                <th>Punch Time</th>

                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td>{transaction.empCode}</td>
                  <td>{formatDate(transaction.punchTime)}</td>
                  <td>{transaction.rawData.verify_type_display}</td>
                  <td>
                    <span
                      className={`badge ${
                        transaction.processed
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      } px-3 py-1 rounded-full`}
                    >
                      {transaction.processed ? "Sent" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      color={transaction.processed ? "gray" : "blue"}
                      disabled={transaction.processed}
                      onClick={() =>
                        sendIndividualSMS(transaction.transactionId)
                      }
                    >
                      {transaction.processed ? "Sent ✓" : "Send SMS"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        <div className="mt-6 flex justify-end">
          <Button
            color="green"
            onClick={sendBulkSMS}
            disabled={
              transactions.length === 0 ||
              transactions.every((t) => t.processed)
            }
          >
            Send Bulk SMS ({transactions.filter((t) => !t.processed).length}{" "}
            pending)
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
