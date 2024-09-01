import styles from '@/app/page.module.css'
export default function Hamberger({ isOpen, setIsOpen }){

    const handleOpen = () => {
        // setIsOpen((prev)=>{
        //     if(prev === 0){
        //         return 1;
        //     }else if(prev === 2){
        //         return 1;
        //     }else{
        //         return 2;
        //     }
        // });
        // console.log(isOpen)
        if(isOpen === 0){
            setIsOpen(1);
        }else if(isOpen === 2){
            setIsOpen(1);
        }else{
            setIsOpen(2);
        }
    }

    return(
        <>
        <div className={styles.star} onClick={handleOpen}>
            <div className={styles.bigline} style={{transform: isOpen === 1 ? 'rotate(45deg)' : 'rotate(0deg)'}}>
                <div className={styles.linebox}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.lineboxheight}>
                    <div className={styles.lineheight}></div>
                    <div className={styles.lineheight}></div>
                </div>
            </div>

            <div className={styles.smallline} style={{transform: isOpen === 1 ? 'rotate(90deg)' : 'rotate(45deg)'}}>
                <div className={styles.xlinebox}>
                    <div className={styles.xline}></div>
                    <div className={styles.xline}></div>
                </div>
                <div className={styles.xlineboxheight}>
                    <div className={styles.xlineheight}></div>
                    <div className={styles.xlineheight}></div>
                </div>
            </div>
        </div>
        </>
    )
}