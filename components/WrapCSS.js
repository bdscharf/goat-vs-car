import React, { Component, PureComponent } from 'react';

class WrapCSS extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.divclass}>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

module.exports = WrapCSS;