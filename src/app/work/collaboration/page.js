import CollaborationPage from "@/app/work/collaboration/_component/collaboration";
import { Suspense } from "react";
import Config from "@/config/config.export";
import Loading from "@/app/loading";
import { basicMeta, basicViewport } from "@/app/basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export async function getData (){
    try{

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

            const collab = result.nuthazelall.filter((e)=>{
                return e.category === 'collab'
            })
            
            return collab
        }else{
            console.log('데이터 수신 실패', response.statusText)
            return []
        }

    }catch(error){
        console.log(error)
    }
};

export default async function Collaboration(){

    const result = await getData();

    return(
        <Suspense fallback={<Loading />}>
            <CollaborationPage collab={result}/>
        </Suspense>
    )
}