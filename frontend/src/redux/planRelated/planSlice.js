import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plansList: [],
  loading: false,
  error: null,
  response: null,
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.plansList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "An error occurred";
    },
    updateSuccess: (state, action) => {
      const updatedPlan = action.payload.updatedData;
      state.plansList = state.plansList.map((plan) =>
        plan._id === updatedPlan._id ? updatedPlan : plan
      );
      state.response = "Plan updated successfully!";
      state.loading = false;
      state.error = null;
    },
  },
});

export const { getRequest, getSuccess, getFailed, getError, updateSuccess } = planSlice.actions;
export const planReducer = planSlice.reducer;

