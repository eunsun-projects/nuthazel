"use client";

import { useIllustQuery } from "@/hooks/queries";
import styles from "@/styles/illust.module.css";
import { useState } from "react";
import IllustModal from "./illustmodal";

export default function IllustTemplate() {
  const { data: illust } = useIllustQuery();
  const [modal, setModal] = useState(true);

  return (
    <>
      <div className={styles.page}>
        {modal && illust && <IllustModal setModal={setModal} illust={illust} />}
      </div>
    </>
  );
}
