/* eslint react/require-default-props: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Button extends PureComponent {
  static propTypes = {
    opt: PropTypes.string.isRequired,
    isRw: PropTypes.string,
    txt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
  };
  render() {
    const { opt, isRw, disabled, txt, onClick } = this.props;
    return (
      <button type="button" disabled={disabled} onClick={onClick} data-opt={opt} data-rw={isRw}>
        {txt}
      </button>
    );
  }
}

export default Button;
