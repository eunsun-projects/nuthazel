"use client";

import styles from "@/styles/pagination.module.css";
import { Collabo, Toon } from "@/types/NutHazel.type";
import { sliceArrayByLimit } from "@/utils/sliceArrayByLimits";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface PaginationProps {
  totalPage: Toon[] | Collabo[];
  limit: number;
  curr: number;
  setCurr: Dispatch<SetStateAction<number>>;
  setLoad: Dispatch<SetStateAction<number>>;
  indexing: number;
  setIndexing: Dispatch<SetStateAction<number>>;
}

// 총 페이지 갯수에 따라 Pagination 갯수 정하기, limit 단위로 페이지 리스트 넘기기
// indexing 은 각 페이지 내에서 0~5 를 뜻함(즉 개별 툰 콘텐츠들)
// curr 은 페이지네이션에서 현재 페이지 넘버를 뜻함
const Pagination = ({
  totalPage,
  limit,
  curr,
  setCurr,
  setLoad,
  indexing,
  setIndexing,
}: PaginationProps) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);

  const totalPageArray = useMemo(() => {
    //totalPage.length 자리에 테스트할 배열의 길이(숫자) 넣어보면 됨
    const slicedPageArray = sliceArrayByLimit(totalPage.length, limit);
    return slicedPageArray;
  }, [totalPage, limit]);

  // curr 는 페이지네이션 넘기기 버튼 << < > >> 으로만 조정하므로
  // 페이지직접 클릭에서는 setCurr 을 하지 않는다.
  const handleNumClick = (selected: number) => () => {
    // 같은 번호 클릭이 아닐때만
    if (indexing !== selected - 1) {
      setIndexing(selected - 1);
      setLoad(0);
    }
  };

  const handleBefore = () => {
    if (curr > 0) {
      setCurr((prev) => prev - 1);
      setLoad(0);
    } else if (totalPageArray.final.length === 1) {
      if (
        indexing <=
          totalPageArray.final[0][totalPageArray.final[0].length - 1] - 1 &&
        indexing > 0
      ) {
        setIndexing((prev) => prev - 1);
        setLoad(0);
      }
    }
  };

  const handleAfter = () => {
    if (curr < totalPageArray.final.length - 1) {
      setCurr((prev) => prev + 1);
      setLoad(0);
    } else if (totalPageArray.final.length === 1) {
      if (
        indexing <
          totalPageArray.final[0][totalPageArray.final[0].length - 1] - 1 &&
        indexing >= 0
      ) {
        setIndexing((prev) => prev + 1);
        setLoad(0);
      }
    }
  };

  const handleFirst = () => {
    if (curr !== 0) {
      setCurrentPageArray(totalPageArray.final[0]);
      setCurr(0);
      setLoad(0);
    } else if (totalPageArray.final.length === 1) {
      if (indexing !== 0) {
        setIndexing(0);
        setLoad(0);
      }
    }
  };

  const handleLast = () => {
    if (curr < totalPageArray.final.length - 1) {
      setCurrentPageArray(
        totalPageArray.final[totalPageArray.final.length - 1]
      );
      setCurr(totalPageArray.final.length - 1);
      setLoad(0);
    } else if (totalPageArray.final.length === 1) {
      if (
        indexing !==
        totalPageArray.final[0][totalPageArray.final[0].length - 1] - 1
      ) {
        setIndexing(
          totalPageArray.final[0][totalPageArray.final[0].length - 1] - 1
        );
        setLoad(0);
      }
    }
  };

  useEffect(() => {
    setCurrentPageArray(totalPageArray.final[curr]);
  }, [curr, totalPageArray]);

  useEffect(() => {
    // 여기 위험 나중에 게시물 많아지면 꼭 체크해볼 것
    setCurrentPageArray(totalPageArray.final[0]);
  }, [totalPageArray]);

  return (
    <div
      className={styles.pagination}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={styles.nextbefore}>
        <span onClick={handleFirst}>{"<<"}</span>
        <span onClick={handleBefore}>{"<"}</span>
      </div>

      <div>
        {currentPageArray?.map((e, i) => (
          <span
            key={i}
            onClick={handleNumClick(e)}
            style={{ color: indexing === i ? "#eee7d1" : undefined }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className={styles.nextbefore}>
        <span onClick={handleAfter}>{">"}</span>
        <span onClick={handleLast}>{">>"}</span>
      </div>
    </div>
  );
};

export default Pagination;
