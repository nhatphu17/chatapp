import useSWR from "swr";
import { AxiosError } from "axios";
import axios from "@/lib/axiosInstance";
import { User } from "@/types/userTypes";

interface LoginError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

const fetcher = (url: string) => axios.get<User>(url).then((res) => res.data);

export function useAuth() {
  const { data, mutate, error } = useSWR<User, AxiosError>(
    "/api/auth/user",
    fetcher
  );

  const login = async (email: string, password: string) => {
    try {
      console.log("hooks",email);
      const response = await axios.post<User>("/api/auth/login", {
        email,
        password,
      });
      mutate(response.data, false);
      return response.data;
    } catch (error: any) {
      const err = error as LoginError;
      throw new Error(err.response?.data?.error || "Login failed");
    }
  };

  return {
    user: data,
    isLoading: !error && !data,
    isError: !!error,
    login,
  };
}
