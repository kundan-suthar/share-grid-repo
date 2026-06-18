import type { User } from "../types/user";

const USER_STORAGE_KEY = "share-grid:user";

export function getStoredUser(): User | null {
  const value = localStorage.getItem(USER_STORAGE_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as User;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function storeUser(user: User) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
}
