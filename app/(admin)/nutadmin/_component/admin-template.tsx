"use client";

import { useCollaboQuery, useIllustQuery, useToonQuery } from "@/hooks/queries";
import styles from "@/styles/admin.module.css";
import { useMemo, useState } from "react";
import AdminCollab from "./admin-collab";
import AdminIllust from "./admin-illust";
import AdminToon from "./admin-toon";
import SideMenu from "./sidemenu";

export default function AdminTemplate() {
  const { data: illustData } = useIllustQuery();
  const { data: toonData } = useToonQuery();
  const { data: collabData } = useCollaboQuery();

  const [category, setCategory] = useState("main");

  const distData = useMemo(() => {
    if (!illustData || !toonData || !collabData) return [];
    return [...illustData, ...toonData, ...collabData];
  }, [illustData, toonData, collabData]);

  return (
    <>
      <div className={styles.adminmain}>
        <SideMenu setCategory={setCategory} data={distData} />

        <div className={styles.adminp}>
          {category === "illust" && illustData && <AdminIllust illustData={illustData} />}
          {category === "collabo" && collabData && <AdminCollab collabData={collabData} />}
          {category === "toon" && toonData && <AdminToon toonData={toonData} />}
          {category === "main" && <p>{`반갑습니다\nnuthazel님`}</p>}
        </div>
      </div>
    </>
  );
}
