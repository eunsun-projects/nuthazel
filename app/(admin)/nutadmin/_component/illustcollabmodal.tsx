"use client";

import styles from "@/styles/admin.module.css";
import { Collabo, Illust } from "@/types/NutHazel.type";
import convertToWebP from "@/utils/convertToWebp";
import urlRegexTest from "@/utils/urlRegexTest";
import { useRef, useState } from "react";

interface IllustCollabModalProps {
  setModal: (modal: boolean) => void;
  data: Illust[] | Collabo[];
  currNum: number | null;
  setToonList: (toonList: any) => void;
  type: string;
}
export default function IllustCollabModal({
  setModal,
  data,
  currNum,
  setToonList,
  type,
}: IllustCollabModalProps) {
  const [imgFiles, setImgFiles] = useState<File[] | null>(null);
  const [lastNum, setLastNum] = useState(data ? data.length + 1 : 1); // index 와 다르게 데이터는 1부터 시작하므로
  const [fetching, setFetching] = useState(false);

  const imgFilesRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    setModal(false);
  };

  const sorting = () => {
    if (imgFiles) {
      console.log("정렬됨");
      const copy = [...imgFiles];
      const sorted = copy.sort((a, b) => {
        const matchA = a.name.match(/(\d+)(?=\.(?:jpg|jpeg|png|JPG|JPEG|PNG)$)/);
        const matchB = b.name.match(/(\d+)(?=\.(?:jpg|jpeg|png|JPG|JPEG|PNG)$)/);

        const numberA = matchA ? parseInt(matchA[1], 10) : 0;
        const numberB = matchB ? parseInt(matchB[1], 10) : 0;

        return numberA - numberB;
      });

      // console.log(sorted)
      setImgFiles(sorted);
    }
  };

  const handleCollabSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm("첫번째 파일(파일명0.png)는 배경이 투명해야 합니다, 확인하셨습니까")) {
      sorting();
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

        let actionType = "";
        let folder = "";
        let webps: File[] = [];

        // 일러스트가 아니면(콜라보이면) 모두 720 으로 변환
        if (type !== "illust") {
          webps = await Promise.all(
            imgFiles.map((img) => {
              return convertToWebP(img, 1600, 9000);
            })
          );
          // 일러스트 이면 첫번째는 720 두번째는 1920으로 변환
        } else {
          const doubleImg = [imgFiles[0], imgFiles[0]];
          webps = await Promise.all(
            doubleImg.map((img, i) => {
              if (i === 0) {
                return convertToWebP(img, 1280, 720);
              } else {
                return convertToWebP(img, 1980, 1920, true);
              }
            })
          );
        }

        // formData 인스턴스를 생성합니다.
        const formData = new FormData();

        //currNum이면 수정이라는 뜻.
        if (currNum !== null && data) {
          if (type === "illust") {
            actionType = "illustupdate";
            folder = "illustration";
          } else {
            actionType = "collabupdate";
            folder = "collaboration";
          }
          const result = data.filter((e) => e.num === currNum)[0];
          const oldTitle = result.title;
          formData.append("oldtitle", oldTitle);

          formData.append("pageurl", `/work/${folder}?num=${String(currNum)}`);
        } else {
          if (type === "illust") {
            actionType = "illustupload";
            folder = "illustration";
            formData.append("pageurl", `/work/${folder}?num=${String(lastNum)}`);
          } else {
            actionType = "collabupload";
            folder = "collaboration";
            formData.append("pageurl", `/work/${folder}?num=${String(lastNum)}`);
          }
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

        // 링크를 사용하면서, 제대로 입력했으면 true / 사용하지 않으면 false / 실수하면 alert
        // 만약 타입이 콜라보면 formData 에 link 프로퍼티도 추가
        if (type === "collab") {
          // const target = formRef.current;
          const linkTitle = target.linktitle.value;
          const linkHref = target.linkhref.value;

          // 안쓰면 넘어가고, 썼으면 주소형식 맞는지 확인하고, 맞으면 formData 에 적용
          // 썼을 경우(둘다 썼을 경우임)
          if (linkTitle.length > 0 && linkHref.length > 0) {
            const isValidUrl = urlRegexTest(linkHref);
            // 주소 검증 통과 하면
            if (isValidUrl) {
              formData.append("linktitle", linkTitle);
              formData.append("linkhref", linkHref);
              // 주소 검증 통과 못하면(잘못썼을경우)
            } else {
              alert("링크 주소를 다시 확인해주세요(무언가를 빠트린것 같아요...)");
              // 아래 setState 안하면 계속 데이터 전송중 떠있음
              setFetching(false);
              // 검증 통과 못했기 때문에 submit 함수 종료
              return;
            }
            // 둘다 안썼을 경우
          } else if (linkTitle.length === 0 && linkHref.length === 0) {
            formData.append("linktitle", "");
            formData.append("linkhref", "");
            // 하나만 쓴경우
          } else if (linkTitle.length === 0 || linkHref.length === 0) {
            // 타이틀, 주소 둘중에 하나만 쓰면 얼리 리턴
            alert("링크 타이틀 혹은 링크 주소가 비워져 있는 것 같아요");
            setFetching(false);
            return;
          }
        }

        // ================= 아래 부터 fetch 시작 ====================
        // 위에서 만든 formDat를 종합하여 request 객체 생성, method POST
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

          const illustcollabData = result.nuthazelall.filter((e) => {
            if (e.category === type) {
              return e;
            }
          });
          setToonList(illustcollabData);
          // fetch 끝나면 (데이터 전송중 글자 true면 뜨고 false 꺼짐)
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
                <div className={styles.fileselectbtn}>
                  <span style={{ fontWeight: "bold" }}>파일선택하기</span>
                  <span>{type === "collab" && "첫번째 파일(파일명0.png)는 배경이 투명해야 합니다"}</span>
                </div>
              </label>
              {type === "collab" ? (
                <input
                  ref={imgFilesRef}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={handleImgFileChange}
                />
              ) : (
                <input
                  ref={imgFilesRef}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg"
                  onChange={handleImgFileChange}
                />
              )}
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
            {type === "collab" && (
              <button className={styles.alignbtn} onClick={handleCollabSort} style={{ cursor: "pointer" }}>
                정렬
              </button>
            )}
          </div>

          <div>
            <div className={styles.toonformright}>
              <label>title</label>
              <input type="text" name="title01" required placeholder={"타이틀을 입력하세요"}></input>

              <label>설명</label>
              <textarea name="desc" required placeholder={"간단한 설명을 작성해주세요"} />

              {type === "collab" && (
                <>
                  <label>링크</label>
                  <div className={styles.linkbox}>
                    <input type="text" name="linktitle" placeholder={"표시할문구"}></input>
                    <input type="text" name="linkhref" placeholder={"링크주소"}></input>
                  </div>
                </>
              )}

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
