import axios from "axios";

const BASE_URL = "https://lms-back-end-f0n5.onrender.com/api/v1/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;

// import axios from "axios";

// const BASE_URL = "http://localhost:5001/api/v1/";
// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");


//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else if (config?.headers?.Authorization) {
//       delete config.headers.Authorization;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance; 
