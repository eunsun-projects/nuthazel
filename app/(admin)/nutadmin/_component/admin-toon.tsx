"use client";
import styles from "@/styles/admin.module.css";
import { Toon } from "@/types/NutHazel.type";
import { useState } from "react";
import List from "./list";
import ToonModal from "./toonmodal";

interface AdminToonProps {
  toonData: Toon[];
}

export default function AdminToon({ toonData }: AdminToonProps) {
  const [modal, setModal] = useState(false);
  const [currNum, setCurrNum] = useState<number | null>(null);
  const [toonList, setToonList] = useState(toonData);

  const handleModal = () => {
    setModal(true);
    setCurrNum(null);
  };

  return (
    <>
      <div className={styles.toonadminpage}>
        {modal && (
          <ToonModal setModal={setModal} data={toonList} currNum={currNum} setToonList={setToonList} />
        )}

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

          <List
            data={toonList}
            setModal={setModal}
            setCurrNum={setCurrNum}
            setList={setToonList}
            type={"toon"}
          />
        </div>
      </div>
    </>
  );
}
