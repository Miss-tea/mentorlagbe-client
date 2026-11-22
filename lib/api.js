import { authClient } from "./auth-client";

export const API = process.env.NEXT_PUBLIC_API_URL;

// Calls the Express API with the user's JWT. Throws an Error with the server's message on failure.
export async function apiFetch(path, options = {}) {
  const { data } = await authClient.token();
  const isFile = typeof FormData !== "undefined" && options.body instanceof FormData;

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      // For files, do NOT set Content-Type. The browser adds it with the right boundary.
      ...(isFile ? {} : { "Content-Type": "application/json" }),
      ...(data?.token ? { Authorization: `Bearer ${data.token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "Something went wrong");
  return body;
}
