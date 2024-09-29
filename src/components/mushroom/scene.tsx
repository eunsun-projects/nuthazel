"use client";

import { PerspectiveCamera } from "@react-three/drei"; //R3F에 얹어서 효과같은 것들을 추가적으로 사용할 수 있도록 하는 라이브러리.
import { useFrame, useLoader } from "@react-three/fiber"; //보통 react three를 말하면 요고.R3F로 줄여서도 부름. three를 리액트에 맞춰서 쓸 수 있게 하는 기본 라이브러리.
import { useRef } from "react";
import * as THREE from "three"; //three를 쓰려면 꼭 써야하는 임포트
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"; //얘도 꼭 써야함. glb를 불러오고 싶다면!

interface SceneProps {
  classification: string;
  handleClick: () => void;
}

export default function Scene({ classification, handleClick }: SceneProps) {
  const mushroom = useLoader(GLTFLoader, "/assets/glb/mushroom_join.glb");

  const mushroomRef = useRef<THREE.Group>();

  useFrame(({ clock }, delta) => {
    if (mushroomRef.current && classification !== "main") {
      mushroomRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <>
      <primitive
        ref={mushroomRef}
        castShadow
        name={"mushroom"}
        object={mushroom.scene}
        position={[0, -2, 0]}
        scale={[0.4, 0.4, 0.4]}
        rotation={[0, 0, 0]}
        onClick={handleClick}
      />

      <pointLight
        intensity={20}
        // shadow-mapSize-width={4096}
        // shadow-mapSize-height={4096}
        distance={0}
        decay={2}
        shadow-radius={10}
        shadow-bias={-0.0001}
        position={[0, 10, 0]}
        castShadow
      />

      <hemisphereLight
        name="Default Ambient Light"
        intensity={2}
        // color={'pink'}
        // groundColor={'yellow'}
        // color="#eaeaea"
      />

      <PerspectiveCamera
        name="perspective"
        makeDefault={true}
        near={1}
        far={2000}
        position={[50, 0, 0]}
        rotation={[0, 0, 0]}
        zoom={1}
        fov={50}
      />
    </>
  );
}
