import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Speech from '../../components/Speech';

import Home from '../Home';

import styles from './style.css';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Speech />

        {false ? (
          <header>
            <Link to="/">Home</Link>
          </header>
        ) : null}

        <main>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={styles.screen}
          >
            <Route strict exact path="/" component={Home} />
            <Route component={Home} />
          </AnimatedSwitch>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
  };
}

export default connect(mapStateToProps)(App);
