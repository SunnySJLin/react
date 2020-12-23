import React, { Component } from 'react';
import cssClasses from './Person.css';
import Aux from '../../../hoc/Auxilliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';

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
  }
}

Person.propTypes = {
  clicked: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClass(Person, cssClasses.Person);