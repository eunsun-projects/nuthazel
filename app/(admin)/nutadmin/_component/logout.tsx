"use client";
import styles from "@/styles/admin.module.css";
import { signOut } from "next-auth/react";

export default function LogOut() {
  return (
    <div
      onClick={() => signOut()}
      className={styles.logbtn}
      style={{ cursor: "pointer" }}
    >
      logout
    </div>
  );
}
