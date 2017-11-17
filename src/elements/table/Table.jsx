import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Table extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return(
      <table>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}

export default Table;
