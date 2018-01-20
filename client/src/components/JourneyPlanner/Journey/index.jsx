import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { queueSpeechText } from '../../../actions/Speech';
import { SPEECH_TYPE_JOURNEY_PLANNER } from '../../../config/constants';

import styles from './style.css';

class Journey extends Component {
  componentWillReceiveProps(nextProps) {
    let text = '';

    if (this.props.journey.departureDelay !== nextProps.journey.departureDelay) {
      if (this.props.journey.departureDelay === 0 && nextProps.journey.departureDelay > 0) {
        text += `A departure delay of ${nextProps.journey.departureDelay} minutes has been set.`;
      } else if (this.props.journey.departureDelay > 0 && nextProps.journey.departureDelay == 0) {
        text += `No departure delay anymore.`;
      } else if (this.props.journey.departureDelay > nextProps.journey.departureDelay) {
        const minutes = (this.props.journey.departureDelay - nextProps.journey.departureDelay);
        text += `Departure delay has decreased by ${minutes} minutes.`;
        text += `Departure delay is ${nextProps.journey.departureDelay} minutes`;
      } else if (this.props.journey.departureDelay < nextProps.journey.departureDelay) {
        const minutes = (nextProps.journey.departureDelay - this.props.journey.departureDelay);
        text += `Departure delay has increased by ${minutes} minutes.`;
        text += `Departure delay is ${nextProps.journey.departureDelay} minutes`;
      }
    }

    if (this.props.journey.arrivalDelay !== nextProps.journey.arrivalDelay) {
      if (this.props.journey.arrivalDelay === 0 && nextProps.journey.arrivalDelay > 0) {
        text += `An arrival delay of ${nextProps.journey.arrivalDelay} minutes has been set.`;
      } else if (this.props.journey.arrivalDelay > 0 && nextProps.journey.arrivalDelay == 0) {
        text += `No arrival delay anymore.`;
      } else if (this.props.journey.arrivalDelay > nextProps.journey.arrivalDelay) {
        const minutes = (this.props.journey.arrivalDelay - nextProps.journey.arrivalDelay);
        text += `Arrival delay has decreased by ${minutes} minutes.`;
        text += `Arrival delay is ${nextProps.journey.arrivalDelay} minutes.`;
      } else if (this.props.journey.arrivalDelay < nextProps.journey.arrivalDelay) {
        const minutes = (nextProps.journey.arrivalDelay - this.props.journey.arrivalDelay);
        text += `Arrival delay has increased by ${minutes} minutes.`;
        text += `Arrival delay is ${nextProps.journey.arrivalDelay} minutes`;
      }
    }

    if (!this.props.journey.cancelled && nextProps.journey.cancelled) {
      text += 'This ride has been cancelled.';
    } else if (this.props.journey.cancelled && !nextProps.journey.cancelled) {
      text += 'The cancellation has been lifted.';
      text += `The train its new departure time is ${nextProps.journey.departureTime}`;
    }

    if (text !== '') {
      text = `
        Journey update: The train departing at ${this.props.journey.departureTime}
        has updated information: ${text}
      `;

      this.props.dispatch(queueSpeechText(SPEECH_TYPE_JOURNEY_PLANNER, text));
    }
  }

  render() {
    const classes = classNames(styles.Journey, {
      [styles.cancelled]: this.props.journey.cancelled,
      [styles.malfunction]: this.props.journey.malfunction,
    });

    const transportImageClasses = classNames(styles['transport-image'], {
      [styles['has-transport-image']]: this.props.journey.transportImage,
    });

    const transportImage = this.props.journey.transportImage
      || 'https://vt.ns-mlab.nl/v1/images/virm_6.png';

    return (
      <div className={classes}>
        <div className={transportImageClasses}>
          <img src={transportImage} />
        </div>

        <div className={styles['info-wrapper']}>
          <div className={styles['info-container']}>
            <div className={styles['departure-time']}>
              {this.props.journey.departureTime}
            </div>

            {this.props.journey.departureDelay > 0 ? (
              <div className={styles.delay}>
                (+{this.props.journey.departureDelay})
              </div>
            ) : null}

            <div className={styles.icon} />

            <div className={styles['arrival-time']}>
              {this.props.journey.arrivalTime}
            </div>

            {this.props.journey.arrivalDelay > 0 ? (
              <div className={styles.delay}>
                (+{this.props.journey.arrivalDelay})
              </div>
            ) : null}
          </div>

          {this.props.journey.error ? (
            <div className={styles['error-container']}>
              {this.props.journey.error}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
  };
}

export default connect(mapStateToProps)(Journey);
