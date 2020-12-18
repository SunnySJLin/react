import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps 1');
  //   return state;
  // }

  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  shouldComponentUpdate(nextProps, nextSate) {
    console.log('[Persons.js] shouldComponentUpdate 2');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate 4');
    return { message: 'Snapshot!' };
  }

  // componentWillUpdate() {
  // }

  componentDidUpdate(prevProps, prevState, snapshoot) {
    console.log('[Persons.js] componentDidUpdate 5');
    console.log(snapshoot);
  }

  render() {
    console.log('[Persons.js] rendering... 3');

    return this.props.persons.map( (person, index) => {
      return (
        <Person
          key={person.id}
          name={person.name}
          age={person.age}
          clicked={() => this.props.click(index)}
          changed={(event) => this.props.change(event, person.id)}
        />
      )
    });
  }
}

export default Persons;