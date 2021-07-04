import React, { useState, Component } from 'react';
import PropTypes from 'prop-types'
import RocketCore from './RocketCore';

const propTypes = {
  takeOff: PropTypes.bool
}

const defaultProps = {
  takeOff: false
}

export function FunctionalRocket({ takeOff }) {
  const [initialLaunchTime] = useState(takeOff ? Date.now() : 0);

  return <RocketCore initialLaunchTime={initialLaunchTime} />;
}

FunctionalRocket.propTypes = propTypes

FunctionalRocket.defaultProps = defaultProps

export class ClassRocket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLaunchTime: this.props.takeOff ? Date.now() : 0
    };
  }

  render() {
    const { initialLaunchTime } = this.state;

    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}

ClassRocket.propTypes = propTypes

ClassRocket.defaultProps = defaultProps