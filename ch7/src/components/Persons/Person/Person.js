import React, { Component } from 'react';
import cssClasses from './Person.css';
import Aux from '../../../hoc/Auxilliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef(); // React object
  }

  componentDidMount() {
    // document.querySelector('input').focus(); // select the first element only
    // this.inputElement.focus(); // pass a function
    this.inputElementRef.current.focus();
  }

  render() {
    console.log('[Perosn.js] rendering...');
    
    return (
      <Aux>
        <AuthContext.Consumer>
          { (context) =>
              context.authenticated ? <p>Authenticated!</p> : <p>Please log in.</p>
          }
        </AuthContext.Consumer>
        <p onClick={this.props.clicked}>I'm {this.props.name}, {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input 
          type="text"
          // ref={ (inputEl) => {this.inputElement = inputEl} } // pass a function
          ref={this.inputElementRef}
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