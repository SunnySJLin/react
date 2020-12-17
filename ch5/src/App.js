import React, { Component } from 'react';
import cssClasses from './App.css';
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
    let persons = null;

    let btnClass = [cssClasses.Button]; //pointer

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

      btnClass.push(cssClasses.Red);
    }

    // let classes = ['red', 'bold'].join(' ');
    const classes = [];
    if(this.state.persons.length <= 2) {
      classes.push(cssClasses.red); // classes = ['red']
    }
    if(this.state.persons.length <= 1) {
      classes.push(cssClasses.bold); //classes = ['red', 'bold']
    }

    return (
      <div className={cssClasses.App}>
        <h1>Hi I'm React app</h1>
        <p className={classes.join(' ')}>setting className dynamically</p>

        <button
          className={btnClass.join(' ')}
          onClick={this.togglePersonsHandler}>
          Toggle persons
        </button>

        {persons}
      </div>
    );
  }
}

export default App;
