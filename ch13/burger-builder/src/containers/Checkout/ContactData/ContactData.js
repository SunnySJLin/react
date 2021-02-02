import React, { Component } from 'react';

import cssClasses from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault(); // not to reload the page
    this.setState({loading: true});
    const formData = {};
    for(let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  inputChangedHandler = (event, inputId) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render () {
    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
          {formElementsArray.map( formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ) )}
          <Button btnType="Success">ORDER</Button>
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