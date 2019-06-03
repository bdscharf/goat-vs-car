import React, { Component } from 'react';
import Door from './Door';

function generateDoors(n) {
  let doors = new Array(n);
  for (let i = 0; i < doors.length; i++) {
    doors[i] = i+1;
  }
  return doors;
}

function getInstructions(gameState) {
  let text = '';
  switch(gameState) {
    case 'firstChoice':
      return (<p>Choose a door!</p>);
    case 'stayOrSwitch':
      return (
        <button type="button">Stay</button>
      );
    default:
      return (<br />);
  }
  return text;
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
      goatDoor: sample[1]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(val) {
    switch(this.props.gameStep) {
      case 'firstChoice': // prompt user to stay or switch
        console.log('Choice made for door ' + val);
        this.props.updateProps({
          gameStep: 'stayOrSwitch'
        });
        this.setState({
          firstChoice: val
        });
        break;
      case 'stayOrSwitch': // time to reveal!
        this.props.updateProps({
          gameStep: 'reveal'
        });
        break;
      case 'reveal':
        console.log('time to reveal');
        break;
      default:
        return 'something went wrong :(';
    }
    console.log('State is now: ');
    console.log(JSON.stringify(this.state));
  }

  render() {
    let doors = generateDoors(this.props.doorCount);
    return (
      <div className='GameBox'>
        {doors.map((ele) => {
          return (<Door key={ele} doorNum={ele} gameState={this.state} action={() => this.handleClick(ele)} />);
        })}
        {getInstructions(this.props.gameStep)}
      </div>
    );
  }
}

module.exports = Game;