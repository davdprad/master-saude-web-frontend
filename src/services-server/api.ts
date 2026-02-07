import axios from "axios";
import { API_URL } from "../config/env";

export const backendApi = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
});
