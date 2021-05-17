import React from "react";
import PropTypes  from 'prop-types';
import classnames from 'classnames';

class Button extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    isBlack: PropTypes.bool,
    isGreen: PropTypes.bool,
    isWhite: PropTypes.bool
  };

  render() {
    let classNames = classnames(`c-btn ${this.props.className || ''}`, {
      'c-btn--black': this.props.isBlack,
      'c-btn--green': this.props.isGreen,
      'c-btn--white': this.props.isWhite
    });
    return <button onClick={this.props.onClick} className={classNames}>
      {this.props.text}
    </button>
  }
}

export default Button;
