import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classId: "",
  section: "",
  date: new Date().toISOString().split("T")[0],
  attendance: {}, // { studentId: "Present" or "Absent" }
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setClass: (state, action) => {
      state.classId = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setAttendance: (state, action) => {
      const { studentId, status } = action.payload;
      state.attendance[studentId] = status;
    },
    resetAttendance: () => initialState,
  },
});

export const { setClass, setSection, setDate, setAttendance, resetAttendance } =
  attendanceSlice.actions;

export default attendanceSlice.reducer;
