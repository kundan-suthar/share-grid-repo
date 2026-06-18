export type User = {
  id: string;
  username: string;
  color: string;
  createdAt?: string;
};

export type CreateUserRequest = {
  username: string;
};

export type CreateUserResponse = User;
