"use client";
import styles from "@/app/work/illustration/page.module.css";
import { useState } from "react";
import Modal from "./modal";

interface IllustProps {
  illust: FirebaseFirestore.DocumentData[];
}

export default function Illust({ illust }: IllustProps) {
  const [modal, setModal] = useState(true);

  return (
    <>
      <div className={styles.page}>
        {modal && <Modal setModal={setModal} illust={illust} />}
      </div>
    </>
  );
}
