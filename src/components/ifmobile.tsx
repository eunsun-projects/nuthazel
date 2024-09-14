"use client";
import { useEffect, useState } from "react";

export default function IfMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const isMobile = () => {
      return /Android|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }; // =========> mobile device check function

    !isMobile() ? setMobile(false) : setMobile(true);
  }, []);

  return (
    <>
      {mobile && (
        <div
          style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            flexDirection: "column",
            color: "var(--color)",
            width: "100%",
            height: "100%",
            backgroundColor: "beige",
            zIndex: "999",
          }}
        >
          <p>PC에서 감상해주세요</p>
        </div>
      )}
    </>
  );
}
