/* eslint react/require-default-props: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import get from '../../utils/get';

class Input extends PureComponent {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    r: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
    type: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      tempVal: this.props.value,
      type: this.props.type || 'text', // designMode value
    };
    ['handler', 'onChange'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  /**
   * we dont want to check event type each time the user press
   * so it is individual function
  */
  onChange(e) {
    this.setState({
      tempVal: get.ev(e),
    });
  }

  /**
    * Event handler
    *
    * we care for blur and keypress in normal mode not for design mode
    * only update the value when there is different: this.props.value !== this.state.tempVal
    *
    * In design mode we render Dropdown component
    * only update the value when there is different: this.state.type !== e.target .value
    */
  handler(e) {
    const type = e.type;
    if (
      (type === 'blur' && this.props.value !== this.state.tempVal) ||
      (type === 'keypress' && e.key === 'Enter')
    ) {
      this.props.onBlur(e);
    }
  }

  render() {
    const { r, c } = this.props;
    const { tempVal, type } = this.state;
    return (
      <input
        type={type}
        value={tempVal}
        onChange={this.onChange}
        onBlur={this.handler}
        onClick={this.handler}
        onKeyPress={this.handler}
        data-r={r}
        data-c={c}
      />
    );
  }
}

export default Input;
