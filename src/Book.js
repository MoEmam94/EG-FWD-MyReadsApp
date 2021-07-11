import React, { Component } from 'react'

export default class Book extends Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookCover})`}}></div>
                <div className="book-shelf-changer">
                    <select value="DEFAULT" onChange={e => this.props.shelfChanger(e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option hidden>Select one...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="None">None</option>
                    </select>
                </div>
                
                </div>
                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors">
                By {this.props.bookAuthor[0]}
                    {/*Activate the next segment to show all authors in an unordered list */}
                    {/* <ul>
                    {this.props.bookAuthor.map(author => (
                        <li>
                            {author}
                        </li>
                    ))}
                    </ul> */}
                    </div>
            </div> 
        )
    }
}
