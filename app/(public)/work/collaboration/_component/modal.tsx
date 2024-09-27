"use client";
import styles from "@/app/work/collaboration/page.module.css";
import NImage from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface ModalProps {
  setModalOpen: (open: boolean) => void;
  collabocontents: FirebaseFirestore.DocumentData;
  setQueryNum: (num: number | null) => void;
}

export default function Modal({
  setModalOpen,
  collabocontents,
  setQueryNum,
}: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  // collabo 스테이트는 이미지 정방인지 뭔지 판단하는 것임
  const [collabo, setCollabo] = useState<FirebaseFirestore.DocumentData | null>(
    null
  );

  const contentsRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);

  const handlex = () => {
    setModalOpen(false);
    router.replace(pathname);
    setQueryNum(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === contentsRef.current || e.target === xRef.current) {
      // console.log(e.target)
      setModalOpen(false);
      router.replace(pathname);
    }
  };

  useLayoutEffect(() => {
    function sizePromises(src: string) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          if (width > height) {
            resolve("wide");
          } else if (width === height) {
            resolve("square");
          } else {
            resolve("narrow");
          }
        };
        image.onerror = () => {
          reject(new Error("이미지 비율판단 실패"));
        };
      });
    }
    // 콜라보 요소를 클릭했을 때 === selectedIndex 가 null 이 아닐 때
    if (collabocontents !== null) {
      // 선택된 아이템 객체 복사
      const copy = { ...collabocontents };

      Promise.all(copy.imgurl.map((e: string) => sizePromises(e)))
        .then((result) => {
          copy.sizes = result;
          // 완성된 카피 객체로 setState
          setCollabo(copy);
        })
        .catch((error) => console.log(error));
    }
  }, [collabocontents]);

  useEffect(() => {
    // document.body.style.overflow = "hidden";

    return () => {
      setCollabo(null);
    };
  }, []);

  return (
    <div onClick={handleClick} className={styles.modalbox}>
      <div ref={xRef} className={styles.xbtn}>
        <span onClick={handlex}>X</span>
      </div>
      <div ref={contentsRef} className={styles.modalconbox}>
        <div className={styles.modalcontents}>
          <div className={styles.contents}>
            <div className={styles.modalcontitle}>
              <img
                className={styles.modalflower}
                src="/assets/collabo/flower1.webp"
                alt="flower1"
              ></img>
              <p>{collabocontents.title}</p>
              <img
                className={styles.modalflower}
                src="/assets/collabo/flower1.webp"
                alt="flower2"
              ></img>
            </div>

            <div className={styles.modalcondesc}>
              <p
                style={{
                  paddingBottom:
                    collabocontents.link.title.length > 0 ? "1rem" : "0px",
                }}
              >
                {collabocontents.desc}
              </p>
              {/** length 로 판단하는 이유는, collabo 면 nutadmin에서 link 객체가 무조건 있기 때문에*/}
              {collabocontents.link.title.length > 0 && (
                <Link
                  href={collabocontents.link.href}
                  target="_blank"
                  style={{ color: "#916b4d" }}
                >
                  <p>{collabocontents.link.title}</p>
                </Link>
              )}
            </div>
            <div className={styles.modalconimgdiv}>
              <div className={styles.modalconimgbox}>
                {!collabo && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        position: "relative",
                        width: "20%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      src="/assets/loading.gif"
                    ></img>
                  </div>
                )}

                {collabo &&
                  collabo.imgurl.map((e: string, i: number) => {
                    if (collabo.sizes[i] === "wide") {
                      return (
                        <div key={i} className={styles.modalimgbox}>
                          <NImage
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "auto",
                            }}
                            priority
                            src={e}
                            alt="elements"
                            // fill
                            width={0}
                            height={0}
                            sizes="(max-width: 1920px) 100%, 100%"
                          />
                        </div>
                      );
                    } else if (collabo.sizes[i] === "square") {
                      return (
                        <div key={i} className={styles.modalsquareimgbox}>
                          <NImage
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "auto",
                            }}
                            priority
                            src={e}
                            alt="elements"
                            // fill
                            width={0}
                            height={0}
                            sizes="(max-width: 1920px) 100%, 100%"
                          />
                        </div>
                      );
                    } else if (collabo.sizes[i] === "narrow") {
                      return (
                        <div key={i} className={styles.modalimgbox}>
                          <NImage
                            style={{
                              objectFit: "contain",
                              width: "100%",
                              height: "100%",
                            }}
                            priority
                            src={e}
                            alt="elements"
                            // fill
                            width={0}
                            height={0}
                            sizes="(max-width: 1920px) 100%, 100%"
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
