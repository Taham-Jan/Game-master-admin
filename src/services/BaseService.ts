import axios from "axios";

const BaseService = axios.create({
  // timeout: 60000,
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default BaseService;
