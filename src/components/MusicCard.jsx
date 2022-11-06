import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    check: false,
    loading: false,
  };

  componentDidMount() {
    const { trackName } = this.props;
    getFavoriteSongs().then((response) => {
      this.setState({ check: response
        .some((music) => music.trackName === trackName) });
    });
  }

  handleFavorite = (check, songInfo) => {
    this.setState({
      check,
      loading: true,
    }, async () => {
      if (!check) await addSong(songInfo);
      else await removeSong(songInfo);
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId, song } = this.props;
    const { check, loading } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        { loading && <Loading /> }
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ trackId }
        >
          Favorita
          <input
            type="checkBox"
            id={ trackId }
            onChange={ (e) => this.handleFavorite(e.target.value, song) }
            checked={ check }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.object,
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
