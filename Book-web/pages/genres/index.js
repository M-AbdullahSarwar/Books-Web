import { getAllGenres } from "@/helpers/api-utils"
import { useRouter } from "next/router"
import styles from '../Home.module.css'

export function GenrePage({genres}) {

    const router = useRouter()

    function genreClicked(id) {
        router.push(`/books?genreId=${id}`)
    }

    function homeButtonHandler() {
        router.push('/')
    }

    return(
        <div className={styles.container}>
            <header className={styles.header}>All Genres</header>

            <ul className={styles.genreList}>
                {genres.map((genre) => (
                    <li key={genre.id} className={styles.genreItem} onClick={()=> genreClicked(genre.id)}>
                        {genre.name}
                     </li>
                ))}
            </ul>

            <div className={styles.buttonContainer}>
                <button className={styles.viewButton} onClick={homeButtonHandler}>Home</button>
            </div>
        </div>
    )

}

export async function getServerSideProps() {
    const genres = await getAllGenres()

    return {
        props: {
            genres
        }
    }
}

export default GenrePage