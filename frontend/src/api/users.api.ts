import { request } from "../lib/axios";
import type { CreateUserRequest, CreateUserResponse } from "../types/user";

export const usersApi = {
  createUser(payload: CreateUserRequest) {
    return request<CreateUserResponse, CreateUserRequest>({
      method: "POST",
      url: "/api/v1/users",
      data: payload,
    });
  },
};
