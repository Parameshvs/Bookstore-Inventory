import React, { Component } from 'react';

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

interface BookFormProps {
  addBook: (book: Book) => void;
  editBook: (book: Book, index: number) => void;
  bookToEdit?: Book;
  indexToEdit?: number;
}

class BookForm extends Component<BookFormProps> {
  state: Book = {
    title: '',
    author: { name: '', age: 0 },
    genre: '',
    price: 0,
  };

  componentDidUpdate(prevProps: BookFormProps) {
    if (this.props.bookToEdit !== prevProps.bookToEdit) {
      this.setState(this.props.bookToEdit || { title: '', author: { name: '', age: 0 }, genre: '', price: 0 });
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
 
 
    const { name, value } = event.target;
    if (name === 'authorName' || name === 'authorAge') {
      this.setState((prevState) => ({
        author: {
          ...prevState.autho,
          [name === 'authorName' ? 'name' : 'age']: name === 'authorAge' ? parseInt(value) : value,
        },
      }));
    } else {
      this.setState({ [name]: value } as Pick<Book, keyof Book>);
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (this.props.bookToEdit) {
      this.props.editBook(this.state, this.props.indexToEdit!);
    } else {
      this.props.addBook(this.state);
    }
    this.setState({ title: '', author: { name: '', age: 0 }, genre: '', price: 0 });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
        <input name="authorName" value={this.state.author.name} onChange={this.handleChange} placeholder="Author Name" />
        <select name="genre" value={this.state.genre} onChange={this.handleChange}>
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
        </select>
        <input type="number" name="price" value={this.state.price} onChange={this.handleChange} placeholder="Price" />
        <button type="submit">{this.props.bookToEdit ? 'Update Book' : 'Add Book'}</button>
      </form>
    );
  }
}

export default BookForm;
