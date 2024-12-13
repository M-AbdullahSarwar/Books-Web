import { useRouter } from "next/router"
import styles from '../Home.module.css'
import { useEffect, useState } from "react"
import { Author } from "@/components/Author/author"
import { getAllAuthors } from "@/helpers/api-utils"



export function AuthorPage({authors}) {

    if(!authors)
        return <header className={styles.header}>Loading...</header>
    
    
    return (
        <div>
            <header className={styles.header}>Authors Page</header>
            <div className={styles.authorContainer}>

                <ul>
                    {authors.map(i => {
                        return <l1> <Author author={i}/> </l1>
                    })}
                </ul>

            </div>
        </div>
    )

}

export async function getServerSideProps() {
    const authors = await getAllAuthors();
  
    if (!authors) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        authors,
      },
    };
  }

export default AuthorPage