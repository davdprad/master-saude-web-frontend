import axios from "axios";

const isProd = process.env.NODE_ENV === "production";
const API_URL = isProd
  ? process.env.API_URL_PROD ?? process.env.API_URL
  : process.env.API_URL ?? "https://roll-zen-keep-win.trycloudflare.com";

export const backendApi = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
});