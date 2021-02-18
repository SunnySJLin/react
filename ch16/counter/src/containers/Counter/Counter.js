import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

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
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li 
                          key={strResult.id} 
                          onClick={() => this.props.onDeleteResult(strResult.id)}>
                            {strResult.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    storedResults: state.res.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
    onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
    onAddCounter: () => dispatch({type: actionTypes.ADD, val: 500}),
    onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 50}),
    onStoreResult: (res) => dispatch({type: actionTypes.STORE_RESULT, result: res}),
    onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);