import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Input extends PureComponent {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
    dataOpt: PropTypes.string,
    type: PropTypes.string,
  }
  static defaultProps = {
    type: 'text',
    name: null,
    dataOpt: null,
    id: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      tempVal: this.props.value,
      type: this.props.type,
    }
    this.onChange = this.onChange.bind(this)
    this.handler = this.handler.bind(this)
  }

  /**
   * we dont want to check event type each time the user press
   * so it is individual function
   */
  onChange(e) {
    this.setState({
      tempVal: e.target.value,
    })
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
    const { type } = e
    if (
      (type === 'blur' && this.props.value !== this.state.tempVal) ||
      (type === 'keypress' && e.key === 'Enter')
    ) {
      this.props.onBlur(e)
    }
  }

  render() {
    const { id, name, dataOpt } = this.props
    const { tempVal, type } = this.state
    return (
      <input
        type={type}
        value={tempVal}
        id={id}
        onChange={this.onChange}
        onBlur={this.handler}
        onClick={this.handler}
        onKeyPress={this.handler}
        name={name}
        data-opt={dataOpt}
      />
    )
  }
}

export default Input
