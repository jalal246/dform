/* eslint react/require-default-props: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import newId from '../utils/newId'

class Dropdown extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string.isRequired,
    rw: PropTypes.number.isRequired,
    clm: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
  }
  constructor(props) {
    super(props)
    /**
     * bind handlers
     */
    this.onChange = this.onChange.bind(this)
    this.state = {
      selected: this.props.selected,
    }
    /**
     * define uuid as key
     */
    this.key = newId
  }

  onChange(e) {
    this.setState({ selected: e.target.value })
    this.props.onChange(e)
  }

  render() {
    const { data, disabled, rw, clm } = this.props
    const { selected } = this.state
    return (
      <select
        onChange={this.onChange}
        value={selected}
        disabled={disabled}
        data-rw={rw}
        data-clm={clm}
      >
        {data.map(e => (
          <option value={e} key={this.key()}>
            {e}
          </option>
        ))}
      </select>
    )
  }
}

export default Dropdown
