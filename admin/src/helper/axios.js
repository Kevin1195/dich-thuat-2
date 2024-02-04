import axios from "axios";
import SETTINGS from "../setting.json";

const createInstance = () => {
  let headers = {};

  const token = localStorage.getItem("auth_portal");
  headers["x-access-token"] = token;

  return axios.create({
    baseURL: `${SETTINGS.BASE_URL}/api`,
    headers,
  });
};

const instance = createInstance();

instance.interceptors.response.use(
  response => response?.data,
  error => Promise.reject(error?.response?.data),
);

export { instance };
