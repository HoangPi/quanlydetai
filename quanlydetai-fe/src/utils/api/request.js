import axios from "axios";
const baseURL = "https://localhost:8000";

export const request = axios.create({
  baseURL,
});
