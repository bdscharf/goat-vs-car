import React, { Component } from "react";
import Door from "./Door";
import SwapButton from "./SwapButton";
import EndBox from "./EndBox";

function generateDoors(n) {
  let doors = new Array(n);
  for (let i = 0; i < doors.length; i++) {
    doors[i] = i + 1;
  }
  return doors;
}

function getInstructions(gameState) {
  switch (gameState) {
    case "firstChoice":
      return <p className="InstructionBox">Choose a door!</p>;
    case "stayOrSwitch":
      return false;
    case "reveal":
      return "endState";
    default:
      return <p>something might've gone wrong</p>;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();

    this.handleClick = this.handleClick.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.resetButton = this.resetButton.bind(this);
  }

  initialState() {
    let doors = generateDoors(this.props.doorCount);
    let sample = [];
    sample.push(doors.splice(Math.random() * doors.length, 1));
    sample.push(doors.splice(Math.random() * doors.length, 1));
    // Set initial state
    return {
      firstChoice: null,
      secondChoice: null,
      carDoor: sample[0],
      goatDoor: sample[1],
      gameStep: "firstChoice",
      firstOpened: null
    };
  }

  // Choose which number door to open, return door number not holding a car
  chooseOpen(currentlySelected) {
    let choice = getRandomInt(1, this.props.doorCount);
    while (choice == currentlySelected || choice == this.state.carDoor) {
      choice = getRandomInt(1, this.props.doorCount);
    }
    return choice;
  }

  // Handle clicks on doors
  handleClick(val) {
    switch (this.state.gameStep) {
      case "firstChoice": // prompt user to stay or switch
        this.setState({
          firstChoice: val,
          gameStep: "stayOrSwitch"
        });
        this.setState((state, props) => {
          return { firstOpened: this.chooseOpen(val) };
        });
        break;
      case "stayOrSwitch": // time to reveal!
        this.setState({
          secondChoice: val,
          gameStep: "reveal"
        });
        if (val == this.state.carDoor) {
          this.props.updateProps({
<<<<<<< HEAD
            switchWinCount:this.props.switchWinCount+1
=======
            winCount: this.props.winCount + 1
>>>>>>> 16972724d9b472169bff550e923481ae31f7c1c2
          });
        } else {
          this.props.updateProps({
<<<<<<< HEAD
            switchLossCount:this.props.switchLossCount+1
=======
            lossCount: this.props.lossCount + 1
>>>>>>> 16972724d9b472169bff550e923481ae31f7c1c2
          });
        }
        break;
      case "reveal":
        // catch clicks that shouldn't change state
        break;
      case "showEnd":
        break;
      default:
        return "something went wrong :(";
    }
  }

  // Handle press on stay button
  handleButtonPress(e) {
    e.preventDefault();
    this.setState((state, props) => {
      return { secondChoice: this.state.firstChoice, gameStep: "reveal" };
    });
    if (this.state.firstChoice == this.state.carDoor) {
      this.props.updateProps({
<<<<<<< HEAD
        stayWinCount:this.props.stayWinCount+1
=======
        winCount: this.props.winCount + 1
>>>>>>> 16972724d9b472169bff550e923481ae31f7c1c2
      });
    } else {
      this.props.updateProps({
<<<<<<< HEAD
        stayLossCount:this.props.stayLossCount+1
=======
        lossCount: this.props.lossCount + 1
>>>>>>> 16972724d9b472169bff550e923481ae31f7c1c2
      });
    }
  }

  resetButton(e) {
    e.preventDefault();
    this.setState(this.initialState());
  }

  render() {
    let doors = generateDoors(this.props.doorCount);
    let instructions = getInstructions(this.state.gameStep);
    let openDoor = false;

    // Write to the instructions section
    if (!instructions) {
      instructions = <SwapButton action={this.handleButtonPress} />;
    } else if (instructions == "endState") {
      if (this.state.secondChoice == this.state.carDoor) {
        instructions = <EndBox didWin={true} action={this.resetButton} />;
      } else {
        instructions = <EndBox didWin={false} action={this.resetButton} />;
      }
    }

    // Check if any doors need to be opened
    if (this.state.gameStep == "stayOrSwitch" && this.state.firstOpened) {
      openDoor = this.state.firstOpened;
    }

    return (
      <div className="GameBox">
        {doors.map((ele, i) => {
          if (openDoor == ele || this.state.gameStep == "showEnd") {
            return (
              <Door
                key={ele}
                doorNum={ele}
                gameState={this.state}
                action={() => this.handleClick(ele)}
                isOpen={true}
              />
            );
          } else {
            return (
              <Door
                key={ele}
                doorNum={ele}
                gameState={this.state}
                action={() => this.handleClick(ele)}
                isOpen={false}
              />
            );
          }
        })}
        {instructions}
      </div>
    );
  }
}

module.exports = Game;
