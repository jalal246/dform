import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Checkbox extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    dataOpt: PropTypes.string,
    txt: PropTypes.string.isRequired,
  }
  static defaultProps = {
    id: null,
    checked: false,
    name: null,
    dataOpt: null,
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
    const { txt, id, name, dataOpt } = this.props
    const { isChecked } = this.state
    return (
      <div role="presentation">
        <input
          type="checkbox"
          value={txt || 'grid'}
          checked={isChecked}
          id={id}
          onChange={this.onChange}
          name={name}
          data-opt={dataOpt}
        />
        {txt && <label htmlFor={id}>{txt}</label>}
      </div>
    )
  }
}

export default Checkbox
