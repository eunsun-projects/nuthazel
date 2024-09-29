"use client";
import styles from "@/styles/admin.module.css";
import { Collabo, Illust, Toon } from "@/types/NutHazel.type";
import { useState } from "react";
import List from "./list";
import UpLoadModal from "./uploadmodal";

interface AdminToonProps {
  toonData: Toon[];
}

export default function AdminToon({ toonData }: AdminToonProps) {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<Toon | Illust | Collabo | null>(null);

  const handleModal = () => {
    setModal(true);
    setSelected(null);
  };

  return (
    <>
      <div className={styles.toonadminpage}>
        {modal && <UpLoadModal type={"toon"} setModal={setModal} data={toonData} selected={selected} />}

        <div
          style={{
            height: "fit-content",
            width: "100%",
            display: "flex",
            gap: "0.5rem",
            flexDirection: "column",
          }}
        >
          <div className={styles.newbtn}>
            <p onClick={handleModal} style={{ cursor: "pointer" }}>
              새로추가하기
            </p>
          </div>

          <div className={styles.index}>
            <p>목록</p>
          </div>

          <List data={toonData} setModal={setModal} setSelected={setSelected} type={"toon"} />
        </div>
      </div>
    </>
  );
}
