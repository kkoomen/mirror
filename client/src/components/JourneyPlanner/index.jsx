import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { updateJourneys } from '../../actions/JourneyPlanner';

import styles from './style.css';

class JourneyPlanner extends Component {
  constructor(props:any) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    const departure = 'Enkhuizen';
    const arrival = 'Amsterdam Centraal';
    this.props.dispatch(updateJourneys(departure, arrival));

    this.interval = setInterval(() => {
      this.props.dispatch(updateJourneys(departure, arrival));
    }, (1000 * 60));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={styles.JourneyPlanner}>
        {this.props.journeys.map((journey, index) => (
          <div className={styles.journey} key={index}>
            {journey.transportImage ? (
              <div className={styles['transport-image']}>
                <img src={journey.transportImage} />
              </div>
            ) : null}
            <div className={styles['departure-time']}>
              {journey.departureTime}
            </div>
            {journey.departureDelay > 0 ? (
              <div className={styles.delay}>
                (+{journey.departureDelay})
              </div>
            ) : null}
            <div className={styles.icon} />
            <div className={styles['arrival-time']}>
              {journey.arrivalTime}
            </div>
            {journey.arrivalDelay > 0 ? (
              <div className={styles.delay}>
                (+{journey.arrivalDelay})
              </div>
            ) : null}
          </div>
        ))}

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    journeys: state.journeyPlanner.journeys,
  };
}

export default connect(mapStateToProps)(JourneyPlanner);
