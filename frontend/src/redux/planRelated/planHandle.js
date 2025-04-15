import axios from "axios";
import { getRequest, getSuccess, getFailed, getError, updateSuccess } from "./planSlice";

// 🟢 Get All Plans
export const getAllPlans = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/PlanList/${id}`);
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Create Plan
export const createPlan = (planData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/PlanCreate`, planData);
    if (result.data) {
      dispatch(getSuccess(result.data));
    } else {
      dispatch(getFailed("Failed to create plan"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Update Plan
export const updatePlan = (id, updatedData) => async (dispatch) => {
  dispatch(getRequest());
  try {
    const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/Plan/${id}`, updatedData);
    if (result.data) {
      dispatch(updateSuccess({ id, updatedData: result.data }));
    } else {
      dispatch(getFailed("Failed to update plan"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Delete a Single Plan
export const deletePlan = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/Plan/${id}`);
    dispatch(getSuccess(id));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};

// 🟢 Delete All Plans
export const deleteAllPlans = (id) => async (dispatch) => {
  dispatch(getRequest());
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/Plans/${id}`);
    dispatch(getSuccess(id));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(getError({ message: errorMessage }));
  }
};
