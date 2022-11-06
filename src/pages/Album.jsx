import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

export default class Album extends Component {
  state = {
    albumInfo: '',
    albumSongs: [],
    loading: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const albumInfo = await response[0];
    this.setState({
      albumInfo,
      albumSongs: response.slice(1),
      loading: false,
    });
  }

  render() {
    const { albumInfo, albumSongs, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>
        { loading
          ? <Loading />
          : (
            <div>
              <div>
                <img
                  src={ albumInfo.artworkUrl100 }
                  alt={ `Capa ${albumInfo.collectionName}` }
                />
                <h2 data-testid="album-name">
                  { albumInfo.collectionName }
                </h2>
                <h3 data-testid="artist-name">{ albumInfo.artistName }</h3>
              </div>
              <div>
                { albumSongs.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                  />
                )) }
              </div>
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
