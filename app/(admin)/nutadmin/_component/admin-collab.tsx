"use client";

import styles from "@/styles/admin.module.css";
import { Collabo } from "@/types/NutHazel.type";
import { useState } from "react";
import IllustCollabModal from "./illustcollabmodal";
import List from "./list";

interface AdminCollabProps {
  collabData: Collabo[];
}

export default function AdminCollab({ collabData }: AdminCollabProps) {
  const [modal, setModal] = useState(false);
  const [currNum, setCurrNum] = useState<number | null>(null);
  const [collabList, setCollabList] = useState(collabData);

  const handleModal = () => {
    setModal(true);
    setCurrNum(null);
  };

  return (
    <>
      <div className={styles.toonadminpage}>
        {modal && (
          <IllustCollabModal
            type={"collab"}
            setModal={setModal}
            data={collabList}
            currNum={currNum}
            setToonList={setCollabList}
          />
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
            data={collabList}
            setModal={setModal}
            setCurrNum={setCurrNum}
            setList={setCollabList}
            type={"collab"}
          />
        </div>
      </div>
    </>
  );
}
