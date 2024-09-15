import { basicMeta, basicViewport } from "@/app/basicmeta";
import { authOptions } from "@/nextAuth/authOptions";
import { getServerSession, Session } from "next-auth";
import Config from "../../config/config.export";
import { NutHazelResponse } from "../api/nutget/route";
import AdminMain from "./_component/admin-main";
import Login from "./_component/login";
import ToHome from "./_component/toHome";

export const metadata = basicMeta;
export const viewport = basicViewport;

export async function getData(session: Session) {
  const isAdmin =
    session &&
    (session.user?.email === process.env.NEXT_PUBLIC_SCREEN_MAIL ||
      session.user?.email === "buddinib@gmail.com");
  if (isAdmin) {
    const req = {
      method: "GET",
      cache: "no-store", //매번 새로 데이터 받아오기
      headers: {
        Authorization: `Bearer ${process.env.POST_TOKEN}`,
      },
    };

    const response = await fetch(
      `${Config().baseUrl}/api/nutget`,
      req as RequestInit
    );

    if (response.ok) {
      const result: NutHazelResponse = await response.json();
      console.log("데이터 수신 성공");

      return result.nuthazelall;
    } else {
      console.log("데이터 수신 실패", response.statusText);
      return [];
    }
    //session없으면 null
  } else {
    return null;
  }
}

export default async function NutAdminPage() {
  const session = await getServerSession(authOptions);

  let result: NutHazelResponse["nuthazelall"] | null = null;
  if (session) {
    result = await getData(session);
  } else {
    result = null;
  }

  return (
    <>
      {session ? (
        <AdminMain data={result} />
      ) : (
        <div>
          로긴하세욤.
          <Login />
          <br />
          <ToHome />
        </div>
      )}
    </>
  );
}
