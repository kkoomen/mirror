import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { updateClock } from '../../actions/Clock';

import styles from './style.css';

class Clock extends Component {
  constructor(props:any) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.dispatch(updateClock());
    }, 200);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const classes = classNames(styles.Clock, {
      [styles['fade-in']]: this.props.faceDetected,
    });

    return (
      <div className={classes}>
        <div className={styles.time}>{this.props.clock.time}</div>
        <div className={styles.weekday}>{this.props.clock.weekday}</div>
        <div className={styles['full-date']}>{this.props.clock.fullDate}</div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    clock: state.clock,
  };
}

export default connect(mapStateToProps)(Clock);
