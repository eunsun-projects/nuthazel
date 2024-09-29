"use client";

import Link from "next/link";

export default function ToHome() {
  return (
    <Link href={"/"}>
      <div style={{ cursor: "pointer", fontSize: "1.5rem" }}>홈으로 돌아가기</div>
    </Link>
  );
}
