"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./scene";

export default function CanvasComp() {
  //canvas태그에 linear 속성 뺌.
  return (
    <Suspense fallback={null}>
      <div style={{ height: "60vh", width: "100%", margin: "0 auto" }}>
        <Canvas shadows flat>
          <Scene />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
    </Suspense>
  );
}
