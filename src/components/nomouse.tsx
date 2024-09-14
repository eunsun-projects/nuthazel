"use client";

import { useEffect } from "react";

export default function NoMouse() {
  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    document.body.addEventListener("contextmenu", handleRightClick);

    return () => {
      document.body.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);

  return <></>;
}
