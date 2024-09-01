'use client'
import styles from '@/app/nutadmin/page.module.css';
import ToonModal from './toonmodal';
import { useState } from 'react';
import List from './list';

export default function AdminToon({data}){
    const [modal, setModal] = useState(false);
    const [currNum, setCurrNum] = useState(null);
    const [toonList, setToonList] = useState(data);

    const handleModal = () => {
        setModal(true);
        setCurrNum(null);
    };

    return(
        <>
        <div className={styles.toonadminpage}>
            {modal && <ToonModal setModal={setModal} data={toonList} currNum={currNum} setToonList={setToonList}/>}
            
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

                <List data={toonList} setModal={setModal} setCurrNum={setCurrNum} setList={setToonList} type={'toon'}/>
                    
            </div>
            
        </div>
        </>
    )
};

