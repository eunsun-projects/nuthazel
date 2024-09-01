'use client'
import styles from '@/app/work/collaboration/page.module.css'

export default function CollabLoading(){
    return(
        <div className={styles.collabloadbox}>
            <img className={styles.loadstar1} src='/assets/contact/star.webp'></img>
            <img className={styles.loadstar2} src='/assets/contact/star.webp'></img>
            {/* <div className={styles.mirrorbox}>
                <div className={styles.mirrorlight}></div>
                <div className={styles.mirrorlighttwo}></div>
            </div> */}
        </div>
    )
}