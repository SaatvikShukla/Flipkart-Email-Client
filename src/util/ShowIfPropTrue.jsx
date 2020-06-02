import React, { Component } from 'react';

export default class ShowIfPropTrue extends Component {
  render() {
    const { prop, children } = this.props;
    return prop ? React.cloneElement(children) : null;
  }
}
