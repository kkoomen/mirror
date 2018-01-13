import { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import {
  deleteSpeechQueueIndex,
  refreshSpeechQueue,
} from '../../actions/Speech';


class Speech extends Component {
  constructor(props:any) {
    super(props);

    this.onSpeechEnded = this.onSpeechEnded.bind(this);
    this.canSpeak = this.canSpeak.bind(this);

    this.audio = new Audio();
    this.audio.onended = this.onSpeechEnded;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.dispatch(refreshSpeechQueue());
    }, (1000 * 60));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSpeechEnded() {
    this.props.dispatch(deleteSpeechQueueIndex(0));
  }

  canSpeak() {
    const hour = parseInt(new Date().format('hh'));
    if (hour >= 6 && hour < 22) {
      return true;
    }

    return false;
  }

  render() {
    if (this.props.queue.length > 0 && this.audio.paused && this.canSpeak()) {
      const params = queryString.stringify({
        src: 'pw',
        r: 37,
        s: -2,
        t: this.props.queue[0].text,
      });

      const url = `https://api.naturalreaders.com/v0/tts/?${params}`;
      this.audio.src = url;
      this.audio.play();
    }

    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    queue: state.speech.queue,
  };
}

export default connect(mapStateToProps)(Speech);
