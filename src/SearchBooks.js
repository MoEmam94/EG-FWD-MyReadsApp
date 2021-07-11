import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


export class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  handleChange = (e) => {
    this.setState({
      query: e
    })
    if (this.state.query) {
      BooksAPI.search(this.state.query)
      .then(books => {
        console.log(books, this.state.query)
        if (Array.isArray(books)) {
          this.setState(
            {
              'books': books.map(book => (this.props.categBooks.some(cateBook => book.id === cateBook.id) ? Object.assign(book, {shelf: this.props.categBooks.find(cateBook => cateBook.id === book.id).shelf}) : Object.assign(book, {shelf: 'none'})))
            }
          )
        } else {
          this.setState({
            books: []
          })
        }
      })
    }
  }

  shelfChanger = (book, toShelf) => {
    BooksAPI.update(book, toShelf)
  }


    render() {
        return (
        <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={e => this.handleChange(e.target.value)} value={this.state.query}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
               {(this.state.query.length !== 0 && Array.isArray(this.state.books) ) ? 
              ( <> 
                <BookShelf shelfChanger={this.shelfChanger} title={'Currently Reading'} books={this.state.books.filter(book => book.shelf === "currentlyReading")} />
                <BookShelf shelfChanger={this.shelfChanger} title={'Want to read'} books={this.state.books.filter(book => book.shelf === "wantToRead")} />
                <BookShelf shelfChanger={this.shelfChanger} title={'Read'} books={this.state.books.filter(book => book.shelf === "read")} />
                <BookShelf shelfChanger={this.shelfChanger} title={'Uncategorized'} books={this.state.books.filter(book => book.shelf ===  'none')} />
                </>   ) : null }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks
