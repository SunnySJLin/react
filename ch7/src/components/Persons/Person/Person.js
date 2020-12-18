import React from 'react';
import cssClasses from './Person.css';

const person = (props) => {
    return (
        <div className={cssClasses.Person}>
            <p onClick={props.clicked}>I'm {props.name}, {props.age} years old!</p>
            <p>{props.children}</p>

            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;