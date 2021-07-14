import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import { Link, Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books : [],
    flip: false
  }

componentDidMount() {
    BooksAPI.getAll()
    .then(books => {
      this.setState(() => ({
        books
      }))
    })
  }

shelfChanger = (book, toShelf) => {
    BooksAPI.update(book, toShelf)
    .then(BooksAPI.getAll()
    .then(books => {
      this.setState((prevState) => ({
        "books": books,
        "flip" : !prevState.flip
      }))
    })
    )
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={() => (
            <SearchBooks categBooks={this.state.books}/>
          )} />
          <Route exact path='/' render={() => (
                      <div className="list-books">
                      <div className="list-books-title">
                        <h1>MyReads</h1>
                      </div>
                      <div className="list-books-content">
                        <div>
                          <BookShelf shelfChanger={this.shelfChanger} title={'Currently Reading'} books={this.state.books.filter(book => book.shelf === "currentlyReading")}/>
                          <BookShelf shelfChanger={this.shelfChanger} title={'Want to Read'} books={this.state.books.filter(book => book.shelf === "wantToRead")}/>
                          <BookShelf shelfChanger={this.shelfChanger} title={'Read'} books={this.state.books.filter(book => book.shelf === "read")}/>
                        </div>
                      </div>
                      <div className="open-search">
                        <Link className='button' to='/search'><button>Add a book</button></Link>
                      </div>
                    </div>
          )} />
      </div>
    )
  }
}

export default BooksApp