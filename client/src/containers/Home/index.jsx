import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    }, 2000);
  }

  render() {
    return (
      <div className={styles.Home}>
        <div className={styles['top-frame']}>
          <Weather faceDetected={this.props.faceDetected} />
          <Clock faceDetected={this.props.faceDetected} />
        </div>

        <div className={styles['bottom-frame']}>
          <JourneyPlanner faceDetected={this.props.faceDetected} />
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
