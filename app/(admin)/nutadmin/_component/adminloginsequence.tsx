"use client";

import useAuth from "@/hooks/auth/auth.hook";
import AdminTemplate from "./admin-template";
import Login from "./login";
import ToHome from "./toHome";

function AdminLoginSequence() {
  const { user } = useAuth();

  const isAdmin =
    user?.email === process.env.NEXT_PUBLIC_SCREEN_MAIL ||
    user?.email === process.env.NEXT_PUBLIC_VANKO_MAIL ||
    user?.email === process.env.NEXT_PUBLIC_EUNOH_MAIL ||
    user?.email === process.env.NEXT_PUBLIC_MISUN_MAIL;

  return (
    <>
      {isAdmin ? (
        <AdminTemplate />
      ) : (
        <div>
          로긴하세욤.
          <Login />
          <br />
          <ToHome />
        </div>
      )}
    </>
  );
}

export default AdminLoginSequence;
