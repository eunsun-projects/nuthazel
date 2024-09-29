"use client";

import useAuth from "@/hooks/auth/auth.hook";
import styles from "@/styles/admin.module.css";

export default function LogOut() {
  const { logOut } = useAuth();

  return (
    <div onClick={logOut} className={styles.logbtn} style={{ cursor: "pointer" }}>
      logout
    </div>
  );
}
