"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Color } from "three";

function loadImageToCanvas(url: string, canvas: HTMLCanvasElement) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function extractColorsFromBMP(url: string) {
  const canvas = document.createElement("canvas");
  await loadImageToCanvas(url, canvas);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const width = canvas.width;
  const height = canvas.height;
  const colors = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const data = ctx?.getImageData(x, y, 1, 1).data;
      if (data) {
        const colorValue = new THREE.Color(
          `rgb(${data[0]}, ${data[1]}, ${data[2]})`
        );
        colors.push(colorValue);
      }
    }
  }
  return colors;
}

function rgbToHex(r: number, g: number, b: number) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  if (r === 0 && g === 0 && b === 0) {
    return "000000";
  } else {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
}

const BoxGrid = () => {
  const size = 1; // 각 상자의 크기 0.4
  const gap = 0.001; // 상자 사이의 간격
  const totalSize = 30 * (size + gap);
  const totalWidth = (size + gap) * 30 - gap; // 30
  const totalHeight = (size + gap) * 30 - gap;

  const [colorArr, setColorArr] = useState<THREE.Color[] | null>(null);

  useEffect(() => {
    extractColorsFromBMP("/assets/nuthazellogo.bmp").then((colors) => {
      const reverse = colors.reverse();
      setColorArr(reverse);
    });
  }, []);

  return (
    <>
      <ambientLight color={0xffffff} intensity={8} />
      {colorArr &&
        colorArr.map((color, index) => {
          const row = Math.floor(index / 30);
          const col = index % 30;

          return (
            <group
              key={index}
              position={[
                -totalWidth / 2 + size / 2,
                -totalHeight / 2 + size / 2,
                0,
              ]}
            >
              <mesh
                position={[col * (size + gap), row * (size + gap), 0]}
                visible={
                  color.r === 1 && color.g === 1 && color.b === 1 ? false : true
                }
                // receiveShadow
                // castShadow
              >
                <boxGeometry args={[size, size, size]} />
                <meshPhongMaterial attach="material" color={color} />
              </mesh>
            </group>
          );
        })}
      <perspectiveCamera />
    </>
  );
};

export default function NutHazelLogo() {
  return (
    <Canvas dpr={[1, 2]}>
      <scene background={new Color("#ffffff")} />
      <BoxGrid />
    </Canvas>
  );
}
