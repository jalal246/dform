/* eslint react/require-default-props: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    r: PropTypes.number,
    c: PropTypes.number,
    checked: PropTypes.bool,
    txt: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { isChecked: this.props.checked || false };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState(ps => ({ isChecked: !ps.isChecked }));
    this.props.onChange(e);
  }

  render() {
    const { txt, id, r, c } = this.props;
    const { isChecked } = this.state;
    // const id = this.props.id || `c${ci}r${ri}`;
    return (
      <div role="presentation">
        <input
          type="checkbox"
          value={txt || 'grid'}
          checked={isChecked}
          id={id}
          onChange={this.onChange}
          data-r={r}
          data-c={c}
        />
        {txt && <label htmlFor={id}>{txt}</label>}
      </div>
    );
  }
}

export default Checkbox;
