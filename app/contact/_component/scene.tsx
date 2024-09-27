"use client";
// import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function Scene({ ...props }) {
  const postbox = useLoader(GLTFLoader, "/assets/3d/postbox5.glb");
  const letter = useLoader(GLTFLoader, "/assets/3d/letter.glb");

  const { camera } = useThree();

  const [letterMoving_1, setLetterMoving_1] = useState(true);
  const [letterMoving_2, setLetterMoving_2] = useState(false);
  const [letterMoving_3, setLetterMoving_3] = useState(false);

  const [camMoving, setCamMoving] = useState(true);

  const letterRef = useRef<THREE.Group>();

  useEffect(() => {
    if (letterRef.current) {
      console.log(letterRef.current.children);
      // children[0].children[0] === 뚜껑

      letterRef.current.children[0].children[0].rotation.set(3.08, 0, 0);
      letterRef.current.children[0].children[0].position.set(0, 7, 4);
    }
  });

  useFrame(() => {
    if (camera) {
      camera.lookAt(0, 20, 0);
      if (camMoving) {
        camera.position.lerp(new THREE.Vector3(50, 55, 30), 0.01);

        if (camera.position.y >= 54.9 && camera.position.z >= 29.8) {
          setCamMoving(false);
        }
      }
    }

    if (letterRef.current) {
      if (letterMoving_1) {
        const targetQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(9.35, Math.PI, 3.14)
        );
        letterRef.current.children[0].children[0].quaternion.slerp(
          targetQuaternion,
          0.04
        );
        letterRef.current.children[0].children[0].position.lerp(
          new THREE.Vector3(0, 3.5, 0.3),
          0.04
        );

        const difference =
          letterRef.current.children[0].children[0].quaternion.angleTo(
            targetQuaternion
          );

        // 차이가 임계값 이하인지 확인
        if (difference < 0.1) {
          setLetterMoving_1(false);
          setLetterMoving_2(true);
        }
      }

      if (letterMoving_2) {
        letterRef.current.children[0].children[0].rotation.set(
          9.35,
          Math.PI,
          3.14
        );
        letterRef.current.children[0].children[0].position.set(0, 3.5, 0.3);

        const targetQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(1.57, 3, 0)
        );
        letterRef.current.quaternion.slerp(targetQuaternion, 0.05);

        // Quaternion 간의 차이 계산
        const difference =
          letterRef.current.quaternion.angleTo(targetQuaternion);

        // 차이가 임계값 이하인지 확인
        if (difference < 0.1) {
          setLetterMoving_2(false);
          setLetterMoving_3(true);
        }
      }

      if (letterMoving_3) {
        letterRef.current.children[0].children[0].rotation.set(
          9.35,
          Math.PI,
          3.14
        );
        letterRef.current.children[0].children[0].position.set(0, 3.5, 0.3);

        letterRef.current.position.lerp(new THREE.Vector3(0, 43, 0), 0.03);

        if (letterRef.current.position.x === 0) {
          setLetterMoving_3(false);
        }
      }

      // const currentRotation = new THREE.Vector3().copy(letterRef.current.rotation);
      // const targetRotation = new THREE.Vector3(Math.PI / 2, Math.PI / 2, 0);
      // currentRotation.lerp(targetRotation, 0.01);
      // letterRef.current.rotation.set(currentRotation.x, currentRotation.y, currentRotation.z);
    }
  });

  return (
    <>
      <primitive
        name={"postbox"}
        object={postbox.scene}
        scale={[1, 1, 1]}
        rotation={[0, Math.PI / 2, 0]}
      />

      <primitive
        ref={letterRef}
        name={"letter"}
        object={letter.scene}
        position={[40, 40, 0]}
        scale={[0.7, 0.7, 0.7]}
        rotation={[0, Math.PI / 2, 0]}
      />

      <directionalLight
        castShadow
        intensity={0.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        position={[100, 100, 100]}
      />

      <hemisphereLight
        name="Default Ambient Light"
        intensity={0.75}
        color="#eaeaea"
      />

      <OrthographicCamera name="ortho" makeDefault={false} />

      <PerspectiveCamera
        name="perspective"
        makeDefault={true}
        near={1}
        far={900}
        position={[70, 30, 0]}
        zoom={0.5}
      />
    </>
  );
}
