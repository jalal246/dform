/* eslint react/require-default-props: 0 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Checkbox extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
    checked: PropTypes.bool,
    txt: PropTypes.string,
    rw: PropTypes.number.isRequired,
    clm: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { isChecked: this.props.checked || false }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState(ps => ({ isChecked: !ps.isChecked }))
    this.props.onChange(e)
  }

  render() {
    const { txt, id, rw, clm } = this.props
    const { isChecked } = this.state
    return (
      <div role="presentation">
        <input
          type="checkbox"
          value={txt || 'grid'}
          checked={isChecked}
          id={id}
          onChange={this.onChange}
          data-rw={rw}
          data-clm={clm}
        />
        {txt && <label htmlFor={id}>{txt}</label>}
      </div>
    )
  }
}

export default Checkbox
