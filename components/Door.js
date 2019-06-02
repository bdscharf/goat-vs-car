import React, { Component } from 'react';

class Door extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doorState: 'closed'
    }
  }

  render() {
    return (
      <div className='DoorBox' onClick={this.props.action}>
        <img src='static/images/closed.png'/>
      </div>
    );
  }
}

module.exports = Door;

// class Door extends Component {
//   constructor(props) {
//     super(props);
//     this.selectDoor = this.selectDoor.bind(this);
//   }

//   selectDoor(val) {
//     console.log('a door has been selected with value: ' + val);
//     this.props.updateProps({
//       value: val
//     });
//   }
// }


// function createDoorImg(doorType) {
//   switch(doorType) {
//     case 'closed':
//       return (<img src='../static/images/closed.png'/>);
//     case 'goat':
//       return (<img src='../static/images/goat.png'/>);
//     case 'car':
//       return (<img src='../static/images/car.png'/>);
//     default:
//       console.log('[ERROR]: bad input passed into door function.');
//   }
// }

// function createDoor(doorType, val) {
//   return (
//     <div className='DoorBox' key={val} value={val} onClick={() => this.selectDoor(val)}>
//       {createDoorImg(doorType)}
//     </div>);
// }

