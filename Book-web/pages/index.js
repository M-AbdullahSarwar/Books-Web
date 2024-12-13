import { getFeaturedBooks, getAllGenres, getAllAuthors } from '@/helpers/api-utils';
import Book from '@/components/Book/book';
import { useRouter } from 'next/router';
import styles from './Home.module.css'

export default function Home({featuredBooks, genres, authors}) {

  const router = useRouter()
  
  const bookClickHanndler = (id) => {
    router.push('/books/'+ id)
  }

  const viewGenres = () => {
    router.push('/genres')
  }

  const viewBooks = () => {
    router.push('/books')
  }

  const viewAuthors = () => {
    router.push('/authors')
  }

  const viewInfo = () =>{
    router.push('/info')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>Featured Books</header>

      <div className={styles.bookList}>
      {featuredBooks.map((book) =>{
        return (
          <Book onClick={() => bookClickHanndler(book.id)} 
          book={book} authors={authors} genres={genres}
          />
        );
      })}
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.viewButton} onClick={viewGenres}>View Genres</button>
        <button className={styles.viewButton} onClick={viewBooks}>View All Books</button>
        <button className={styles.viewButton} onClick={viewAuthors}>View All Authors</button>
        <button className={styles.viewButton} onClick={viewInfo}>Info Page</button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const featuredBooks = await getFeaturedBooks()
  const genres = await getAllGenres()
  const authors = await getAllAuthors()

  return{
    props: {
      featuredBooks,
      genres,
      authors
    }
  }
}
