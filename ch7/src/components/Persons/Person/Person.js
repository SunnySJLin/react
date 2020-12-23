import React, { Component } from 'react';
import cssClasses from './Person.css';

import Aux from '../../../hoc/Auxilliary'; // import { Fragment } from 'react';

class Person extends Component {
  render() {
    console.log('[Perosn.js] rendering...');
    
    return (
      <Aux>
        <p onClick={this.props.clicked}>I'm {this.props.name}, {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input 
          type="text" 
          onChange={this.props.changed} 
          value={this.props.name}
          />
      </Aux>
    )

    // return [
    //   <p key="id1" onClick={this.props.clicked}>I'm {this.props.name}, {this.props.age} years old!</p>,
    //   <p key="id2">{this.props.children}</p>,
    //   <input 
    //     key="id3" 
    //     type="text" 
    //     onChange={this.props.changed} 
    //     value={this.props.name}
    //     />
    // ]
  }
}

export default Person;