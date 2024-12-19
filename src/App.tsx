import  { Component } from 'react';
import './app.css'; 
import BookForm from './Components/BookForm';
import BookList from './Components/BookList';
import FilterBooks from './Components/FilterBooks';

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

interface AppState {
  books: Book[];
  filteredBooks: Book[];
  bookToEdit?: Book;
  indexToEdit?: number;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    books: [],
    filteredBooks: [],
    bookToEdit: undefined,
    indexToEdit: undefined,
  };

  addBook = (book: Book) => {
    this.setState({
      books: [...this.state.books, book],
      filteredBooks: [...this.state.books, book],
    });
  };

  editBook = (book: Book, index: number) => {
    const updatedBooks = this.state.books.map((b, i) => (i === index ? book : b));
    this.setState({ books: updatedBooks, filteredBooks: updatedBooks, bookToEdit: undefined, indexToEdit: undefined });
  };

  deleteBook = (index: number) => {
    const updatedBooks = this.state.books.filter((_, i) => i !== index);
    this.setState({ books: updatedBooks, filteredBooks: updatedBooks });
  };

  setBookToEdit = (book: Book, index: number) => {
    this.setState({ bookToEdit: book, indexToEdit: index });
  };

  filterBooks = (search: string, genre: string) => {
    const filtered = this.state.books.filter(
      (book) =>
        (search === '' || book.title.toLowerCase().includes(search.toLowerCase()) || book.author.name.toLowerCase().includes(search.toLowerCase())) &&
        (genre === '' || book.genre === genre)
    );
    this.setState({ filteredBooks: filtered });
  };

  render() {
    return (
      <div>
        <h1>Bookstore Inventory</h1>
        <BookForm
          addBook={this.addBook}
          editBook={this.editBook}
          bookToEdit={this.state.bookToEdit}
          indexToEdit={this.state.indexToEdit}
        />
        <FilterBooks filterBooks={this.filterBooks} />
        <BookList
          books={this.state.filteredBooks}
          deleteBook={this.deleteBook}
          setBookToEdit={this.setBookToEdit}
        />
      </div>
    );
  }
}

export default App;
