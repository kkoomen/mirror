import React, { Component } from 'react';
import { connect } from 'react-redux';

import Journey from './Journey';
import { updateJourneys } from '../../actions/JourneyPlanner';

import styles from './style.css';

class JourneyPlanner extends Component {
  constructor(props:any) {
    super(props);
    this.interval = null;
  }

  componentDidMount() {
    this.props.dispatch(updateJourneys());

    this.interval = setInterval(() => {
      this.props.dispatch(updateJourneys());
    }, (1000 * 60));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className={styles.JourneyPlanner}>
        <div>
          <h2>{this.props.journeys.departure}</h2>
        </div>

        <div>
          <h2>{this.props.journeys.arrival}</h2>
        </div>

        {this.props.journeys.schedules.map((journey, index) => (
          <Journey journey={journey} key={index} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    journeys: state.journeyPlanner,
  };
}

export default connect(mapStateToProps)(JourneyPlanner);
