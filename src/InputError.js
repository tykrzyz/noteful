import React from 'react';

export default class InputError extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {      
      return (
        <h2>Could not add item. Please ensure that you have filled out the form completely</h2>
      );
    }
    return this.props.children;
  }  
}