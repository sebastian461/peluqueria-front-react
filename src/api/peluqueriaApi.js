import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const peluqueriaApi = axios.create({
  baseURL: `${VITE_API_URL}`,
});

//TODO: configurar interceptores

peluqueriaApi.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default peluqueriaApi;
