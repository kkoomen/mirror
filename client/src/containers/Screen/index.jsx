import React, { Component } from 'react';
import { RouteHandler } from 'react-router-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Screen extends Component {
  render() {
    const name = this.context.router.getCurrentPath();
    return (
      <div className="Screen">
        <ReactCSSTransitionGroup component="div" transitionName="page-transition">
          <RouteHandler key={name} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Screen;
