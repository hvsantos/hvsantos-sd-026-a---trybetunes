import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    searchParam: '',
    artist: '',
    resultAlbums: [],
    buttonDisabled: true,
    loading: false,
  };

  handleChange = (event) => {
    this.setState({
      searchParam: event.target.value,
      buttonDisabled: (event.target.value.length < 2),
    });
  };

  searchClick = async () => {
    const { searchParam } = this.state;
    this.setState(
      {
        loading: true,
        artist: searchParam,
      },
    );
    const result = await searchAlbumsAPI(searchParam);
    this.setState({
      loading: false,
      resultAlbums: result,
      searchParam: '',
    });
  };

  render() {
    const { searchParam, buttonDisabled, resultAlbums,
      hideSearchInput, loading, artist } = this.state;
    const divShowResults = (
      <div>
        <p>
          { `Resultado de álbuns de: ${artist}` }
        </p>
        {resultAlbums.map((obj) => {
          const { artworkUrl100, collectionName,
            artistName, collectionId } = obj;
          return (
            <div key={ `${collectionId}` }>
              <img src={ artworkUrl100 } alt={ `${collectionName} img` } />
              <h2>{ collectionName }</h2>
              <h3>{ artistName }</h3>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                Ir para Album
              </Link>
            </div>
          );
        })}
      </div>
    );
    const didItFind = (resultAlbums.length === 0
      ? <p>Nenhum álbum foi encontrado</p> : divShowResults);
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchParam }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.searchClick }
            disabled={ buttonDisabled }
          >
            Procurar
          </button>
        </div>
        { loading && <Loading /> }
        { (!loading && !hideSearchInput) && didItFind }
      </div>
    );
  }
}
