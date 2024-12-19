import  { Component } from 'react';

interface Author {
  name: string;
  age: number;
}

interface Book {
  title: string;
  author: Author;
  genre: string;
  price: number;
}

interface BookListProps {
  books: Book[];
  deleteBook: (index: number) => void;
  setBookToEdit: (book: Book, index: number) => void;
}

class BookList extends Component<BookListProps> {
  render() {
    return (
      <div className="card-container">
        {this.props.books.map((book, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h2>TItle:{book.title}</h2>
              <p><strong>Author:</strong> {book.author.name}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Price:</strong> ${book.price}</p>
              <button onClick={() => this.props.setBookToEdit(book, index)}>Edit</button>
              <button onClick={() => this.props.deleteBook(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default BookList;
