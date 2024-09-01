'use client'
import { useRef } from 'react'
// import emailjs from '@emailjs/browser'
import styles from '@/app/contact/page.module.css'
import Link from 'next/link'

const EmailForm = ({setOpenModal}) => {
    const form = useRef()
    const handleContact = () => {
        setOpenModal(false)
    }
    const sanitizeInput = (input) => {
        return input.replace(/[{}()<>`~!@#$%^&*|\[\]\\\'\";:\/?|]/gim, '');
    };
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    // send mail
    const onSubmitForm = (event) => {
        event.preventDefault()

        try {
            const name = sanitizeInput(form.current.name.value);
            const email = form.current.email.value;
            if (!validateEmail(email)) {
                alert('이메일 주소를 확인해 주세요. @, . 이 빠졌나..');
                return;
            }
            const message = sanitizeInput(form.current.message.value);

            const formpack = {
                name: name,
                email: email,
                message: message
            }
            
            // emailjs.send(
            //     process.env.NEXT_PUBLIC_NEXT_PUBLIC_MAIL_SERVER_KEY,
            //     process.env.NEXT_PUBLIC_MAIL_TEMPLATE_KEY,
            //     formpack,
            //     process.env.NEXT_PUBLIC_MAIL_PRIVATE_KEY
            // )
            // .then((response)=>{
            //      // ... (이메일 전송 코드)
            //     alert('주인장에게 메일이 전송되었습니다.💌');
            //     console.log('SUCCESS!', response.status, response.text);
            // })
        } catch (error) {
            alert('메일 전송에 실패하였습니다.');
        }
    }

    return (
        <div className={styles.contactbox}>
            <div className={styles.formandlink}>
                <form ref={form} className={styles.contactform} onSubmit={onSubmitForm}>
                    <label>name <span className={styles.labelstar}>*</span></label>
                    <input type="text" name="name" required />

                    <label>email <span className={styles.labelstar}>*</span></label>
                    <input type="email" name="email" required />

                    <label>message <span className={styles.labelstar}>*</span></label>
                    <textarea 
                        className={styles.textarea} 
                        type="text" 
                        name="message" 
                        placeholder={
                            `궁금하신 사항 문의주세요`
                        } 
                        required
                    />
                    
                    <input className={styles.consendbtn}
                        type="submit"
                        value="send"
                    />
                </form>
            </div>
            
        </div>
    )
}

export default EmailForm