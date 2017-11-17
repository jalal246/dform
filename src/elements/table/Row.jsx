import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Row extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return<tr>{this.props.children}</tr>;
  }
}

export default Row;
