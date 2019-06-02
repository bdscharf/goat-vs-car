import React, { Component } from 'react';
import Door from './Door';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoor: null
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(val) {
    console.log('Door ' + val + ' clicked.');
    // console.log('Previous state: ' + JSON.stringify(this.state));
    // this.setState({
    //   selectedDoor: childData
    // });
    // console.log('New state: ' + JSON.stringify(this.state));
  }

  render() {
    return (
      <div className='GameBox'>
        <Door action={() => this.handleClick(1)} />
        <Door action={() => this.handleClick(2)} />
        <Door action={() => this.handleClick(3)} />
      </div>
    );
  }
}

module.exports = Game;