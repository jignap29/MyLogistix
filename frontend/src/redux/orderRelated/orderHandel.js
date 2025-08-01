

// redux/orderRelated/orderHandel.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// 1. Calculate courier rates
export const calculateRates = createAsyncThunk(
  'order/calculateRates',
  async (orderDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/calculate-rates`,
        orderDetails
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Rate calculation failed'
      );
    }
  }
);

// 2. Create new order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/create-order`,
        orderData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Order creation failed'
      );
    }
  }
);

// 3. Get all orders
export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderList`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// 4. Update full order
export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/order/${id}`,
        updatedData
      );
      return { id, updatedOrder: response.data.order };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order'
      );
    }
  }
);

// 5. Delete order
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/order/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete order'
      );
    }
  }
);

// 6. Fetch order count
export const fetchOrderCount = createAsyncThunk(
  'order/fetchOrderCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/order/count`);
      return response.data; // ✅ now returns an object: { total, pending, shipped, etc. }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order count'
      );
    }
  }
);

// 7. Update only order status
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/order/${id}/status`,
        { status }
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order status'
      );
    }
  }
);
