import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
export default axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
