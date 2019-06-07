import React, { Component } from 'react';

class Door extends Component {
  constructor(props) { 
    super(props);
  }

  render() {
    const closed = ( <img src='static/images/closed.png' /> );
    const goat = ( <img src='static/images/goat.png' /> );
    const car = ( <img src='static/images/car.png' /> );
    const selected = ( <img src='static/images/selected.png' /> );
    const selectedGoat = ( <img src='static/images/selected-goat.png' /> );
    const selectedCar = ( <img src='static/images/selected-car.png' /> );

    let door = closed;

    switch (this.props.gameState.gameStep) {
      case 1: // While user is making their first choice
        door = closed;
        break;
      case 2: // While user is making their second choice, and after 
        if (this.props.gameState.firstChoice == this.props.num) {
          door = selected;
        }
        else if (this.props.gameState.openedDoors.includes(this.props.num)) {
          door = goat;
        }
        break;
      case 3: // While user can decide if they want to play again; all doors are open
        if (this.props.gameState.secondChoice == this.props.num) {
          if (this.props.gameState.winner) {
            door = selectedCar;
          }
          else {
            door = selectedGoat;
          }
        }
        else {
          if (this.props.gameState.carDoors.includes(this.props.num)) {
            door = car;
          }
          else {
            door = goat;
          }
        }
        break;
      default:
        console.error('gameStep variable passed to Door is invalid.');
    }

    // make decisions about which door to choose here

    return (
      <div className="DoorBox" onClick={this.props.action}>
        {door}
      </div>
    );
  }
}

module.exports = Door;