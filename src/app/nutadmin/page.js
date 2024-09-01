import Config from "../../config/config.export";
import { getServerSession } from "next-auth"
import { authOptions } from '../api/auth/[...nextauth]/route'
import AdminMain from "./_component/admin-main";
import Login from "./_component/login";
import { basicMeta, basicViewport } from "@/app/basicmeta";
import ToHome from "./_component/toHome";

export const metadata = basicMeta;
export const viewport = basicViewport;

export async function getData(session){
    //|| session.user.email === process.env.NEXT_PUBLIC_VANKO_MAIL
    if(session && (session.user.email === process.env.NEXT_PUBLIC_SCREEN_MAIL || session.user.email === 'buddinib@gmail.com')){

        const req = {
            method: 'GET',
            cache : 'no-store', //매번 새로 데이터 받아오기
            headers: {
                // 'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${process.env.POST_TOKEN}`
            },
            // body: JSON.stringify({action: "data please"})
        };

        const response = await fetch(`${Config().baseUrl}/api/nutget`, req);

        if (response.ok) {
            const result = await response.json(); //응답 body를 .json(풀어헤쳐서) result에 담아라.
            console.log('데이터 수신 성공');

            // const data = {
            //     nuthazelall : result,
            // }
            return result.nuthazelall
        }else{
            console.log('데이터 수신 실패', response.statusText)
            return []
        }
    //session없으면 null
    }else{
        return null
    }
}

export default async function NutAdminPage(){

    const session = await getServerSession(authOptions);

    let result = null;
    if(session){
        result = await getData(session);
    }else{
        result = null;
    }

    return(
        <>
        { session ? 
            (<AdminMain data = {result}/>) 
            : (
                <div>
                    로긴하세욤.
                    <Login />
                    <br />
                    <ToHome />
                </div>)
        }
        </>
    )
}