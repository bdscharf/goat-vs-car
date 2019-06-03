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
      return (<p className='InstructionBox'>Choose a door!</p>);
    case 'stayOrSwitch':
      return false;
    case 'reveal':
      return 'endState';
    default:
      return (<p>something might've gone wrong</p>);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
      secondChoice: null,
      carDoor: sample[0],
      goatDoor: sample[1],
      gameStep: 'firstChoice',
      firstOpened: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
  }

  // Choose which number door to open, return door number not holding a car
  chooseOpen(currentlySelected) {
    let choice = getRandomInt(1, this.props.doorCount);
    while (choice == currentlySelected || choice == this.state.carDoor) {
      choice = getRandomInt(1, this.props.doorCount);
    }
    console.log('chooseOpen has chosen to open door ' + choice);
    return choice;
  }

  // Handle clicks on doors
  handleClick(val) {
    switch(this.state.gameStep) {
      case 'firstChoice': // prompt user to stay or switch
        this.setState({
          firstChoice: val,
          gameStep: 'stayOrSwitch',
        });
        this.setState((state, props) => {
          return {firstOpened: this.chooseOpen(val)};
        });
        break;
      case 'stayOrSwitch': // time to reveal!
        this.setState({
          secondChoice: val,
          gameStep: 'reveal',
        });
        break;
      case 'reveal':
        console.log('catching clicks here...');
        break;
      case 'showEnd':
        break;
      default:
        return 'something went wrong :(';
    }
  }

  // Handle press on stay button
  handleButtonPress(e) {
    this.setState((state, props) => {
      return {secondChoice: this.state.firstChoice, gameStep: 'reveal'};
    });
  }

  render() {
    let doors = generateDoors(this.props.doorCount);
    let instructions = getInstructions(this.state.gameStep);
    let openDoor = false;
    if (!instructions) {
      instructions = (<SwapButton action={this.handleButtonPress}/>);
    }
    else if (instructions == 'endState') {
      if (this.state.secondChoice == this.state.carDoor) {
        instructions = (<p className='winner'>Congratulations, you won!</p>)
      }
      else {
        instructions = (<p className='loser'>Sorry, you did not win.</p>);
      }
    }
    if (this.state.gameStep == 'stayOrSwitch' && this.state.firstOpened) {
      openDoor = this.state.firstOpened;
    }
    return (
      <div className='GameBox'>
        {doors.map((ele, i) => {
          if (openDoor == ele || this.state.gameStep == 'showEnd') {
            return (<Door key={ele} doorNum={ele} gameState={this.state} action={() => this.handleClick(ele)} isOpen={true}/>)
          }
          else {
            return (<Door key={ele} doorNum={ele} gameState={this.state} action={() => this.handleClick(ele)} isOpen={false} />);
          }
        })}
        {instructions}
      </div>
    );
  }
}

module.exports = Game;