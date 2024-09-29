"use client";

import styles from "@/styles/admin.module.css";
import { Collabo, Illust, Toon } from "@/types/NutHazel.type";
import { useState } from "react";

interface ListProps {
  data: Toon[] | Illust[] | Collabo[];
  setModal: (modal: boolean) => void;
  setCurrNum: (num: number) => void;
  setList: (list: any) => void;
  type: string;
}

export default function List({ data, setModal, setCurrNum, setList, type }: ListProps) {
  const [fetching, setFetching] = useState(false);

  const handleClick = (num: number) => () => {
    setModal(true);
    setCurrNum(num);
    // console.log(num)
  };

  const deleteFetch = (item: Toon | Illust | Collabo) => async () => {
    if (confirm("해당 항목을 삭제하시겠습니까?")) {
      try {
        // fetch 과정 시작할때 true
        setFetching(true);
        const formData = new FormData();

        formData.append("action", "toondelete");
        formData.append("num", String(item.num));
        formData.append("title", item.title);

        const req = {
          method: "POST",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_POST_TOKEN}`,
          },
          body: formData,
        };

        const setResponse = await fetch("/api/nutset", req as RequestInit);

        if (setResponse.ok) {
          const result = await setResponse.json();
          console.log("삭제 성공", result);
        } else {
          throw new Error("삭제 실패");
        }

        const getReq = {
          method: "GET",
          cache: "no-store", //매번 새로 데이터 받아오기
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_POST_TOKEN}`,
          },
        };

        const getResponse = await fetch("/api/nutget", getReq as RequestInit);

        if (getResponse.ok) {
          const result: NutHazelResponse = await getResponse.json();
          console.log("삭제 후 데이터 업데이트 성공", result);

          // nuthazeall(전부다 들어있는 배열) 에서 filter -> props 로 받은 type 과 item.category가 일치하면 리턴
          const filteredData = result.nuthazelall.filter((e) => {
            if (e.category === type) {
              return e;
            }
          });

          setList(filteredData);

          setFetching(false); // 모든 fetch 가 끝나면(삭제가 이루어지면) false
        } else {
          throw new Error("삭제 후 데이터 업데이트 실패");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("다시 확인해주세요.");
    }
  };

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
                  <div className={styles.admincrudbtn} onClick={handleClick(Number(e.num))}>
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
