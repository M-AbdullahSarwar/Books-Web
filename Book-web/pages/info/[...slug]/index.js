import { useRouter } from "next/router";
import styles from '../../Home.module.css'

export function InfoPage() {
    const router = useRouter()
    const {slug} = router.query

    function homeButton() {
        router.push('/')
    }

    function titleName() {
        if(!slug)
            return <header className={styles.header}>...</header>
        if(slug[0] === 'faqs')
            return <header className={styles.header}>Frequently Asked Ques</header>
        if(slug[0] === 'support')
            return <header className={styles.header}>Support Section</header>
        if(slug.length > 1)
            return <header className={styles.header}>{slug.join(' / ')}</header>
        
        return <header className={styles.header}>Information Page: {slug.join(' / ')}</header>
    }

    return(
        <div>
            {titleName()}
            <div className={styles.buttonContainer}>
                <button className={styles.viewButton} onClick={homeButton}>Home</button>
            </div>
        </div>
    )
}

export default InfoPage