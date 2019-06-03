import React, { Component, PureComponent } from 'react';

class WrapCSS extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.divclass);
    console.log(this.props.text);
    return (
      <div className={this.props.divclass}>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

module.exports = WrapCSS;