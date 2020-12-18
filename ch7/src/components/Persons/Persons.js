import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.persons.map( (person, index) => {
        return <Person
          key={person.id}
          name={person.name}
          age={person.age}
          clicked={() => props.click(index)}
          changed={(event) => props.change(event, person.id)}/>
} );

export default persons;