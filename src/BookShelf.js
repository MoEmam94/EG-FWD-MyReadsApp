import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Book from './Book'


export default class BookShelf extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    state = {
        books: ''
    }
    render() {
        return (
            <div>
                  <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.books.map((book) =>{
                         return (<li key={book.id}>
                              <Book shelfChanger={e => this.props.shelfChanger(book, e)} bookTitle={book.title} bookAuthor={book.authors || "Author"} bookCover={(book.imageLinks) ? book.imageLinks.thumbnail : "http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"}/>
                          </li>)
                      })}
                    </ol>
                  </div>
                </div>
            </div>
        )
    }
}