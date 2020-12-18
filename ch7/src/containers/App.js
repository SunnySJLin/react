import React, { Component } from 'react';
import cssClasses from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor 1');
    //set some initial state based on props
    //can setup state like: this.state = {};
    //but don't use: this.setState();
  }

  state = {
    persons: [
      {id: "a111", name: "aa", age: 20},
      {id: "b222", name: "bb", age: 30},
      {id: "c333", name: "cc", age: 40}
    ],
    otherState: "some other state",
    showPersons: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps 2', props);
    return state;
  }

  componentWillMount() {
    //will be removed in the future
    //generally it would be something like preparing your state correctly
    console.log('[App.js] componentWillMount 3.5');
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount 4');
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
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }

  render() {
    console.log('[App.js] render 3');
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons 
          persons={this.state.persons}
          click={this.deletePersonHandler}
          change={this.changeNameHandler} />;
    }

    return (
      <div className={cssClasses.App}>
        <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
