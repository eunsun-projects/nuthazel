"use client";

import { useCollaboQuery, useIllustQuery, useToonQuery } from "@/hooks/queries";
import styles from "@/styles/admin.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import AdminCollab from "./admin-collab";
import AdminIllust from "./admin-illust";
import AdminToon from "./admin-toon";
import SideMenu from "./sidemenu";

export default function AdminTemplate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams(); // next기능

  const { data: illustData } = useIllustQuery();
  const { data: toonData } = useToonQuery();
  const { data: collabData } = useCollaboQuery();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchparams); // 기본 자바스크립트 기능
      params.set(name, value);

      return params.toString();
    },
    [searchparams]
  );

  const [category, setCategory] = useState("main");

  const distData = useMemo(() => {
    if (!illustData || !toonData || !collabData) return [];
    return [...illustData, ...toonData, ...collabData];
  }, [illustData, toonData, collabData]);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("id", "main"));
  }, [searchparams, router, pathname, createQueryString]);

  return (
    <>
      <div className={styles.adminmain}>
        <SideMenu setCategory={setCategory} data={distData} />

        <div className={styles.adminp}>
          {category === "illust" && illustData && <AdminIllust illustData={illustData} />}
          {category === "collab" && collabData && <AdminCollab collabData={collabData} />}
          {category === "toon" && toonData && <AdminToon toonData={toonData} />}
          {category === "main" && <p>{`반갑습니다\nnuthazel님`}</p>}
        </div>
      </div>
    </>
  );
}
