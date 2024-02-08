/* eslint-disable no-undef */
import axios from "axios";
// import i18n from "../../i18n";

// Create a function that generates an Axios instance with interceptors
const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      // You can modify the request configuration here before it is sent
      // For example, you might add headers, authentication tokens, etc.
      const accessToken = localStorage.getItem("accessToken");

      // Attach the access token to the request header
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      // You can add other request headers or perform modifications here
      // config.data = {
      //     ...config.data, // Preserve existing data properties
      //     // Add your default data here
      //     lang: i18n.language,
      // };
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // You can modify the response data here before it is passed to the calling code
      return response;
    },
    (error) => {
      switch (error.response.status) {
        // case 401:
        //   window.location.href = "/error/401";
        //   break;
        // case 403:
        //   window.location.href = "/error/403";
        //   break;
        // case 404:
        //   window.location.href = "/error/404";
        //   break;
        // case 405:
        //   window.location.href = "/error/405";
        //   break;
        // case 406:
        //   window.location.href = "/error/406";
        //   break;
        // case 409:
        //   window.location.href = "/error/409";
        //   break;
        // case 410:
        //   window.location.href = "/error/410";
        //   break;
        // case 422:
        //   //NOTE - forms error handled at specific components
        //   break;
        // case 429:
        //   //NOTE - forms error handled at specific components
        //   window.location.href = "/error/429";
        //   break;
        // case 500:
        //   window.location.href = "/error/500";
        //   break;
        default:
          window.location.href = `/error/${error.response.status}`;
      }

      return error.response;
    }
  );

  return instance;
};

const axiosInstance = createAxiosInstance(
  import.meta.env.MODE.REACT_APP_BACKEND_URL
);

export { axiosInstance };
