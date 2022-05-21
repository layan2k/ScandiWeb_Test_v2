// Cart Prices Component helps us get the right Currency Value depending
// On the Store Set Currenct
// imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Cart Prices Component Entry
class CartPrices extends Component {
    render() {
        // data from our Redux store
        const data = this.props.data;
        // Currency Handler To Decide which currency is set
        const currentCurrency = () => {
            const currentCurrency = this.props.currency;
            let currency = 0;
            switch (currentCurrency.currency) {
                case 'USD':
                    currency = 0;
                    break;
                case 'GBP':
                    currency = 1;
                    break;
                case 'AUD':
                    currency = 2;
                    break;
                case 'JPY':
                    currency = 3;
                    break;
                case 'RUB':
                    currency = 4;
                    break;
                default:
                    currency = 5;
            }
            return currency;
        };
        // Currency Handler is used to determine which position our Values are in the Array
        const displayCurrency = currentCurrency();
        // Calculation For our products value price * quantity and returns data as a float value
        const amount = parseFloat(
            data[displayCurrency].amount * this.props.qty
        ).toFixed(2);
        return <div>{data[displayCurrency].currency.symbol + amount}</div>;
    }
}

// Loads the current Store Currency
const mapStateProps = (state) => {
    return {
        currency: state.currency
    };
};

export default connect(mapStateProps)(CartPrices);
