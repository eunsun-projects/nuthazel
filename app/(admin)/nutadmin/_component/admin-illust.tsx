"use client";
import { NutHazelResponse } from "@/app/api/nutget/route";
import styles from "@/styles/admin.module.css";
import { useState } from "react";
import IllustCollabModal from "./illustcollabmodal";
import List from "./list";

interface AdminIllustProps {
  data: NutHazelResponse["nuthazelall"] | null;
}

export default function AdminIllust({ data }: AdminIllustProps) {
  const [modal, setModal] = useState(false);
  const [currNum, setCurrNum] = useState<number | null>(null);
  const [illustList, setIllustList] = useState(data);

  const handleModal = () => {
    setModal(true);
    setCurrNum(null);
  };
  return (
    <>
      <div className={styles.toonadminpage}>
        {modal && (
          <IllustCollabModal
            type={"illust"}
            setModal={setModal}
            data={illustList}
            currNum={currNum}
            setToonList={setIllustList}
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
            data={illustList}
            setModal={setModal}
            setCurrNum={setCurrNum}
            setList={setIllustList}
            type={"illust"}
          />
        </div>
      </div>
    </>
  );
}
