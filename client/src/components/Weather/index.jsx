import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { updateWeather } from '../../actions/Weather';

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
              {this.props.forecast.temperature} &deg;
            </div>
            <div className={iconClasses} />
            <div className={styles.summary}>
              {this.props.forecast.summary}
            </div>
            <div className={styles.location}>
              {this.props.forecast.location}
            </div>
          </div>
        ) : null}
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
