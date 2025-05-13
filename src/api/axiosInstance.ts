import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface InstanceConfig {
  baseURL: string;
  timeout: number;
}

const todoinstance: AxiosInstance = axios.create({
  baseURL: "https://6819b1b61ac115563505ccb2.mockapi.io/todo/tododetails",
  timeout: 1000,
} as InstanceConfig);

todoinstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

todoinstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response); // console the result just to check its working
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default todoinstance;
