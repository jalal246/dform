import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { LBL } from '../../utils/constants';
import get from '../../utils/get';

class EditLable extends PureComponent {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    designMode: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    r: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      tempVal: this.props.value,
    };

    /**
    * bind handlers
    */
    ['onBlur', 'onChange', 'onClick', 'onKeyPress'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  onChange(e) {
    this.setState({ tempVal: get.ev(e) });
  }

  onBlur(e) {
    if (this.props.designMode) {
      if (this.state.tempVal === '') {
        this.setState({
          isEditing: false,
          tempVal: LBL.EDIT,
        });
      } else {
        this.setState({
          isEditing: false,
        });
        if (this.props.value !== this.state.tempVal) {
          this.props.onBlur(e);
        }
      }
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') this.onBlur(e);
  }

  onClick() {
    if (this.props.designMode) {
      this.setState(ps => ({
        isEditing: true,
        tempVal: ps.tempVal === LBL.EDIT ? '' : ps.tempVal,
      }));
    }
  }

  render() {
    const { designMode, r, c } = this.props;
    const { isEditing, tempVal } = this.state;
    return isEditing && designMode ? (
      <input
        type="text"
        value={tempVal}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPress}
        ref={input => input && input.focus()}
        data-r={r}
        data-c={c}
      />
    ) : (
      <div role="presentation" onClick={this.onClick}>
        {tempVal}
      </div>
    );
  }
}

export default EditLable;
