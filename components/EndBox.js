import React, { Component } from "react";

class EndBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.didWin) {
      return (
        <div className="InstructionBox">
          <p className="winner">Congratulations, you won!</p>
          <button type="button" onClick={this.props.action}>
            Play Again
          </button>
        </div>
      );
    } else {
      return (
        <div className="InstructionBox">
          <p className="loser">Sorry, you did not win.</p>
          <button type="button" onClick={this.props.action}>
            Play Again
          </button>
        </div>
      );
    }
  }
}

module.exports = EndBox;
