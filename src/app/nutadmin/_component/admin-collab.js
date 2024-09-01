'use client'
import styles from '@/app/nutadmin/page.module.css'
import IllustCollabModal from './illustcollabmodal'
import { useState } from 'react';
import List from './list';

export default function AdminCollab({data}){
    // console.log(data)
    const [modal, setModal] = useState(false);
    const [currNum, setCurrNum] = useState(null);
    const [collabList, setCollabList] = useState(data);

    const handleModal = () => {
        setModal(true);
        setCurrNum(null);
    };

    return(
        <>
        <div className={styles.toonadminpage}>
            {modal && <IllustCollabModal  type={'collab'} setModal={setModal} data={collabList} currNum={currNum} setToonList={setCollabList}/>}
            
            <div style={{height: 'fit-content', width: "100%", display: "flex", gap: "0.5rem", flexDirection: "column"}}>
                <div className={styles.newbtn}>
                    <p 
                        onClick={handleModal}
                        style={{cursor: "pointer"}}
                    >새로추가하기</p>
                </div>
                
                <div className={styles.index}>
                    <p>목록</p>
                </div>

                <List data={collabList} setModal={setModal} setCurrNum={setCurrNum} setList={setCollabList} type={'collab'} />
                    
            </div>
            
        </div>
        </>
    )
}