import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Journey from './Journey';
import { updateJourneys } from '../../actions/JourneyPlanner';

import styles from './style.css';

class JourneyPlanner extends Component {
  constructor(props:any) {
    super(props);
    this.interval = null;
    this.initialJourneyFetchTimeoutId = null;
  }

  componentDidMount() {
    // Dispatch our initial call 5 seconds later to ensure the server runs.
    this.initialJourneyFetchTimeoutId = setTimeout(() => {
      this.props.dispatch(updateJourneys());
    }, 5000);

    // Update the journeys every minute.
    this.interval = setInterval(() => {
      this.props.dispatch(updateJourneys());
    }, (1000 * 60));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.initialJourneyFetchTimeoutId);
  }

  render() {
    return (
      <div className={styles.JourneyPlanner}>
        {this.props.journeys.schedules.length < 1 ? (
          <p>Loading journeys...</p>
        ) : (
          <Fragment>
            <div>
              <h2>{this.props.journeys.departure}</h2>
            </div>

            <div>
              <h2>{this.props.journeys.arrival}</h2>
            </div>

            {this.props.journeys.schedules.map((journey, index) => (
              <Journey journey={journey} key={index} />
            ))}
          </Fragment>
        )}
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
