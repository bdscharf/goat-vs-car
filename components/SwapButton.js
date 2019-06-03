import React, { Component } from 'react';

class SwapButton extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className="ButtonBox">
        <p>Choose to keep your selection, or choose a new door!</p>
        <button type="button" onClick={this.props.action}>Stay</button>
      </div>
    );
  }
}

module.exports = SwapButton;