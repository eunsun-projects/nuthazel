"use client";
import styles from "@/app/contact/page.module.css";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

interface EmailFormProps {
  gif: boolean;
  setGif: (value: boolean) => void;
  mobile: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ gif, setGif, mobile }) => {
  const [hideForm, setHideForm] = useState(styles.forstate);
  const [hideEmailSend, setHideEmailSend] = useState(styles.forstate);
  const [mobileHeight, setMobileHeight] = useState(styles.temp);
  const [folding, setFolding] = useState(styles.forstate);
  const [sendImg, setSendImg] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const foldRef = useRef<HTMLDivElement>(null);
  const formdivRef = useRef<HTMLDivElement>(null);

  const sanitizeInput = (input: string) => {
    return input.replace(/[{}()<>`~!@#$%^&*|\[\]\\\'\";:\/?|]/gim, "");
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // send mail
  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) {
      console.error("Form element is not found");
      return;
    }

    try {
      if (
        !formRef.current.name01 ||
        !formRef.current.email ||
        !formRef.current.message
      ) {
        alert("모든 필드를 입력해 주세요.");
        return;
      }
      const name = sanitizeInput(formRef.current.name01.value);
      const email = formRef.current.email.value;
      if (!validateEmail(email)) {
        alert("이메일 주소를 확인해 주세요. @, . 이 빠졌나..");
        return;
      }
      const message = sanitizeInput(formRef.current.message.value);

      const formpack = {
        name: name,
        email: email,
        message: message,
      };

      emailjs
        .send(
          process.env.NEXT_PUBLIC_MAIL_SERVER_KEY as string,
          process.env.NEXT_PUBLIC_MAIL_TEMPLATE_KEY as string,
          formpack,
          process.env.NEXT_PUBLIC_MAIL_PRIVATE_KEY
        )
        .then((response) => {
          // ... (이메일 전송 코드)
          alert("nuthazel님에게 메일이 전송되었습니다.💌");
          console.log("SUCCESS!", response.status, response.text);

          setHideForm(styles.hide); // hide 가 붙으면 편지지가 들어가는 종류와 관련된 모든 css 변화가 여기서 일어남
          setHideEmailSend(styles.hideemailsend); // send 버튼 숨기는 기능만 함
          if (mobile) {
            setTimeout(() => {
              setMobileHeight(styles.mobileHeight); // 모바일일때 편지지 길이랑 얼마나 들어가는지
              if (formRef.current) {
                formRef.current.style.opacity = "0";
              }
            }, 300);
            setTimeout(() => {
              setMobileHeight(styles.temp);
            }, 6300);
          }
          setTimeout(() => {
            if (formRef.current) {
              formRef.current.style.opacity = "0";
            }
          }, 500);
          setTimeout(() => {
            setFolding(styles.fold); //편지지가 들어가고 나서 나타나는 편지봉투 뚜껑
          }, 1300);
          setTimeout(() => {
            if (formdivRef.current) {
              formdivRef.current.style.display = "none";
            }
            if (foldRef.current) {
              foldRef.current.style.display = "none";
              setSendImg(true);
              setGif(true);
            }
          }, 2000);
          setTimeout(() => {
            if (foldRef.current) {
              foldRef.current.style.display = "block";
            }
            if (formdivRef.current) {
              formdivRef.current.style.display = "flex";
            }
            setGif(false);
            setSendImg(false);
            setHideForm(styles.forstate);
            setHideEmailSend(styles.forstate);
            setFolding(styles.formtwo);
          }, 6000);
          setTimeout(() => {
            if (formRef.current) {
              formRef.current.style.opacity = "1";
            }
          }, 6300);
        })
        .catch((err: any) => console.log(err.message));
    } catch (error: any) {
      // alert('메일 전송에 실패하였습니다.');
      console.log(error.message);
    }
  };

  return (
    <>
      {/* {sendImg && <CanvasComp/>} */}
      <div className={styles.contactbox}>
        <div ref={foldRef} className={`${styles.formtwo} ${folding}`}></div>
        <div ref={formdivRef} className={`${styles.formandlink} ${hideForm}`}>
          <form
            ref={formRef}
            className={`${styles.contactform} ${mobileHeight} `}
            onSubmit={onSubmitForm}
          >
            <p>넡헤이즐은 다양한 협업에 언제나 열려있습니다.</p>
            <label>
              your message{" "}
              <span className={styles.labelstar}>
                <img
                  className={styles.starimg}
                  src="/assets/contact/mailstar.webp"
                ></img>
              </span>
            </label>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder={`문의내용을 적어주세요.`}
              rows={5}
              // required
            />

            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                  name{" "}
                  <span className={styles.labelstar}>
                    <img
                      className={styles.starimg}
                      src="/assets/contact/mailstar.webp"
                    ></img>
                  </span>
                </label>
                <input
                  type="text"
                  name="name01"
                  // required
                />

                <label>
                  email{" "}
                  <span className={styles.labelstar}>
                    <img
                      className={styles.starimg}
                      src="/assets/contact/mailstar.webp"
                    ></img>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`${styles.emailinput} ${hideEmailSend}`}
                  // required
                />
              </div>
            </div>

            <input
              className={`${styles.consendbtn} ${hideEmailSend}`}
              type="submit"
              value="send"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailForm;
