"use client";

import MushroomModal from "@/app/(public)/work/collaboration/_component/mushroommodal";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"; //대문자 Canvas를 불러와라.
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Scene from "./scene";

interface CanvasCompProps {
  classification: string;
}

export default function CanvasComp({ classification }: CanvasCompProps) {
  const router = useRouter();
  const pathname = usePathname(); //해당 페이지 url
  const searchParams = useSearchParams(); //쿼리스트링

  const [modal, setModal] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = () => {
    // console.log('되냐')
    if (classification === "main") {
      // console.log('main')
      router.push("/work/collaboration?num=screenxyz");
    } else {
      console.log("collabo");
      setModal(true);
      router.push(pathname + "?" + createQueryString("num", "screenxyz"));
    }
  };

  useEffect(() => {
    const num = searchParams.get("num");
    if (num === "screenxyz") {
      setModal(true);
      router.push(pathname + "?" + createQueryString("num", "screenxyz"));
    }
  }, [searchParams, router, pathname, createQueryString]);

  return (
    <>
      {modal && <MushroomModal setModalOpen={setModal} />}
      <div style={{ height: "100%", width: "100%" }}>
        <Canvas>
          <Scene classification={classification} handleClick={handleClick} />

          <OrbitControls
            enableZoom={false}
            enableRotate={classification === "main" ? true : false}
            enablePan={false}
            target={[0, 0, 0]}
            maxDistance={0}
            minDistance={7}
            minPolarAngle={1.4}
            maxPolarAngle={0}
          />
        </Canvas>
      </div>
    </>
  );
}
