export type UserRole = "admin" | "client" | "provider";

type DemoUser = {
  email: string;
  password: string;
  role: UserRole;
  redirect: string;
};

export const demoUsers: DemoUser[] = [
  {
    email: "admin@traec.com",
    password: "admin123",
    role: "admin",
    redirect: "/admin-dashboard",
  },
  {
    email: "client@traec.com",
    password: "client123",
    role: "client",
    redirect: "/client-dashboard",
  },
  {
    email: "provider@traec.com",
    password: "provider123",
    role: "provider",
    redirect: "/provider-dashboard",
  },
];

export type DemoLoginResponse =
  | { success: true; role: UserRole; redirect: string }
  | { success: false };

export function demoLogin(email: string, password: string): DemoLoginResponse {
  const user = demoUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) return { success: false };

  return {
    success: true,
    role: user.role,
    redirect: user.redirect,
  };
}

export function getStoredRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role") as UserRole | null;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("role");
  }
}
