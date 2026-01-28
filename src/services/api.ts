import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", // process.env.NEXT_PUBLIC_API_URL
});
