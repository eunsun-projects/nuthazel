"use client";
import { NutHazelResponse } from "@/app/api/nutget/route";
import styles from "@/app/nutadmin/page.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AdminCollab from "./admin-collab";
import AdminIllust from "./admin-illust";
import AdminToon from "./admin-toon";
import SideMenu from "./sidemenu";

interface AdminMainProps {
  data: NutHazelResponse["nuthazelall"] | null;
}

export default function AdminMain({ data }: AdminMainProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams(); // next기능

  const id = searchparams.get("id");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchparams); // 기본 자바스크립트 기능
      params.set(name, value);

      return params.toString();
    },
    [id]
  );

  const [category, setCategory] = useState("main");
  const [distData, setDistData] = useState(data);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("id", "main"));
  }, []);

  return (
    <>
      <div className={styles.adminmain}>
        <SideMenu
          setCategory={setCategory}
          data={data}
          setDistData={setDistData}
        />

        <div className={styles.adminp}>
          {category === "illust" && <AdminIllust data={distData} />}
          {category === "collab" && <AdminCollab data={distData} />}
          {category === "toon" && <AdminToon data={distData} />}
          {category === "main" && <p>{`반갑습니다\nnuthazel님`}</p>}
        </div>
      </div>
    </>
  );
}
