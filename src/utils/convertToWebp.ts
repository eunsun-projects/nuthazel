export default function convertToWebP(
  inputFile: File,
  maxWidth: number,
  maxHeight: number,
  isSecond = false
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 정방형 이미지 처리
        if (width === height) {
          // 정방형 이미지의 경우, maxWidth와 maxHeight 중 더 작은 값으로 크기를 조정합니다.
          const minSize = Math.min(maxWidth, maxHeight);
          width = minSize;
          height = minSize;
        } else if (width > height) {
          // 가로가 세로보다 클 경우
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          // 세로가 가로보다 클 경우
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("캔버스를 Blob으로 변환하는 데 실패했습니다."));
            return;
          }
          let fileName = inputFile.name;
          if (isSecond) {
            const splited = inputFile.name.split(".");
            fileName = `${splited[0]}_high.${splited[1]}`;
          }
          const newFile = new File([blob], fileName, { type: "image/webp" });
          resolve(newFile);
        }, "image/webp");
      };

      img.onerror = () => {
        reject(new Error("이미지를 로드하는 데 실패했습니다."));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("파일을 읽는 데 실패했습니다."));
    };

    reader.readAsDataURL(inputFile);
  });
}
