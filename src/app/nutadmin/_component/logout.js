'use client'
import { signOut } from "next-auth/react";
import styles from '@/app/nutadmin/page.module.css'

export default function LogOut(){
    return(
        <div 
            onClick={()=>signOut()}
            className={styles.logbtn}
            style={{cursor: "pointer"}}
        >logout
        </div>
    )
} 