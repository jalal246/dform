import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { LBL } from '.././utils/constants'

class EditLable extends PureComponent {
  static propTypes = {
    onBlur: PropTypes.func.isRequired,
    designMode: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dataOpt: PropTypes.string,
  }
  static defaultProps = {
    dataOpt: 'grid',
  }
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      tempVal: this.props.value,
    }

    /**
     * bind handlers
     */
    ;['onBlur', 'onChange', 'onClick', 'onKeyPress'].forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  onChange(e) {
    this.setState({ tempVal: e.target.value })
  }

  onBlur(e) {
    if (this.props.designMode) {
      if (this.state.tempVal === '') {
        this.setState({
          isEditing: false,
          tempVal: LBL.EDIT,
        })
      } else {
        this.setState({
          isEditing: false,
        })
        if (this.props.value !== this.state.tempVal) {
          this.props.onBlur(e)
        }
      }
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') this.onBlur(e)
  }

  onClick() {
    if (this.props.designMode) {
      this.setState(ps => ({
        isEditing: true,
        tempVal: ps.tempVal === LBL.EDIT ? '' : ps.tempVal,
      }))
    }
  }

  render() {
    const { designMode, name, dataOpt } = this.props

    const { isEditing, tempVal } = this.state

    return isEditing && designMode ? (
      <input
        type="text"
        value={tempVal}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPress}
        ref={input => input && input.focus()}
        name={name}
        data-opt={dataOpt}
      />
    ) : (
      <div
        role="presentation"
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
      >
        {tempVal}
      </div>
    )
  }
}

export default EditLable
