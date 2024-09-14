// 받은 파라이터를 정규식으로 검사해서 만약 적합한 url 형식이면 boolean 반환 하는 함수
export default function urlRegexTest(url: string) {
  // 아래 정규식은 아무튼 주소인지 판단하는 것임
  const regex =
    /^(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/;

  return regex.test(url);
}
