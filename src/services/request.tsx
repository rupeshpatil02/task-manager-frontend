import axios from "axios";

const baseURL = "http://localhost:8000/api/v1/";
const accessToken = localStorage.getItem("accessToken");
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
