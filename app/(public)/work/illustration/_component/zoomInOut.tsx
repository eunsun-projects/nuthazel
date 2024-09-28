"use client";
import styles from "@/styles/illust.module.css";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";

interface ZoomInOutProps {
  imgSrc: string;
  size: string | null;
  mobile: boolean;
}

export default function ZoomInOut({ imgSrc, size, mobile }: ZoomInOutProps) {
  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={5}
      // centerZoomedOut={true}
      // centerOnInit={mobile ? true : false}
      // disablePadding={true}
      limitToBounds={false}
    >
      {({ resetTransform }) => {
        resetTransform();
        return (
          <>
            <Inner />
            <TransformComponent
              wrapperStyle={{
                height: "100%",
                width: "100vw",
              }}
              contentClass={
                size === "wide" ? styles.transformdesktop : undefined
              }
              contentStyle={{ height: "100%", margin: "auto" }}
            >
              <figure
                className={styles.figurediv}
                style={{
                  marginBlockEnd: "0",
                  marginBlockStart: "0",
                  marginInlineStart: "0",
                  marginInlineEnd: "0",
                }}
              >
                {size === "wide" && (
                  <img
                    className={styles.bigmodalimg}
                    src={imgSrc}
                    alt="wideimage"
                  />
                )}
                {size === "square" && (
                  <img
                    className={styles.bigmodalimg2}
                    src={imgSrc}
                    alt="sqimage"
                  />
                )}
                {size === "narrow" && (
                  <img
                    className={styles.bigmodalimg3}
                    src={imgSrc}
                    alt="narrowimage"
                  />
                )}
              </figure>
            </TransformComponent>
          </>
        );
      }}
    </TransformWrapper>
  );
}

function Inner() {
  const { instance, resetTransform } = useControls();

  instance.onChange((ref) => {
    if (ref.state.scale === 5) {
      resetTransform(0.1, "linear");
      alert("최대 사이즈입니다 :)");
    }
  });

  return <></>;
}
