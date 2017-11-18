import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Button extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string,
    dataOpt: PropTypes.string,
    txt: PropTypes.string.isRequired,
  }
  static defaultProps = {
    type: 'button',
    disabled: false,
    name: null,
    dataOpt: null,
  }
  render() {
    const { type, disabled, name, dataOpt, txt, onClick } = this.props
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        name={name}
        data-opt={dataOpt}
      >
        {txt}
      </button>
    )
  }
}

export default Button
