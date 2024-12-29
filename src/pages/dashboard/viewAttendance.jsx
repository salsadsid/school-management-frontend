import { Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PageViewRestriction from "../../components/Alerts/PageViewRestriction";
import { restrictedRoutes } from "../../configs/systemConfiguration";
import { useGetAttendancesQuery } from "../../redux/api/attendanceApi";
import { useGetClassesQuery } from "../../redux/api/classApi";
import { useGetSectionsQuery } from "../../redux/api/sectionApi";

export const ViewAttendance = () => {
  const teacherId = useSelector((state) => state.auth.user_info._id);
  const [classId, setClassId] = useState("");
  const [section, setSection] = useState("");
  const [date, setDate] = useState("");
  //   const [attendanceRecords, setAttendanceRecords] = useState([]);

  const { data: classes, isLoading } = useGetClassesQuery();
  const { data: sections, isLoading: isSectionsLoading } =
    useGetSectionsQuery();
  const { data: attendance, isLoading: isAttendancesLoading } =
    useGetAttendancesQuery(
      {
        classId,
        section,
        date,
      },
      {
        skip: !classId || !section || !date,
      }
    );

  const attendanceRecords = attendance?.data[0]?.attendanceRecords || [];
  const isLoadingState = isLoading || isSectionsLoading || isAttendancesLoading;
  console.log(attendanceRecords);
  console.log(attendance);

  if (restrictedRoutes.includes(location.pathname)) {
    return <PageViewRestriction />;
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-12 md:py-12 min-h-[82vh]">
      <div>
        {isLoadingState ? (
          <div className="p-4 text-center font-bold text-2xl">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div>
              {classes?.length > 0 && (
                <Select
                  label="Class"
                  className="mb-6"
                  variant="outlined"
                  value={classId || ""}
                  onChange={(value) => {
                    setClassId(value);
                  }}
                >
                  {classes?.map((cls) => (
                    <Option key={cls._id} value={cls._id}>
                      {cls.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
            <div>
              {sections?.length > 0 && (
                <Select
                  label="Section"
                  className="mb-6"
                  variant="outlined"
                  value={section || ""}
                  onChange={(value) => {
                    setSection(value);
                  }}
                >
                  {sections?.map((cls) => (
                    <Option key={cls._id} value={cls._id}>
                      {cls.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
            <div>
              <Input
                type="date"
                label="Date"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Attendance Records */}
        {attendanceRecords?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((attendance, index) => (
                  <tr
                    key={attendance._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-3 border-b text-gray-600">
                      {attendance.student?.rollNumber || "-"}
                    </td>
                    <td className="px-6 py-3 border-b text-gray-600">
                      {attendance.student?.name || "Unknown"}
                    </td>
                    <td
                      className={`px-6 py-3 border-b font-semibold ${
                        attendance.status === "present"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {attendance.status || "N/A"}
                    </td>
                    <td className="px-6 py-3 border-b text-gray-600">
                      {attendance.remarks || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            No attendance records found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;
