import React from 'react';

/**
 * If components
 */
export default class If extends React.Component {
  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    if (this.props.condition) {
      return this.props.children;
    } else {
      return false;
    }
  }
}
