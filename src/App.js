import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    userName: '',
    buttonEnabled: false,
    shouldRedirect: false,
    loading: false,
  };

  enableRedirect = () => {
    this.setState({ shouldRedirect: false });
  };

  inputLogin = (event) => {
    const tres = 3;
    this.setState({
      userName: event.target.value,
      buttonEnabled: event.target.value.length >= tres,
    });
  };

  handleClick = async () => {
    const { userName } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ shouldRedirect: true }, this.enableRedirect);
  };

  render() {
    const { buttonEnabled, userName, loading, shouldRedirect } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/">
            <Login
              buttonEnabled={ buttonEnabled }
              handleClick={ this.handleClick }
              inputLogin={ this.inputLogin }
              shouldRedirect={ shouldRedirect }
              userName={ userName }
              loading={ loading }
            />
          </Route>
          <Route path="/" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
