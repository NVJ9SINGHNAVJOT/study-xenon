import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentData: null,
  instructorData:null,
  coursesData:null,
  instructorEarningData : null,
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setLoading(state, value) {
        state.loading = value.payload;
    },
    setStudentData(state, value) {
      state.studentData = value.payload;
    },
    setInstructorData(state, value) {
      state.instructorData = value.payload;
    },
    setCoursesData(state, value) {
      state.coursesData = value.payload;
    },
    setInstructorEarningData(state, value) {
      state.instructorEarningData = value.payload;
    },
  },
});

export const { setLoading, setStudentData, setInstructorData, 
    setTosetCoursesDataken, setInstructorEarningData } = adminSlice.actions;

export default adminSlice.reducer;