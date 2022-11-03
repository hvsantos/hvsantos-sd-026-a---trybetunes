import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Loading from './Loading';

export default class Login extends Component {
  render() {
    const { handleClick, inputLogin, buttonEnabled, userName, loading,
      shouldRedirect } = this.props;
    if (shouldRedirect) {
      return (<Redirect to="/search" />);
    }
    return (
      <div data-testid="page-login">
        { loading
          ? <Loading />
          : (
            <div>
              <h1>Login</h1>
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ inputLogin }
                value={ userName }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={ handleClick }
                disabled={ !buttonEnabled }
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  handleClick: PropTypes.func,
  inputLogin: PropTypes.func,
  userName: PropTypes.string,
  buttonEnabled: PropTypes.boolean,
  loading: PropTypes.string,
}.isRequired;
