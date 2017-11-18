/* eslint react/require-default-props: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import newId from '../utils/newId'

class Dropdown extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string.isRequired,
    name: PropTypes.string,
    dataOpt: PropTypes.string,
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    disabled: false,
    name: null,
    dataOpt: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.selected,
    }
    this.onChange = this.onChange.bind(this)
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
    const { data, disabled, name, dataOpt } = this.props
    const { selected } = this.state
    return (
      <select
        onChange={this.onChange}
        value={selected}
        disabled={disabled}
        name={name}
        data-opt={dataOpt}
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
