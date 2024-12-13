import { getAllBooks, getAuthorById } from "@/helpers/api-utils"
import { getSession } from "next-auth/react";

export function AuthorDetails({book, author, session}) {
    
    if (!session) {
        return (
          <div>
            <header className={styles.heading}>Author Information</header>
            <p>You need to be logged in to view this page.</p>
          </div>
        );
      }
    
    return (
        <div>
            <p>{author.name}</p>
            <p>{book.title}</p>
        </div>
    )
}

// export async function getStaticPaths() {
//     const books = await getAllBooks()
//     const paths = books.map((book) => ({
//         params: {id: book.id.toString()}
//     }))

//     return {paths, fallback: false}
// }

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req });

    if (!session) {
        return {
        props: {
            session: null,
        },
        };
    }

    const books = await getAllBooks()
    const book = books.find((book) => book.id.toString() === context.params.id)
    if (!book) {
        return {
            notFound: true, // Return a 404 page if the book is not found
        };
    }
    const author = await getAuthorById(book.authorId)

    return {props: {book, author, session}}
}

export default AuthorDetails

