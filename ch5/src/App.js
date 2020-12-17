import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: "a111", name: "aa", age: 20},
      {id: "b222", name: "bb", age: 30},
      {id: "c333", name: "cc", age: 40}
    ],
    otherState: "some other state",
    showPerson: false
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // const person = Object.assign({}, this.state.persons[personIndex]);
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({
      showPerson: !doesShow
    });
  }

  render() {
    const styleInline = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if(this.state.showPerson) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              clicked={() => this.deletePersonHandler(index)}
              changed={(event) => this.changeNameHandler(event, person.id)}/>
          })}
        </div>
      );

      styleInline.backgroundColor = 'red';
      styleInline[":hover"] = {
        backgroundColor: 'salmon',
        color: 'black'
      };
    }

    let classes = ['red', 'bold'].join(' ');

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi I'm React app</h1>
          <p className={classes}>This is really working</p>

          <button
            style={styleInline}
            onClick={this.togglePersonsHandler}>
            Toggle persons
          </button>

          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
