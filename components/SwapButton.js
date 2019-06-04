import React, { Component } from "react";

class SwapButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ButtonBox">
        <p className="instructions">
          One door has been opened for you. You may keep your selection, or
          choose a different door!
        </p>
        <button type="button" onClick={this.props.action}>
          Stay
        </button>
      </div>
    );
  }
}

module.exports = SwapButton;
