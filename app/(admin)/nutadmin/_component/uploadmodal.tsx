"use client";

import { useCollaboMutation, useIllustMutation, useToonMutation } from "@/hooks/mutations";
import styles from "@/styles/admin.module.css";
import { Collabo, Illust, Toon } from "@/types/NutHazel.type";
import convertToWebP from "@/utils/convertToWebp";
import urlRegexTest from "@/utils/urlRegexTest";
import { useEffect, useRef, useState } from "react";

interface IllustCollabModalProps {
  setModal: (modal: boolean) => void;
  data: Illust[] | Collabo[] | Toon[];
  selected: Toon | Illust | Collabo | null;
  type: string;
}
export default function UpLoadModal({ setModal, data, selected, type }: IllustCollabModalProps) {
  const [imgFiles, setImgFiles] = useState<File[] | null>(null);
  const [fetching, setFetching] = useState(false);
  const imgFilesRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => setModal(false);

  const { mutateAsync: mutateToon, isPending: isPendingToon } = useToonMutation();
  const { mutateAsync: mutateIllust, isPending: isPendingIllust } = useIllustMutation();
  const { mutateAsync: mutateCollabo, isPending: isPendingCollabo } = useCollaboMutation();

  const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let confirmMsg = "";
    if (type === "toon") {
      confirmMsg =
        "정렬하시겠습니까? 파일명은 이름+숫자.확장자로 맞추어주세요. ex) name1.jpg혹은 name1.png";
    } else {
      confirmMsg = "첫번째 파일(파일명0.png)는 배경이 투명해야 합니다, 확인하셨습니까";
    }
    if (confirm(confirmMsg)) {
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
      } else {
        alert("다시 확인하고 시도해주세요");
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
    if (confirm("업로드 하시겠습니까?")) {
      const target = formRef.current;
      if (!target) return;
      const title = (target.title01 as HTMLInputElement).value;
      const desc = (target.desc as HTMLTextAreaElement).value;
      const keywords: string[] = [
        (target.keyword1 as HTMLInputElement).value,
        (target.keyword2 as HTMLInputElement).value,
        (target.keyword3 as HTMLInputElement).value,
      ];
      try {
        let folder = "";
        let webps: File[] = [];

        if (type === "illust") {
          folder = "illustration";
        } else if (type === "collabo") {
          folder = "collaboration";
        } else if (type === "toon") {
          folder = "toon";
        }

        // formData 인스턴스를 생성합니다.
        const formData = new FormData();
        // 아래 수정
        if (selected) {
          formData.append("id", selected.id);
          formData.append("pageurl", `/work/${folder}?num=${String(selected.num)}`);
          // 아래 추가
        } else {
          formData.append("pageurl", `/work/${folder}?num=${String(data.length)}`);
        }

        // formData 에 각 항목 추가
        formData.append("isPublic", "true");
        formData.append("num", selected ? String(selected.num) : String(data.length));
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("keywords", keywords.join(","));

        if (!imgFiles) {
          formData.append("imgs", "");
          formData.append("imgurl", selected?.imgurl.join(",") || "");
        } else {
          if (type === "collabo") {
            webps = await Promise.all(
              imgFiles.map((img) => {
                return convertToWebP(img, 1600, 9000);
              })
            );
            // 일러스트 이면 첫번째는 720 두번째는 1920으로 변환
          } else if (type === "illust") {
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
          } else {
            webps = await Promise.all(
              imgFiles.map((img) => {
                return convertToWebP(img, 1280, 720);
              })
            );
          }
          webps.forEach((e, i) => {
            formData.append("imgs", e, e.name);
          });
        }

        // 링크를 사용하면서, 제대로 입력했으면 true / 사용하지 않으면 false / 실수하면 alert
        // 만약 타입이 콜라보면 formData 에 link 프로퍼티도 추가
        if (type === "collabo") {
          // const target = formRef.current;
          const linkTitle = target.linktitle.value;
          const linkHref = target.linkhref.value;

          // 안쓰면 넘어가고, 썼으면 주소형식 맞는지 확인하고, 맞으면 formData 에 적용
          // 썼을 경우(둘다 썼을 경우임)
          if (linkTitle.length > 0 && linkHref.length > 0) {
            const isValidUrl = urlRegexTest(linkHref);
            const link = `{"title": "${linkTitle}", "href": "${linkHref}"}`;

            // 주소 검증 통과 하면
            if (isValidUrl) {
              formData.append("link", link);
              // 주소 검증 통과 못하면(잘못썼을경우)
            } else {
              alert("링크 주소를 다시 확인해주세요(무언가를 빠트린것 같아요...)");
              // 아래 setState 안하면 계속 데이터 전송중 떠있음
              // 검증 통과 못했기 때문에 submit 함수 종료
              return;
            }
            // 둘다 안썼을 경우
          } else if (linkTitle.length === 0 && linkHref.length === 0) {
            formData.append("link", "");
            // 하나만 쓴경우
          } else if (linkTitle.length === 0 || linkHref.length === 0) {
            // 타이틀, 주소 둘중에 하나만 쓰면 얼리 리턴
            alert("링크 타이틀 혹은 링크 주소가 비워져 있는 것 같아요");
            return;
          }
        } else {
          if (selected?.link) {
            formData.append("link", selected.link as string);
          } else {
            formData.append("link", "");
          }
        }

        // ================= 아래 부터 fetch 시작 ====================
        let res;
        if (type === "toon") {
          res = await mutateToon({ toon: formData, method: "POST" });
        } else if (type === "illust") {
          res = await mutateIllust({ illust: formData, method: "POST" });
        } else if (type === "collabo") {
          res = await mutateCollabo({ collabo: formData, method: "POST" });
        }

        console.log(res);

        setModal(false);
      } catch (error) {
        console.log(error);
        alert("에러가 발생했습니다. 다시 시도해 주세요.");
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
                  <span>{type === "collabo" && "첫번째 파일(파일명0.png)는 배경이 투명해야 합니다"}</span>
                </div>
              </label>
              {type === "collabo" || type === "toon" ? (
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
              <button
                type="button"
                className={styles.alignbtn}
                onClick={handleSort}
                style={{ cursor: "pointer" }}
              >
                정렬
              </button>
            )}
          </div>

          <div>
            <div className={styles.toonformright}>
              <label>title</label>
              <input
                type="text"
                name="title01"
                required
                placeholder={"타이틀을 입력하세요"}
                defaultValue={selected ? selected.title : ""}
              ></input>

              <label>설명</label>
              <textarea
                name="desc"
                required
                placeholder={"간단한 설명을 작성해주세요"}
                defaultValue={selected ? selected.desc : ""}
              />

              {type === "collabo" && (
                <>
                  <label>링크</label>
                  <div className={styles.linkbox}>
                    <input
                      type="text"
                      name="linktitle"
                      placeholder={"표시할문구"}
                      defaultValue={selected?.link ? (selected.link as { title: string }).title : ""}
                    ></input>
                    <input
                      type="text"
                      name="linkhref"
                      placeholder={"링크주소"}
                      defaultValue={selected?.link ? (selected.link as { href: string }).href : ""}
                    ></input>
                  </div>
                </>
              )}

              <label>키워드</label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="text"
                  name="keyword1"
                  required
                  placeholder={"키워드1"}
                  defaultValue={selected ? selected.keywords[0] : ""}
                ></input>
                <input
                  type="text"
                  name="keyword2"
                  required
                  placeholder={"키워드2"}
                  defaultValue={selected ? selected.keywords[1] : ""}
                ></input>
                <input
                  type="text"
                  name="keyword3"
                  required
                  placeholder={"키워드3"}
                  defaultValue={selected ? selected.keywords[2] : ""}
                ></input>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <input
                className={styles.uploadbtn}
                type="submit"
                value="업로드하기"
                style={{ cursor: "pointer" }}
              ></input>
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
