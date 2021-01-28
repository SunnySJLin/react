import React, { Component } from 'react';

import cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render () {
    return (
      <div className={cssClasses.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={cssClasses.Input} type="text" name="name" placeholder="Your Name" />
          <input className={cssClasses.Input} type="email" name="email" placeholder="Your Email" />
          <input className={cssClasses.Input} type="text" name="street" placeholder="Your Street" />
          <input className={cssClasses.Input} type="text" name="postalCode" placeholder="Your Postal Code" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;