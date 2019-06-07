import React, { Component } from 'react';

class ActionBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch(this.props.gameState.gameStep) {
      case 1: // Initial instructions
        return (<p className="InstructionBox">Choose a door!</p>);
        break;
      case 2: // Stay button
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
        break;
      case 3:
        if (this.props.gameState.winner) {
          return (
            <div className="InstructionBox">
              <p className="winner">Congratulations, you won!</p>
              <button type="button" onClick={this.props.action}>
                Play Again
              </button>
            </div>
          );
        }
        else {
          return (
            <div className="InstructionBox">
              <p className="loser">Sorry, you did not win.</p>
              <button type="button" onClick={this.props.action}>
                Play Again
              </button>
            </div>
          );
        }
        break;
      default:
        console.error('gameStep is invalid inside the instruction object.');
    }
    return (<p>Instructions go here.</p>);
  }
}

module.exports = ActionBox;