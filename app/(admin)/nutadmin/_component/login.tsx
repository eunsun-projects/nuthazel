"use client";

import useAuth from "@/hooks/auth/auth.hook";

export default function Login() {
  const { loginWithProvider } = useAuth();

  return (
    <div onClick={loginWithProvider} style={{ cursor: "pointer", fontSize: "2rem" }}>
      LOGIN
    </div>
  );
}
