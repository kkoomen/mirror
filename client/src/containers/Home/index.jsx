import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Weather from '../../components/Weather';
import Clock from '../../components/Clock';
import JourneyPlanner from '../../components/JourneyPlanner';

import { detectFace } from '../../actions/FaceDetection';

import styles from './style.css';

class Home extends Component {
  constructor(props:any) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    this.props.dispatch(detectFace());

    this.interval = setInterval(() => {
      this.props.dispatch(detectFace());
    }, 1000 * 2);
  }

  render() {
    const classes = classNames(styles.Home, {
      [styles['fade-in']]: true, // this.props.faceDetected,
    });

    return (
      <div className={classes}>
        <div className={styles['top-frame']}>
          <Weather />
          <Clock />
        </div>

        <div className={styles['bottom-frame']}>
          <JourneyPlanner />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    faceDetected: state.faceDetection.detected,
  };
}

export default connect(mapStateToProps)(Home);
