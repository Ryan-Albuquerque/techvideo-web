import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // We really want to throw the error so it is handled and we
    // don't get an unhandledrejection error. By throwing here, we
    // are handling the rejection, and bubbling up to the closest
    // error handler (try/catch or catch method call on a promise).
    return Promise.reject(error);
  }
);
export const api = axios.create({
  baseURL: "http://localhost:3333",
});
