import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    return (
      <div className={styles.Clock}>
        <div className={styles.time}>
          <h1>{this.props.clock.time}</h1>
        </div>
        <div className={styles.weekday}>
          <p>{this.props.clock.weekday}</p>
        </div>
        <div className={styles['full-date']}>
          <p>{this.props.clock.fullDate}</p>
        </div>
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
