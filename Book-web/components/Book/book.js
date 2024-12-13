import React from "react"
import bookStyle from './Book.module.css'

export function Book(props) {
    
    const genre = props.genres.find(i => i.id === props.book.genreId)
    const author = props.authors.find(i => i.id === props.book.authorId)

    return(
        <div>
            <div key={props.book.id} className={bookStyle.bookCard} onClick={props.onClick}>
      
            <div className={bookStyle.bookTitle}>{props.book.title}</div>
            <div className={bookStyle.bookGenre}>Genre: {genre.name}</div>
            <div className={bookStyle.bookDescription}>{props.book.description}</div>
            <div className={bookStyle.bookAuthor}>Author Name: {author.name}</div>
            <div className={bookStyle.bookPrice}>${props.book.price}</div>
            <div className={bookStyle.bookRating}>Rating: {props.book.rating}★</div>
            </div>
        </div>
    )
}

export default Book