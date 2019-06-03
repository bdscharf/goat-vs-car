import React, { Component } from 'react';
import Door from './Door';
import SwapButton from './SwapButton';

function generateDoors(n) {
  let doors = new Array(n);
  for (let i = 0; i < doors.length; i++) {
    doors[i] = i+1;
  }
  return doors;
}

function getInstructions(gameState) {
  switch(gameState) {
    case 'firstChoice':
      return (<p>Choose a door!</p>);
    case 'stayOrSwitch':
      return false;
    default:
      return (<p>something might've gone wrong</p>);
  }
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    // Select car and goat doors
    let doors = generateDoors(this.props.doorCount); let sample = [];
    sample.push(doors.splice(Math.random() * doors.length, 1));
    sample.push(doors.splice(Math.random() * doors.length, 1));
    // Set initial state
    this.state = {
      firstChoice: null,
      carDoor: sample[0],
      goatDoor: sample[1],
      gameStep: 'firstChoice'
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  // Choose which number door to open
  chooseOpen() {

  }

  // Handle clicks on doors
  handleClick(val) {
    switch(this.state.gameStep) {
      case 'firstChoice': // prompt user to stay or switch
        console.log('Choice made for door ' + val);
        this.setState({
          firstChoice: val,
          gameStep: 'stayOrSwitch'
        });
        break;
      case 'stayOrSwitch': // time to reveal!
        console.log("time to reveal");
        break;
      case 'reveal':
        console.log('time to reveal');
        break;
      default:
        return 'something went wrong :(';
    }
  }

  // Handle press on stay button
  handleButtonPress(e) {
    console.log("button has been pressed");
    return "hello";
  }

  render() {
    let doors = generateDoors(this.props.doorCount);
    let instructions = getInstructions(this.state.gameStep);
    if (!instructions) {
      instructions = (<SwapButton action={this.handleButtonPress}/>);
    }
    return (
      <div className='GameBox'>
        {doors.map((ele) => {
          return (<Door key={ele} doorNum={ele} gameState={this.state} action={() => this.handleClick(ele)} />);
        })}
        {instructions}
      </div>
    );
  }
}

module.exports = Game;