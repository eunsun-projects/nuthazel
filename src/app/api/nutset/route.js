import { headers } from "next/headers";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { storage, auth } from '@/app/firebaseConfig';
import adminReady from "../../../firebase/admin";

const random = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';

    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;

};

async function putStorageItem(item, folder, index){
    // const bytes = await item.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    const name = `${item.name.trim().replace(/(.png|.jpg|.jpeg|.gif)$/,'')}${random(6)}`;

    const reference = ref(storage, `assets/${folder}/${name}`);
    const metadata = {
        contentType: 'image/webp',
        customMetadata: {
            'num': index,
            'name': item.name.toLowerCase().replace('.jpg', '')
        }
    };

    const snapshot = uploadBytes(reference, item, metadata);
    return snapshot;
};

export async function POST(request){

    try{
        // 요청 본문 파싱 - formdata 그대로 일때
        // const req = await request.formData();
        // 요청 본문 파싱 - body 일때
        const req = await request.formData();

        const files = [];
        const metaData = {};
        let oldTitle = '';
        let actionType = '';
        for(let [key, value] of req.entries()) {
            // console.log(key, value);
            // 키가 img files 에다가 값(files === 이미지 파일들) 추가
            if(key === 'img'){
                files.push(value);
            // 키가 keywords 면 keywords : [값 배열]
            }else if(key === 'keywords'){
                metaData[key] = value.split(',');
            // 키가 num 이면 num : 넘버
            }else if(key === 'num'){
                metaData[key] = Number(value);
            // 키가 oldTitle 이면 oldtitle 용 변수에 oldtitle 할당 (주의! 얘는 파이어베이스에 보낼 객체 설정 하는애가 아님!!!)
            }else if(key === 'oldtitle'){
                oldTitle = value;
            // 키가 isPublic 이면 isPublic : boolean
            }else if(key === 'isPublic'){
                metaData[key] = value === 'true' ? true : false;
            // 키가 link 관련일때 처리
            }else if(key === 'linktitle'){
                metaData['link'] = {
                    title : value
                }
            }else if(key === 'linkhref'){
                metaData['link'].href = value;
            // 키가 action 이 아니면 === 즉 나머지 모두 해당(키가 무엇이든 간에) 해당키 : 값
            }else if(key !== 'action'){
                metaData[key] = value;
            // 바로위 if 문의 예외상황 === 즉 키가 action 일때
            }else{
                actionType = value;
            }
        };

        // console.log(files)
        // console.log(metaData)
        // console.log(actionType)

        //헤더에서 인증 토큰 추출
        const headersList = headers();
        const referer = headersList.get("authorization");
        const token = referer ? referer.split(' ')[1] : null;

        // 토큰 검증 로직 (예: 환경 변수에 저장된 토큰과 비교)
        if (!token || token !== process.env.POST_TOKEN) {
            return Response.json({message: '요청 헤더 토큰 확인하세요'} , {status: 401})
        }

        const userCredential = await signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_SCREEN_MAIL, process.env.NEXTAUTH_SECRET);

        if(!userCredential.user.uid){
            return Response.json({message: '파이어베이스 로그인 안되서 실패'} , {status: 401});
        };

        const firestore = adminReady.firestore();
        const nuthazelCollection = await firestore.collection('nuthazelall').get(); //orderBy("publicNum")

        let category = '';
        if(actionType === 'toonupload' || actionType === 'toonupdate' || actionType === 'toonupdate'){
            category = 'toon';
        }else if(actionType === 'illustupload' || actionType === 'illustupdate' || actionType === 'illustdelete'){
            category = 'illust';
        }else{
            category = 'collab';
        }

        if(actionType === 'toonupload' || actionType === 'illustupload' || actionType === 'collabupload'){

            metaData.category = category;
            metaData.time = new Date();

            // promise.all 을 사용해서 putStorageItem 을 files 의 수만큼 돌려 돌려~ 이러면 resolve 를 보장받을 수 있음
            const snapshots = await Promise.all(files.map((item, index) => putStorageItem(item, category, index))); // pusStorageItem 이 promise 를 리턴해야함
            // 위에서 만든 snapshots 를 또 promise.all 해서 getDownloadURL~~~ .ref 를 파라미터로 넣어줘야함!
            const urls = await Promise.all(snapshots.map((e) => getDownloadURL(e.ref)));
            // urls 에는 파이어베이스 스토리지에 업로드 된 webp 들의 실제 주소가 배열로 담겨있음!
            metaData.imgurl = urls;

            // console.log(metaData);

            // 이왕이면 트랜젝션으로! 하나씩 순서대로 겹치지 않게 처리되게끔!
            await firestore.runTransaction(async (transaction) => {
                const docRef = firestore.collection('nuthazelall').doc(); // 새 문서 참조 생성
                transaction.set(docRef, metaData); // 새 문서에 데이터 쓰기

                console.log(docRef.id);
            });

            return Response.json({message : `성공 횟수 ${urls.length} 회`}, {status: 200}); //

        }else if(actionType === 'toonupdate' || actionType === 'illustupdate' || actionType === 'collabupdate'){

            metaData.category = category;
            metaData.time = new Date();

            // 여기에 이미지는 추가 안할 것을 생각해서 if 문 추가할 것??
            // promise.all 을 사용해서 putStorageItem 을 files 의 수만큼 돌려 돌려~ 이러면 resolve 를 보장받을 수 있음
            const snapshots = await Promise.all(files.map((item, index) => putStorageItem(item, category, index))); // pusStorageItem 이 promise 를 리턴해야함
            // 위에서 만든 snapshots 를 또 promise.all 해서 getDownloadURL~~~ .ref 를 파라미터로 넣어줘야함!
            const urls = await Promise.all(snapshots.map((e) => getDownloadURL(e.ref)));
            // urls 에는 파이어베이스 스토리지에 업로드 된 webp 들의 실제 주소가 배열로 담겨있음!
            metaData.imgurl = urls;

            // 수정일 경우 num 의 값에 주의할 것!!!!
            // 여기서 타이틀 수정하면 문서 못찾음 기존 문서로 해야함...
            try{
                //타이틀로 맞추는 방법은 타이틀이 같을경우 문제가 되므로 나중에 id값으로 바꿔주거나...!!!!!!!!!!!!!!!!!!
                const querySnapshot = await firestore.collection('nuthazelall').where('title', '==', oldTitle).get();

                if(!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // 첫 번째 문서를 가정 (고유한 title을 기준으로 검색했다고 가정)
                    const docRef = firestore.collection('nuthazelall').doc(doc.id);
                    await docRef.update(metaData); // 새 문서에 데이터 쓰기
                }

                return Response.json({message : `성공 횟수 ${urls.length} 회`}, {status: 200}); //

            }catch(error){
                throw new Error(error);
            }

        }else if(actionType === 'toondelete' || actionType === 'illustdelete' || actionType === 'collabdelete'){

            let fullcategory = '';
            if(category === 'toon'){
                fullcategory = 'toon';
            }else if(category === 'illust'){
                fullcategory = 'illustration';
            }else{
                fullcategory = 'collaboration';
            }
            try{
                const querySnapshot = await firestore.collection('nuthazelall').where('title', '==', metaData.title).get(); // 새 문서 참조 생성
                if(!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0]; // 첫 번째 문서를 가정 (고유한 title을 기준으로 검색했다고 가정)
                    const docRef = firestore.collection('nuthazelall').doc(doc.id);
                    await docRef.delete();
                    console.log("Document successfully deleted!");
                    // 해당 카테고리의 전체 문서 참조 생성
                    const allCategorizedSnapshot = await firestore.collection('nuthazelall').where('category', '==', category).get(); 
                    if (!allCategorizedSnapshot.empty) {
                        const sortedDocs = allCategorizedSnapshot.docs
                            .map(doc => ({ id: doc.id, num: doc.data().num }))
                            .sort((a, b) => a.num - b.num); // num 기준으로 정렬
                        
                        // num 재정렬
                        for (let i = 0; i < sortedDocs.length; i++) {
                            const docRef = firestore.collection('nuthazelall').doc(sortedDocs[i].id);
                            await docRef.update({ 
                                num : i + 1,
                                pageurl : `/work/${fullcategory}?num=${String(i + 1)}`
                            });
                        }
                        console.log("Reordered numbers successfully!");
                    }
                }
                return Response.json({message : `삭제 성공`}, {status: 200}); //

            }catch(error){
                console.error("Error handling documents: ", error);
                throw new Error(error);
            }
        }

        
    }catch(error){

        console.log('흠...무서워서 원', error.message)

        return Response.json({message: error.message} , {status: 401})
    }
}

// const files = [];
// // Display the values
// for (const value of req.values()) {
//     files.push(value);
// }
// const files = req.get('file');