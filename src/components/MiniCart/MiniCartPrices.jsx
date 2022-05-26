// MiniCartPrices Component helps us get the right Currency Value depending
// On the Store Set Currenct
// imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Cart Prices Component Entry
class MiniCartPrices extends Component {
    render() {
        // data from the Redux store
        const data = this.props.data;
        // Currency Handler To Decide which currency is set
            const currentCurrency = this.props.currency.currency;
        // Calculation For  products value price * quantity and returns data as a float value
        const amount = parseFloat(
            data[currentCurrency].amount
        ).toFixed(2);
        return <div>{data[currentCurrency].currency.symbol + amount}</div>;
    }
}

// Loads the current Store Currency
const mapStateProps = (state) => {
    return {
        currency: state.currency
    };
};

export default connect(mapStateProps)(MiniCartPrices);
