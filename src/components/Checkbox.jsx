import React from 'react'
import PropTypes from 'prop-types'

import Input from './Input'

const Checkbox = ({ checked, id, onChange, name, dataOpt, txt }) => (
  <div role="presentation">
    <Input
      checked={checked}
      id={id}
      onBlur={onChange}
      name={name}
      dataOpt={dataOpt}
    />
    {txt && <label htmlFor={id}>{txt}</label>}
  </div>
)
Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  dataOpt: PropTypes.string,
  txt: PropTypes.string,
}
Checkbox.defaultProps = {
  id: null,
  checked: false,
  name: null,
  dataOpt: null,
  txt: null,
}

export default Checkbox
