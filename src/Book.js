import React from 'react'

function Book(props){
    return (
        <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.bookCover})`}}></div>
        <div className="book-shelf-changer">
            <select value={props.bookShelf} onChange={e => props.shelfChanger(e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option hidden>Select one...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="None">None</option>
            </select>
        </div>
        
        </div>
        <div className="book-title">{props.bookTitle}</div>
        <div className="book-authors">
        By {(props.bookAuthor !== "Author") ? props.bookAuthor.join(' , ') : props.bookAuthor}
            {/*Activate the next segment to show all authors in an unordered list */}
            {/* <ul>
            {props.bookAuthor.map(author => (
                <li>
                    {author}
                </li>
            ))}
            </ul> */}
            </div>
    </div> 
    )
}

export default Book