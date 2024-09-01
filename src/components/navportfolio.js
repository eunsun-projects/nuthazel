import styles from '@/app/work/page.module.css'
import Link from 'next/link'

export default function NavPortfolio(){
    return(
            <div className={styles.navbox}>
                <Link href={'/work/artwork'}><p>artwork</p></Link>
                <Link href={'/work/toon'}><p>toon</p></Link>
                <Link href={'/work/collaboration'}><p>collaboration</p></Link>
            </div>
    )
}