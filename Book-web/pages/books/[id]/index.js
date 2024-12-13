import Book from '@/components/Book/book'
import styles from '../../Home.module.css'
import { getAllAuthors, getAllBooks, getAllGenres } from '@/helpers/api-utils'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'


export function BookDetails({book, authors, genres, session}) {

    const router = useRouter()
    const viewAuthor = () => {
        router.push('/books/'+book.id+'/author')
    }


    if (!session) {
        return (
          <div>
            <header className={styles.heading}>Book Details</header>
            <p>You need to be logged in to view this page.</p>
          </div>
        );
      }

    return (
        <div>
            <header className={styles.header}>Book Details</header>

            <div className={styles.bookList}>
                <Book
                    book={book} authors={authors} genres={genres}
                />
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.viewButton} onClick={viewAuthor}>Author</button>
            </div>
        </div>
    )

}

// export async function getStaticPaths() {
//     const books = await getAllBooks()
//     const paths = books.map((book) => ({
//         params: {id: book.id.toString() }
//     }))

//     return {paths, fallback: false}
// }

export async function getServerSideProps(context) {
    
    // Restrict access to only logged-in users
    const session = await getSession({ req: context.req });

    console.log(context)

    if (!session) {
        return {
        props: {
            session: null,
        },
        };
    }
    const books = await getAllBooks()
    const book = books.find((book) => book.id.toString() === context.params.id)
    const authors = await getAllAuthors()
    const genres = await getAllGenres()

    return {
        props: {
            book,
            authors,
            genres,
            session
        }
    }
}



export default BookDetails