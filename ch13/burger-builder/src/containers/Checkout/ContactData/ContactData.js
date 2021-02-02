import React, { Component } from 'react';

import cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault(); // not to reload the page
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Sunnysj',
        address: {
          street: 'Teststreet 1',
          zipCode: 9999,
          country: 'Taiwan'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    console.log(this.props);

    axios.post('/orders.json', order)
      .then(response => {
        // console.log(response);
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        // console.log(error);
        this.setState({loading: false});
      });
  }

  render () {
    let form = (
      <form>
          <input className={cssClasses.Input} type="text" name="name" placeholder="Your Name" />
          <input className={cssClasses.Input} type="email" name="email" placeholder="Your Email" />
          <input className={cssClasses.Input} type="text" name="street" placeholder="Street" />
          <input className={cssClasses.Input} type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
    );
    if(this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={cssClasses.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;