import { getAllAuthors, getAllBooks, getAllGenres } from "@/helpers/api-utils"
import styles from '../Home.module.css'
import Book from "@/components/Book/book";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function BooksPage({books, authors, genres}) {

    const router = useRouter()

    const { data: session, status } = useSession()

    const {genreId} = router.query
    const [selectedGenre, setSelectedGenre] = useState(genreId || '')
    const [searchTitle, setSearchTitle] = useState('');
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [recentSearches, setRecentSearches] = useState([]);


    const bookClickHanndler = (id) => {
        router.push('/books/'+ id)
    }

    function onGenreSelection() {
        let temp = []
        if(selectedGenre === '')
            temp = books
        else{
            const filterbooks = books.filter((book) => book.genreId === selectedGenre)
            temp = filterbooks
        }

        setFilteredBooks(temp)
        setSearchTitle('')
    }

    const searchBookByTitle = async() => {
        let temp = []
        
        temp = filteredBooks.filter(book => book.title.toLowerCase().includes(searchTitle.toLowerCase()))
        setFilteredBooks(temp)
        
        if(searchTitle !== ''){
            if(session) {
                await addSearchQueryToDatabase(searchTitle);
            }
            const updatedSearches = [...recentSearches, searchTitle].slice(-5);
            setRecentSearches(updatedSearches);
        }   
    }

    const fetchRecentSearches = async () => {
        try {
          const response = await fetch("/api/users/history", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${session?.accessToken}`, 
            },
          });
    
          if (response.ok) {
    
            const data = await response.json();
            setRecentSearches(data); 
            
          } else {
            console.error("Failed to fetch recent searches.");
          }
        } catch (error) {
          console.error("Error fetching recent searches:", error);
        }
    };

    const addSearchQueryToDatabase = async (query) => {
        try {
          const response = await fetch("/api/users/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session?.accessToken}`, 
            },
            body: JSON.stringify({ query }),
          });
    
          if (response.ok) {
            console.log("Search query added to history");
          } else {
            console.error("Failed to add search query to history.");
          }
        } catch (error) {
          console.error("Error adding search query to database:", error);
        }
      };


    useEffect(() => {
        onGenreSelection()
    }, [selectedGenre])

    useEffect(() => {
        setSelectedGenre(genreId)
        setSearchTitle('')

        if (session) {
            fetchRecentSearches();
        }

    }, [genreId, session])


    return(
        <div className={styles.container}>
            <header className={styles.header}>All Books</header>

            <div className={styles.filterContainer}>

                <select className={styles.dropdown} value={selectedGenre} 
                    onChange={(e) => setSelectedGenre(e.target.value)} >
                
                    <option value=''>All Genres</option>
                    {genres.map((genre) => 
                        (<option key={genre.id} value={genre.id}>{genre.name}</option>)
                    )}

                </select>


                <input type="text" className={styles.searchBar} placeholder="Search by title..." 
                    value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>

                <button className={styles.searchButton} onClick={searchBookByTitle}>Search</button>
            </div>


            <div className={styles.recentSearchesContainer}>

                <div className={styles.recentSearches}>
                    <h3>Recent Searches</h3>
                    <ul>
                        {recentSearches.map((term) => (<li key={term}>{term}</li>))}
                    </ul>
                </div>
            </div>

            <div className={styles.bookList}>
            {filteredBooks.map((book) =>{
                return (
                    <Book onClick={() => bookClickHanndler(book.id)} 
                    book={book} authors={authors} genres={genres}
                    />
                );
            })}
            </div>
        </div>
    )


}

export async function getStaticProps() {
    const books = await getAllBooks()
    const authors = await getAllAuthors()
    const genres = await getAllGenres()

    if (!books || books.length === 0)
        return { notFound: true}

    return{
        props: {
            books,
            authors,
            genres
        },
        revalidate: 60
    }
}

export default BooksPage