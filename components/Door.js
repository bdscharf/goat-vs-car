import React, { Component } from 'react';

class Door extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var doorImg = (<img src='static/images/closed.png'/>);
    if (this.props.doorNum == this.props.gameState.firstChoice &&
        !this.props.gameState.secondChoice) {
      doorImg = (<img src='static/images/selected.png'/>);
    }
    else if (this.props.doorNum == this.props.gameState.secondChoice) {
      doorImg = (<img src='static/images/selected.png'/>);
    }
    else if (this.props.isOpen) {
      doorImg = (<img src='static/images/goat.png'/>);
    }

    if (this.props.gameState.gameStep == 'reveal') {
      if (this.props.doorNum == this.props.gameState.secondChoice &&
          this.props.doorNum == this.props.gameState.carDoor) {
        doorImg = (<img src='static/images/selected-car.png'/>);
      }
      else if (this.props.doorNum == this.props.gameState.secondChoice &&
               this.props.doorNum != this.props.gameState.carDoor) {
        doorImg = (<img src='static/images/selected-goat.png'/>);
      }
      else if (this.props.doorNum == this.props.gameState.carDoor) {
        doorImg = (<img src='static/images/car.png'/>);
      }
      else {
        doorImg = (<img src='static/images/goat.png'/>);
      }
    }

    return (
      <div className='DoorBox' onClick={this.props.action}>
        {doorImg}
      </div>
    );
  }
}

module.exports = Door;

