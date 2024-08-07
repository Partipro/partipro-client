import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import ApiError from "./api-error";

axiosRetry(axios, {
  retries: 5,
  retryCondition: (error) =>
    error.code !== "ECONNABORTED" &&
    (!error.response ||
      ((error.response.data as { error: string }).error !==
        "db_timeout_error" &&
        error.response.status > 504 &&
        error.response.status <= 599)),
  retryDelay: (retryCount) => retryCount * 2500,
});

export default async function request<T>({
  headers,
  url,
  ...rest
}: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axios.request<T>({
      url: `${import.meta.env.VITE_API_URL}/${url}`,
      withCredentials: true,
      ...rest,
    });
    return response.data;
  } catch (e) {
    const error = e as Error;
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
    }
    throw new ApiError(error);
  }
}
