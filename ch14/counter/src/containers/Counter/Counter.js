import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 500" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 50" clicked={this.props.onSubtractCounter} />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strRes => (
                        <li key={strRes.id} onClick={this.props.onDeleteResult}>{strRes.value}</li>
                    ))}
                    
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    ctr: state.counter,
    storedResults: state.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
    onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
    onAddCounter: () => dispatch({type: 'ADD', val: 500}),
    onSubtractCounter: () => dispatch({type: 'SUBTRACT', val: 50}),
    onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
    onDeleteResult: () => dispatch({type: 'DELETE_RESULT'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);