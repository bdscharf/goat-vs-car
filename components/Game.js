import React, { Component } from 'react';

import Door from './Door';
import ActionBox from './ActionBox';

// Generates an array of numbers [1...n]
function generateDoors(n) {
  let doors = [];
  for (let i = 0; i < n; i++) {
    doors.push(i+1);
  }
  return doors;
}

// Generate a number in range min-max inclusive on tail
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Flatten an array
function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}

// Get an array of size n filled with door numbers
function generateSample(n, doors, offLimits=false) {
  if (!offLimits) {
    var offLimits = []
  }
  let sample = []; let indexChoice = null; let doorChoice = null;
  for (let i = 0; i < n; i++) {
    indexChoice = randomInt(0, doors.length-1); // pick a random index in doors
    while (offLimits.includes(doors[indexChoice])) { // check if door at index is already used
      indexChoice = randomInt(0, doors.length-1);
    }
    doorChoice = doors.splice(indexChoice, 1);
    offLimits.push(doorChoice);
    sample.push(doorChoice);
  }
  sample = flattenDeep(sample);
  return sample;
}

class GeneralizedGame extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();

    this.handleClick = this.handleClick.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  initialState() {
    const doors = generateDoors(this.props.doorCount);
    const prizeDoors = generateSample(this.props.prizeCount, doors);

    return {
      firstChoice: null,
      secondChoice: null,
      carDoors: prizeDoors,
      openedDoors: [],
      gameStep: 1,
      winner: false
    };
  }

  handleClick(val) {
    switch (this.state.gameStep) {
      case 1:
        this.setState({
          firstChoice: val,
          gameStep: 2
        });
        this.openDoors();
        break;
      case 2:
        this.setState({
          secondChoice: val,
          gameStep: 3
        });
        if (val == this.state.firstChoice) {
          this.processEnding(val, false); // did not switch
        }
        else {
          this.processEnding(val, true);
        }
        break;
      case 3: // in-place to catch clicks
        break;
      default:
        console.error('gameStep variable is invalid.');
    }
  }

  handlePress(e) {
    e.preventDefault();
    switch(this.state.gameStep) {
      case 2: // this reflects a press of the 'stay' button
        this.setState((state, props) => {
          return {
            secondChoice: state.firstChoice,
            gameStep: 3
          };
        });
        this.processEnding(this.state.firstChoice, false); // pressed button = didn't switch
        break;
      case 3: // this reflects a press of the 'reset' button
        this.setState(this.initialState());
        break;
      default:
        console.error('Invalid game state for button press.');
    }
  }

  processEnding(choice, didSwitch) {
    if (this.state.carDoors.includes(choice)) { // winner
      this.setState({
        winner: true
      });
      if (didSwitch) {
        this.props.updateProps({
          switchWinCount: this.props.switchWinCount + 1
        });
      }
      else {
        this.props.updateProps({
          stayWinCount: this.props.stayWinCount + 1
        });
      }
    }
    else {
      if (didSwitch) {
        this.props.updateProps({
          switchLossCount: this.props.switchLossCount + 1
        });
      }
      else {
        this.props.updateProps({
          stayLossCount: this.props.stayLossCount + 1
        });
      }
    }
  }

  openDoors() {
    this.setState((state, props) =>  {
      let excluded = [...state.carDoors]; // make copy to avoid pass by reference
      excluded.push(state.firstChoice);
      const toOpen = generateSample(props.openCount, generateDoors(props.doorCount), excluded);
      return { openedDoors:toOpen };
    });
  }

  render() {
    // General validation checks for the actual game
    if (!parseInt(this.props.doorCount) || !parseInt(this.props.prizeCount) || !parseInt(this.props.openCount)) {
      return (<p className='loser'>Please enter values for d, p, and x.</p>);
    }
    else if (parseInt(this.props.doorCount) <= 1) {
      return (<p className='loser'>At least 2 doors are required to play.</p>);
    }
    else if (parseInt(this.props.doorCount) <= parseInt(this.props.prizeCount)) {
      return (<p className='loser'>The number of prizes must be less than the number of doors.</p>);
    }
    else if (parseInt(this.props.openCount) > (parseInt(this.props.doorCount))) {
      return (<p className='loser'>Monty cannot open {this.props.openCount} doors if there are only {this.props.doorCount} doors.</p>);
    }
    else if (parseInt(this.props.openCount) >= (parseInt(this.props.doorCount) - parseInt(this.props.prizeCount))) {
      return (<p className='loser'>Monty cannot open {this.props.openCount} doors if {this.props.prizeCount} doors have prizes.</p>);
    }

    const doors = generateDoors(this.props.doorCount);

    return (
      <div className="GameBox">
        <ActionBox gameState={this.state} action={this.handlePress}/>
        {doors.map((ele, i) => {
          if (this.props.smallDoor) {
            return (
              <Door key={ele} num={ele} gameState={this.state} smallDoor={true} action={() => this.handleClick(ele)} />
            );
          }
          else {
            return (
              <Door key={ele} num={ele} gameState={this.state} action={() => this.handleClick(ele)} />
            );
          }
        })}
      </div>
    );
  }
}

module.exports = GeneralizedGame;