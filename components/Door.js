import React, { Component } from 'react';

class Door extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var doorImg = (<img src='static/images/closed.png'/>);
    if (this.props.doorNum == this.props.gameState.firstChoice) {
      doorImg = (<img src='static/images/selected.png'/>);
    }

    return (
      <div className='DoorBox' onClick={this.props.action}>
        {doorImg}
      </div>
    );
  }
}

module.exports = Door;

