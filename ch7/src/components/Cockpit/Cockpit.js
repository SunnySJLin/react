import React, { useEffect } from 'react';
import cssClasses from './Cockpit.css';

const cockpit = (props) => {
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // HTTP requests...
        setTimeout(() => {
            alert('Saved data to cloud!');
        }, 3000);

        return () => { //when we unmont
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    const classes = [];
    let btnClass = '';

    if(props.showPersons) {
        btnClass = cssClasses.Red;
    }

    if(props.persons.length <= 2) {
        classes.push(cssClasses.red); // classes = ['red']
    }
    if(props.persons.length <= 1) {
        classes.push(cssClasses.bold); //classes = ['red', 'bold']
    }

    return (
        <div className={cssClasses.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working</p>

            <button
                className={btnClass}
                onClick={props.clicked}>Toggle persons
            </button>
        </div>
    );
};

export default cockpit;