"use client";
import { NutHazelResponse } from "@/app/api/nutget/route";
import styles from "@/app/nutadmin/page.module.css";
import { useState } from "react";
import List from "./list";
import ToonModal from "./toonmodal";

interface AdminToonProps {
  data: NutHazelResponse["nuthazelall"] | null;
}

export default function AdminToon({ data }: AdminToonProps) {
  const [modal, setModal] = useState(false);
  const [currNum, setCurrNum] = useState<number | null>(null);
  const [toonList, setToonList] = useState(data);

  const handleModal = () => {
    setModal(true);
    setCurrNum(null);
  };

  return (
    <>
      <div className={styles.toonadminpage}>
        {modal && (
          <ToonModal
            setModal={setModal}
            data={toonList}
            currNum={currNum}
            setToonList={setToonList}
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
