'use client'
import styles from '@/app/work/illustration/page.module.css'
import { useRef, useState } from 'react'
import Modal from './modal'

export default function Illust({illust}){
    const [modal, setModal] = useState(true);
    // console.log(illust)
    return(
        <>
        <div className={styles.page}>
            {modal && <Modal setModal = {setModal} illust = {illust}/>}
        </div>
        </>
    )
}