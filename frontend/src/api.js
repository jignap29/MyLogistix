import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/user", // adjust base URL as per backend
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
