import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: '',
  };

  componentDidMount() {
    getUser().then((response) => this.setState({ user: response.name }));
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <h2 data-testid="header-user-name">{ user || <Loading /> }</h2>
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>
    );
  }
}
