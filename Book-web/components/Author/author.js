import styles from './Author.module.css'

export function Author(props) {
    return (
        <div className={styles.authorCard}>
          <h2 className={styles.authorName}>{props.author.name}</h2>
          <p className={styles.authorBio}>{props.author.biography}</p>
        </div>
    )
}