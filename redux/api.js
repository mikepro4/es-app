import axios from "axios";
const PROXY_ROUTE = "/mainapi";
const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || `localhost:${PORT}`;

const axiosInstance = axios.create({
  baseURL: PROXY_ROUTE,
  header: {
    "x-forwarded-host": HOST
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers = {
          ...config.headers,
            'Content-Type': 'application/json',
            "authorization": `${token}`,
        };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  console.log("401")
 }
 return error;
});

export default axiosInstance;