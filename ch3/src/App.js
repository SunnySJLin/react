import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      {name: "aa", age: 20},
      {name: "bb", age: 30},
      {name: "cc", age: 40}
    ],
    otherState: "some other state"
  }

  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.persons[0].name = 'S';
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

  render() {
    const styleInline = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    return (
      <div className="App">
        <h1>Hi I'm React app</h1>

        <button
          style={styleInline}
          onClick={() => this.switchNameHandler("Sunny sj!!")}>
          Switch Name
        </button>

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
}

export default App;
