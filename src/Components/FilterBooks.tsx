import React, { Component } from 'react';

interface FilterBooksProps {
  filterBooks: (author: string, genre: string, search: string) => void;
}

class FilterBooks extends Component<FilterBooksProps> {
  state = {
    search: '',
    genre: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<typeof this.state, keyof typeof this.state>, () => {
      this.props.filterBooks(this.state.search, this.state.genre, this.state.search);
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Search by title, genre, or author"
        />
        <select name="genre" value={this.state.genre} onChange={this.handleChange}>
          <option value="">Filter by Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>
    );
  }
}

export default FilterBooks;
