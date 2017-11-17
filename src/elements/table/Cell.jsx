import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Cell extends PureComponent {
  static propTypes = {
    isHeader: PropTypes.bool,
    children: PropTypes.element.isRequired,
  };
  static defaultProps = {
    isHeader: false,
  };
  render() {
    return this.props.isHeader ? <th>{this.props.children}</th> : <td>{this.props.children}</td>;
  }
}

export default Cell;
