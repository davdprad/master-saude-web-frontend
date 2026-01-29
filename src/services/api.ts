import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.6:8000", // process.env.NEXT_PUBLIC_API_URL
});
