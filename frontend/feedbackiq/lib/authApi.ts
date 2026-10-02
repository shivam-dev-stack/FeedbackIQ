import { apiFetch } from "./api/client";

export async function register(data: {
  email: string;
  password: string;
  organization_name: string;
  owner_name: string;
}) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function login(data: {
  email: string;
  password: string;
}) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logout() {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}