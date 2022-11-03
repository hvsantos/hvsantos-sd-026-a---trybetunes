import React, { Component } from 'react';
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
      </header>
    );
  }
}
