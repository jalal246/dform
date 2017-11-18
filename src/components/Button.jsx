import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ type, disabled, name, dataOpt, text, onClick }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    name={name}
    data-opt={dataOpt}
  >
    {text}
  </button>
)

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  dataOpt: PropTypes.string,
  text: PropTypes.string.isRequired,
}
Button.defaultProps = {
  type: 'button',
  disabled: false,
  name: null,
  dataOpt: null,
}

export default Button
