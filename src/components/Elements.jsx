import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Elements extends PureComponent {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    type: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
      .isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    name: PropTypes.string,
    dataOpt: PropTypes.string,
  }
  static defaultProps = {
    type: 'text',
    disabled: false,
    data: false,
    text: null,
    name: null,
    dataOpt: null,
    id: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: this.props.defaultValue,
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
      defaultValue: e.target.value,
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
      (type === 'blur' && this.props.defaultValue !== this.state.tempVal) ||
      (type === 'keypress' && e.key === 'Enter')
    ) {
      this.props.onBlur(e)
    }
  }

  Input = () => (
    <input
      name={this.props.name}
      id={this.props.id}
      data-opt={this.props.dataOpt}
      type={this.state.type}
      value={this.state.defaultValue}
      checked={this.state.defaultValue}
      onChange={this.onChange}
      onBlur={this.handler}
      onClick={this.handler}
      onKeyPress={this.handler}
    />
  )

  Lable = () => <label htmlFor={this.props.id}>{this.props.text}</label>

  Checkbox = () => (
    <div role="presentation">
      {this.Input()}
      {this.props.text && this.Lable()}
    </div>
  )

  Dropdown = () => (
    <select
      onChange={this.onChange}
      value={this.props.defaultValue}
      disabled={this.props.disabled}
      name={this.props.name}
      data-opt={this.props.dataOpt}
    >
      {this.props.data.map(e => (
        <option value={e} key={this.key()}>
          {e}
        </option>
      ))}
    </select>
  )

  render() {
    const { type } = this.props

    if (type === 'Dropdown') return this.Dropdown()
    else if (type === 'checkbox') {
      return <div role="presentation">{this.Checkbox()}</div>
    }
    return this.Input()
  }
}

export default Elements
