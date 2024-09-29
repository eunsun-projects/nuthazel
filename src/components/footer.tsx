"use client";

import styles from "@/styles/home.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function Footer() {
  const footRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  return (
    <div
      ref={footRef}
      className={styles.footer}
      style={{
        backgroundColor: "transparent",
        justifyContent: "space-between",
        display:
          pathname === "/about" ||
          pathname === "/goods" ||
          pathname === "/work/collaboration"
            ? "none"
            : "flex",
        color:
          pathname === "/" || pathname === "/contact" ? "#eee7d1" : "#40403d",
      }}
    >
      <p>©2024.nuthazel</p>
      <Link href={"https://www.instagram.com/bdn._.toon/"} target="_blanc">
        <div
          style={{
            display: "flex",
            color:
              pathname === "/" || pathname === "/contact"
                ? "#eee7d1"
                : "#40403d",
          }}
        >
          <div
            className={styles.cong}
            style={{
              borderColor:
                pathname === "/" || pathname === "/contact"
                  ? "#eee7d1"
                  : "#40403d",
            }}
          >
            i
          </div>
          <div
            className={styles.cong}
            style={{
              borderColor:
                pathname === "/" || pathname === "/contact"
                  ? "#eee7d1"
                  : "#40403d",
            }}
          >
            n
          </div>
          <div
            className={styles.cong}
            style={{
              borderColor:
                pathname === "/" || pathname === "/contact"
                  ? "#eee7d1"
                  : "#40403d",
            }}
          >
            s
          </div>
          <div
            className={styles.cong}
            style={{
              borderColor:
                pathname === "/" || pathname === "/contact"
                  ? "#eee7d1"
                  : "#40403d",
            }}
          >
            t
          </div>
          <div
            className={styles.cong}
            style={{
              borderColor:
                pathname === "/" || pathname === "/contact"
                  ? "#eee7d1"
                  : "#40403d",
            }}
          >
            a
          </div>
        </div>
      </Link>
    </div>
  );
}
