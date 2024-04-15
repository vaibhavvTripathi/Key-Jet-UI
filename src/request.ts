import axios, { AxiosError } from "axios";
import { getConfigs } from "./configmanager/configmanager";
import toast from "react-hot-toast";

// Create an instance of Axios
export const keyJetApiRequestHandler = axios.create({
  baseURL: getConfigs().urlConfigs.baseurl,
});

// Define an interceptor for handling errors
keyJetApiRequestHandler.interceptors.response.use(
  (response) => {
    // Return successful response
    return response;
  },
  (error: AxiosError) => {
    // Check if the error is a network error
    if (!error.response) {
      // Handle network error (e.g., server is down, no internet connection)
      console.error("Network Error:", error.message);
      // You can throw a custom error or return a predefined error response
      // throw new Error('Network Error');
      // return Promise.reject(new Error('Network Error'));
    } else {
      // Handle HTTP error (e.g., 404, 500)
      const status = error.response.status;
      switch (status) {
        case 404:
          toast.error("Requested resource not found");
          // Handle 404 error (Not Found)
          break;
        case 500:
          toast.error("Something went wrong in the server");
          // Handle 500 error (Internal Server Error)
          break;
        case 409:
          toast.error("Already exists");
          // Handle 409 error (conflict)
          break;
        default:
          toast.error("Please refresh, something went wrong");
        // Handle other HTTP errors
      }
    }
    // Return a rejected Promise to propagate the error further
    return Promise.reject(error);
  }
);
