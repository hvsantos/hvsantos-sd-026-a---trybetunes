import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchParam: '',
    buttonDisabled: true,
  };

  handleChange = (event) => {
    this.setState({
      searchParam: event.target.value,
      buttonDisabled: (event.target.value.length < 2),
    });
  };

  render() {
    const { searchParam, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          value={ searchParam }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDisabled }
        >
          Procurar
        </button>
      </div>
    );
  }
}
