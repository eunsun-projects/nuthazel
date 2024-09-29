"use client";

import styles from "@/styles/admin.module.css";
import { Toon } from "@/types/NutHazel.type";
import convertToWebP from "@/utils/convertToWebp";
import { useRef, useState } from "react";

interface ToonModalProps {
  setModal: (modal: boolean) => void;
  data: Toon[];
  currNum: number | null;
  setToonList: (list: any) => void;
}

export default function ToonModal({ setModal, data, currNum, setToonList }: ToonModalProps) {
  const [imgFiles, setImgFiles] = useState<File[] | null>(null);
  const [lastNum, setLastNum] = useState<number>(data ? data.length + 1 : 1); // index 와 다르게 데이터는 1부터 시작하므로
  const [fetching, setFetching] = useState(false);

  const imgFilesRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleClose = () => {
    setModal(false);
  };

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      confirm("정렬하시겠습니까? 파일명은 이름+숫자.확장자로 맞추어주세요. ex) name1.jpg혹은 name1.png")
    ) {
      if (imgFiles) {
        const copy = [...imgFiles];
        const sorted = copy.sort((a, b) => {
          const matchA = a.name.match(/(\d+)(?=\.(?:jpg|jpeg|png|JPG|JPEG|PNG)$)/);
          const matchB = b.name.match(/(\d+)(?=\.(?:jpg|jpeg|png|JPG|JPEG|PNG)$)/);

          const numberA = matchA ? parseInt(matchA[1], 10) : 0;
          const numberB = matchB ? parseInt(matchB[1], 10) : 0;

          return numberA - numberB;
        });

        setImgFiles(sorted);
      }
    }
  };

  const handledelete = (i: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (imgFiles) {
      const copy = [...imgFiles];
      copy.splice(i, 1);
      setImgFiles(copy);
    }
  };

  const handleImgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const fileArray = Array.from(files).map((file) => file);
      setImgFiles(fileArray);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imgFiles) {
      alert("파일을 먼저 선택해 주세요");
      return;
    }
    if (confirm("업로드 하시겠습니까?")) {
      const target = formRef.current;
      if (!target) {
        alert("폼이 없습니다.");
        return;
      }
      const title = (target.title01 as HTMLInputElement).value;
      const desc = (target.desc as HTMLTextAreaElement).value;
      const keywords: string[] = [
        (target.keyword1 as HTMLInputElement).value,
        (target.keyword2 as HTMLInputElement).value,
        (target.keyword3 as HTMLInputElement).value,
      ];

      try {
        setFetching(true);
        const webps = await Promise.all(
          imgFiles.map((img) => {
            return convertToWebP(img, 1280, 720);
          })
        );

        // formData 인스턴스를 생성합니다.
        const formData = new FormData();

        let actionType = "";

        //currNum이면 수정이라는 뜻.
        if (currNum !== null && data) {
          actionType = "toonupdate";
          const result = data.filter((e) => e.num === currNum)[0];
          const oldTitle = result.title;
          formData.append("oldtitle", oldTitle);

          formData.append("pageurl", `/work/toon?num=${String(currNum)}`);
        } else {
          actionType = "toonupload";
          formData.append("pageurl", `/work/toon?num=${String(lastNum)}`);
        }

        // formData 에 각 항목 추가
        formData.append("action", actionType);
        formData.append("isPublic", "true");
        formData.append("num", currNum !== null ? String(currNum) : String(lastNum));
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("keywords", keywords.join(","));
        webps.forEach((e, i) => {
          formData.append("img", e, e.name);
        });

        const req = {
          method: "POST",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_POST_TOKEN}`,
          },
          body: formData,
        };

        const response = await fetch("/api/nutset", req as RequestInit);

        if (response.ok) {
          const result = await response.json();
          console.log("파일 업로드 성공", result);
          setLastNum((prev) => prev + 1);
        } else {
          throw new Error("파일 업로드 실패");
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
          console.log("업로드 후 데이터 업데이트 성공", result);

          const toonData = result.nuthazelall.filter((e) => {
            if (e.category === "toon") {
              return e;
            }
          });

          setToonList(toonData);
          setFetching(false);
        } else {
          throw new Error("업로드 후 데이터 업데이트 실패");
        }

        setModal(false);
      } catch (error) {
        console.log(error);
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("다시 확인해주세요.");
    }
  };

  return (
    <>
      {fetching && (
        <dialog className={styles.fetching}>
          <p>데이터 전송중~~~~</p>
        </dialog>
      )}

      <div className={styles.toonmodalpage}>
        <form
          ref={formRef}
          encType="multipart/form-data"
          className={styles.toonform}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.toonformleft}>
              <label htmlFor="image">
                <div className={styles.fileselectbtn}>파일선택하기</div>
              </label>
              <input
                ref={imgFilesRef}
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                multiple
                onChange={handleImgFileChange}
              />
              <div className={styles.toonformleftcon}>
                {imgFiles &&
                  imgFiles.map((e, i) => (
                    <div key={i} style={{ display: "flex" }}>
                      <p>{e.name}</p>
                      <button onClick={handledelete(i)}>삭제</button>
                    </div>
                  ))}
              </div>
            </div>
            <button className={styles.alignbtn} onClick={handleSort}>
              정렬
            </button>
          </div>

          <div>
            <div className={styles.toonformright}>
              <label>title</label>
              <input type="text" name="title01" required placeholder={"타이틀을 입력하세요"}></input>

              <label>설명</label>
              <textarea name="desc" required placeholder={"간단한 설명을 작성해주세요"} />
              <label>키워드</label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" name="keyword1" required placeholder={"키워드1"}></input>
                <input type="text" name="keyword2" required placeholder={"키워드2"}></input>
                <input type="text" name="keyword3" required placeholder={"키워드3"}></input>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <input className={styles.uploadbtn} type="submit" value="업로드하기"></input>
              <div className={styles.admincrudbtn} onClick={handleClose}>
                취소
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
