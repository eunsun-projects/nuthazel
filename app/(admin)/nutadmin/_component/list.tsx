"use client";

import { useCollaboMutation, useIllustMutation, useToonMutation } from "@/hooks/mutations";
import styles from "@/styles/admin.module.css";
import { Collabo, Illust, Toon } from "@/types/NutHazel.type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ListProps {
  data: Toon[] | Illust[] | Collabo[];
  setModal: (modal: boolean) => void;
  setSelected: Dispatch<SetStateAction<Toon | Illust | Collabo | null>>;
  type: string;
}

export default function List({ data, setModal, setSelected, type }: ListProps) {
  const [fetching, setFetching] = useState(false);

  const { mutateAsync: mutateToon, isPending: isPendingToon } = useToonMutation();
  const { mutateAsync: mutateIllust, isPending: isPendingIllust } = useIllustMutation();
  const { mutateAsync: mutateCollabo, isPending: isPendingCollabo } = useCollaboMutation();

  const handleClick = (item: Toon | Illust | Collabo) => () => {
    setModal(true);
    setSelected(item);
  };

  const deleteFetch = (item: Toon | Illust | Collabo) => async () => {
    if (confirm("해당 항목을 삭제하시겠습니까?")) {
      try {
        if (type === "toon") {
          await mutateToon({ toon: item as Toon, method: "DELETE" });
        } else if (type === "illust") {
          await mutateIllust({ illust: item as Illust, method: "DELETE" });
        } else if (type === "collabo") {
          await mutateCollabo({ collabo: item as Collabo, method: "DELETE" });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("다시 확인해주세요.");
    }
  };

  useEffect(() => {
    if (isPendingToon || isPendingIllust || isPendingCollabo) {
      setFetching(true);
    } else {
      setFetching(false);
    }
  }, [isPendingToon, isPendingIllust, isPendingCollabo]);

  return (
    <>
      {fetching && (
        <dialog className={styles.fetching}>
          <p>데이터 삭제중~~~~</p>
        </dialog>
      )}

      {data &&
        data.map((e, i) => {
          return (
            <div key={i} className={styles.toonlist}>
              <div
                className={styles.toonlistthumb}
                style={{ backgroundImage: `url(${e.imgurl[0]})` }}
              ></div>

              <div className={styles.toonlisttext}>
                <p>타이틀 : {e.title}</p>
                <p>설명 : {e.desc}</p>
                <p>키워드 : {e.keywords.join(", ")}</p>

                <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                  <div className={styles.admincrudbtn} onClick={handleClick(e)}>
                    수정
                  </div>
                  <div className={styles.admincrudbtn} onClick={deleteFetch(e)}>
                    삭제
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
