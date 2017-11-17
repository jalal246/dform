/* eslint react/require-default-props: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import newId from '../../utils/newId';
import get from '../../utils/get';

class Dropdown extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string.isRequired,
    r: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    /**
    * bind handlers
    */
    this.onChange = this.onChange.bind(this);
    this.state = {
      selected: this.props.selected,
    };
    /**
    * define uuid as key
    */
    this.key = newId;
  }

  onChange(e) {
    this.setState({ selected: get.ev(e) });
    this.props.onChange(e);
  }

  render() {
    const { data, disabled, r, c } = this.props;
    const { selected } = this.state;
    return (
      <select onChange={this.onChange} value={selected} disabled={disabled} data-r={r} data-c={c}>
        {data.map(e => (
          <option value={e} key={this.key()}>
            {e}
          </option>
        ))}
      </select>
    );
  }
}

export default Dropdown;
