'use client'
import { signIn } from "next-auth/react"

export default function Login(){
    return(
        <div 
            onClick={()=>signIn()}
            style={{cursor: "pointer", fontSize: '2rem'}}
        >login
        </div>
    )
} 