import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { updateWeather } from '../../actions/Weather';
import { queueSpeechText } from '../../actions/Speech';
import { SPEECH_TYPE_WEATHER } from '../../config/constants';

import styles from './style.css';

class Weather extends Component {
  constructor(props:any) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    this.props.dispatch(updateWeather());

    this.interval = setInterval(() => {
      this.props.dispatch(updateWeather());
    }, (1000 * 60 * 30));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.forecast.summary != nextProps.forecast.summary) {
      const text = `
        Weather update: Today will be ${nextProps.forecast.temperature} degrees,
        ${nextProps.forecast.summary}
      `;

      this.props.dispatch(queueSpeechText(SPEECH_TYPE_WEATHER, text));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const iconClasses = classNames(styles.icon, {
      [styles[`icon--${this.props.forecast.icon}`]]: true,
    });

    return (
      <div className={styles.Weather}>
        {Object.keys(this.props.forecast).length > 0 ? (
          <div className={styles.forecast}>
            <div className={styles.temperature}>
              <h1>{this.props.forecast.temperature} &deg;</h1>
            </div>
            <div className={iconClasses} />
            <div className={styles.summary}>
              <h2>{this.props.forecast.summary}</h2>
            </div>
            <div className={styles.location}>
              <p>{this.props.forecast.location}</p>
            </div>
          </div>
        ) : 'Unknown'}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    forecast: state.weather.forecast,
  };
}

export default connect(mapStateToProps)(Weather);
