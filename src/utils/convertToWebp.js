export default function convertToWebP(inputFile, maxWidth, maxHeight, isSecond = false) {
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

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    // 두번째 이미지면(고화질저장용) 파일명 뒤에 high 붙임
                    if(isSecond){
                        const splited = inputFile.name.split('.');
                        const newName = splited[0] + '_high.' + splited[1];
                        blob.name = newName;
                    }else{
                        blob.name = inputFile.name;
                    }
                    resolve(blob);
                }, 'image/webp');
            };

            img.onerror = () => {
                reject(new Error("이미지를 로드하는 데 실패했습니다."));
            };

            img.src = e.target.result;
        };

        reader.onerror = () => {
            reject(new Error("파일을 읽는 데 실패했습니다."));
        };

        reader.readAsDataURL(inputFile);
    });
};