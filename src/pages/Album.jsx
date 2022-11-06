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

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((resp) => {
      const albumInfo = resp[0];
      this.setState({
        albumInfo,
        albumSongs: resp.slice(1),
        loading: false,
      });
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
                    song={ song }
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                    trackId={ song.trackId }
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
