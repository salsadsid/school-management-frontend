import { Input, Option, Radio, Select } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageViewRestriction from "../../components/Alerts/PageViewRestriction";
import { restrictedRoutes } from "../../configs/systemConfiguration";
import useManageQueryParams from "../../hooks/useManageQueryParams";
import { useCreateAttendanceMutation } from "../../redux/api/attendanceApi";
import { useGetClassesQuery } from "../../redux/api/classApi";
import { useGetSectionsQuery } from "../../redux/api/sectionApi";
import { useGetAllStudentsQuery } from "../../redux/api/studentApi";
import {
  resetAttendance,
  setAttendance,
  setClass,
  setDate,
  setSection,
} from "../../redux/slices/attendanceSlice";
import { createPromiseToast } from "../../utils/promiseToast";

export const Attendance = () => {
  const dispatch = useDispatch();
  const { updateQueryParam } = useManageQueryParams();
  const teacherId = useSelector((state) => state.auth.user_info._id);
  const { classId, section, date, attendance } = useSelector(
    (state) => state.attendance
  );

  const { data: classes, isLoading } = useGetClassesQuery();
  const { data: sections, isLoading: isSectionsLoading } =
    useGetSectionsQuery();
  const [createAttendance] = useCreateAttendanceMutation();
  const { data: students } = useGetAllStudentsQuery(
    {
      class: classId,
      section: section,
    },
    {
      skip: !classId || !section,
    }
  );

  const isLoadingState = isLoading || isSectionsLoading;

  const handleAttendanceChange = (studentId, status) => {
    dispatch(setAttendance({ studentId, status }));
  };

  const handleRemarksChange = (studentId, remarks) => {
    dispatch(
      setAttendance({
        studentId,
        status: attendance[studentId]?.status || "",
        remarks,
      })
    );
  };
  console.log(attendance);
  const handleSubmit = async () => {
    const toast = createPromiseToast();
    const { successToast, errorToast } = toast();
    const attendanceRecords = Object.keys(attendance).map((studentId) => ({
      student: studentId,
      status: attendance[studentId],
      remarks: attendance[studentId]?.remarks || "",
    }));

    const data = {
      classId,
      section,
      date,
      attendanceRecords,
      teacher: teacherId,
    };

    try {
      if (
        classId &&
        section &&
        date &&
        attendanceRecords.length > 0 &&
        teacherId
      ) {
        const res = await createAttendance(data).unwrap();
        console.log("Attendance Submitted:", res);
        successToast({ message: "Attendance submitted successfully" });
        dispatch(resetAttendance());
      }
    } catch (error) {
      console.error("Error Submitting Attendance:", error);
      errorToast({ message: error?.data?.message ?? "An error occurred" });
    }
  };

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
                    dispatch(setClass(value));
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
                    dispatch(setSection(value));
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
                onChange={(e) => dispatch(setDate(e.target.value))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {students?.length > 0 ? (
          <table className="min-w-full bg-white border rounded-md shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Student Name</th>
                <th className="px-4 py-3 text-left">Roll Number</th>
                <th className="px-4 py-3 text-center">Present</th>
                <th className="px-4 py-3 text-center">Absent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b`}
                >
                  <td className="px-4 py-3">{student.name}</td>
                  <td className="px-4 py-3">{student.rollNumber}</td>
                  <td className="px-4 py-3 text-center">
                    <Radio
                      name={`attendance-${student._id}`}
                      checked={attendance[student._id] === "present"}
                      onChange={() =>
                        handleAttendanceChange(student._id, "present")
                      }
                      color="green"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Radio
                      name={`attendance-${student._id}`}
                      checked={attendance[student._id] === "absent"}
                      onChange={() =>
                        handleAttendanceChange(student._id, "absent")
                      }
                      color="red"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500">No students found.</div>
        )}
      </div>

      {students?.length > 0 && (
        <div className="p-4 flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Attendance
          </button>
          <button
            onClick={() => dispatch(resetAttendance())}
            className="bg-red-500 text-white font-bold px-6 py-2 rounded-md hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;
