import React, { Component } from 'react';
import cssClasses from './Person.css';

class Person extends Component {
  render() {
    console.log('[Perosn.js] rendering... (2)');
    
    return (
      <div className={cssClasses.Person}>
        <p onClick={this.props.clicked}>I'm {this.props.name}, {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input 
          type="text" 
          onChange={this.props.changed} 
          value={this.props.name}
          />
      </div>
    )
  }
}

export default Person;