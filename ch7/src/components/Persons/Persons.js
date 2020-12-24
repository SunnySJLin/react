import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // shouldComponentUpdate(nextProps, nextSate) {
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if(nextProps.persons !== this.props.persons ||
  //      nextProps.changed !== this.props.changed ||
  //      nextProps.clicked !== this.props.clicked) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!' };
  }

  // componentWillUpdate() {
  // }

  componentDidUpdate(prevProps, prevState, snapshoot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshoot);
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Persons.js] rendering...');

    return this.props.persons.map( (person, index) => {
      return (
        <Person
          key={person.id}
          name={person.name}
          age={person.age}
          clicked={() => this.props.click(index)}
          changed={(event) => this.props.change(event, person.id)}
          isAuth={this.props.isAuthenticated}
        />
      )
    });
  }
}

export default Persons;