import { useRouter } from 'next/router'
import styles from '../Home.module.css'

export function Info() {
    const router = useRouter()
    function faqButton() {
        router.push('/info/faqs')
    }
    function supportButton() {
        router.push('/info/support')
    }
    return (
        <div>
            <header className={styles.header}>Information Page</header>
            <p className={styles.text}>This is a general Information page.</p>

            <div className={styles.buttonContainer}>
                <button className={styles.viewButton} onClick={faqButton}>FAQs</button>
                <button className={styles.viewButton} onClick={supportButton}>Support</button>
            </div>

        </div>
    )
}

export default Info