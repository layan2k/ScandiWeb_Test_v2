import React, { Component } from 'react';
import { connect } from 'react-redux';

class MiniCartPrices extends Component {
    render() {
        const data = this.props.data;
        // Currency Handler
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
        const displayCurrency = currentCurrency();
        const amount = parseFloat(
            data[displayCurrency].amount * this.props.qty
        ).toFixed(2);
        return <div>{data[displayCurrency].currency.symbol + amount}</div>;
    }
}

const mapStateProps = (state) => {
    return {
        currency: state.currency
    };
};

export default connect(mapStateProps)(MiniCartPrices);
