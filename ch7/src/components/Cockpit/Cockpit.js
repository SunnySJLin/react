import React, { useEffect, useRef } from 'react';
import cssClasses from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // HTTP requests...
        // setTimeout(() => {
        //     alert('Saved data to cloud!');
        // }, 3000);
        toggleBtnRef.current.click();

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

    if(props.personsLength <= 2) {
        classes.push(cssClasses.red); // classes = ['red']
    }
    if(props.personsLength <= 1) {
        classes.push(cssClasses.bold); //classes = ['red', 'bold']
    }

    return (
        <div className={cssClasses.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')}>This is really working</p>

            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}>Toggle persons
            </button>

            <AuthContext.Consumer>
                { (context) =>
                    <button
                        onClick={context.login}>Login
                    </button>
            }
            </AuthContext.Consumer>
        </div>
    );
};

export default React.memo(cockpit);