import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

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

  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.persons[0].name = 'Sunny';
    this.setState({
      persons: [
        {name: newName, age: 20},
        {name: "bb", age: 30},
        {name: "cc", age: 45}
      ]
    });
  }

  changeNameHandler = (event) => {
    this.setState({
      persons: [
        {name: "aa", age: 20},
        {name: event.target.value, age: 30},
        {name: "cc", age: 45}
      ]
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
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null;

    if(this.state.showPerson) {
      persons = (
        <div>
          <Person 
              name={this.state.persons[0].name}
              age={this.state.persons[0].age}/>

          <Person 
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            clicked={this.switchNameHandler.bind(this, "Sunny!")}
            changed={this.changeNameHandler}>
            My Hobbies: Racing
          </Person>

          <Person 
            name={this.state.persons[2].name}
            age={this.state.persons[2].age}/>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi I'm React app</h1>

        <button
          style={styleInline}
          onClick={this.togglePersonsHandler}>
          Toggle persons
        </button>

        {persons}
      </div>
    );
  }
}

export default App;
