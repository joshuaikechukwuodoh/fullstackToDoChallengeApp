const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Add credentials (cookies) for better-auth
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(
      errorData.message || `Error ${response.status}: ${response.statusText}`
    );
  }

  return response.json();
}

export const api = {
  auth: {
    login: (data: any) =>
      fetchApi("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    signup: (data: any) =>
      fetchApi("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    logout: () => fetchApi("/api/auth/sign-out", { method: "POST" }),
    me: () => fetchApi("/api/auth/me"),
  },
  tasks: {
    list: () => fetchApi("/api/task"),
    get: (id: string) => fetchApi(`/api/task/${id}`),
    create: (data: any) =>
      fetchApi("/api/task", { method: "POST", body: JSON.stringify(data) }),
    update: (id: string, data: any) =>
      fetchApi(`/api/task/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) => fetchApi(`/api/task/${id}`, { method: "DELETE" }),
  },
  economy: {
    getWallet: () => fetchApi("/api/economy/wallet"),
    getTransactions: () => fetchApi("/api/economy/transactions"),
    stake: (amount: number) =>
      fetchApi("/api/economy/stake", {
        method: "POST",
        body: JSON.stringify({ amount }),
      }),
  },
  leaderboard: {
    list: () => fetchApi("/api/leaderboard"),
  },
  quiz: {
    generate: (formData: FormData) =>
      fetchApi("/api/quiz/generate", { method: "POST", body: formData }),
    getHistory: () => fetchApi("/api/quiz/history"),
  },
};
