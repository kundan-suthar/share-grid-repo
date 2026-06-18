import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export type ApiError = {
  message: string;
  status?: number;
  details?: unknown;
};

const API_TIMEOUT_MS = 10_000;

const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL as string | undefined;
  return configuredUrl?.replace(/\/$/, "") || "http://localhost:4000";
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => config);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string; details?: unknown }>) => {
    const apiError: ApiError = {
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong",
      status: error.response?.status,
      details: error.response?.data?.details ?? error.response?.data,
    };

    return Promise.reject(apiError);
  },
);

export async function request<TResponse, TData = unknown>(
  config: AxiosRequestConfig<TData>,
): Promise<TResponse> {
  const response: AxiosResponse<TResponse> = await apiClient.request<TResponse, AxiosResponse<TResponse>, TData>(
    config,
  );
  return response.data;
}
