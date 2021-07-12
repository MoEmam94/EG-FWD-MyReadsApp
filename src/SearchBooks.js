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
    if (e) {
      BooksAPI.search(e)
      .then(books => {
        console.log(books, e)
        if (Array.isArray(books)) {
          this.setState(
            {
              'books': books.map(book => (this.props.categBooks.some(cateBook => book.id === cateBook.id) ? Object.assign(book, {shelf: this.props.categBooks.find(cateBook => cateBook.id === book.id).shelf}) : Object.assign(book, {shelf: 'None'})))
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
    .then(
      this.setState((prevState) => ({
        books: prevState.books.map((stateBook) => Object.assign(stateBook, {shelf: toShelf}))
      }))
    )
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
               {(this.state.query.length !== 0 && Array.isArray(this.state.books) && this.state.books.length !== 0 ) ? 
              ( <> 
                <BookShelf shelfChanger={this.shelfChanger} title={'Search Results'} books={this.state.books} />
                </>   ) : <p>Enter a valid search query!</p> }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchBooks
