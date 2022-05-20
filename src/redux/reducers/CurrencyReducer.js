const initialCurrency = () => {
    const Getcurrency = localStorage.getItem('currency');
    let currency = 'USD';
    if (Getcurrency) {
        currency = JSON.parse(Getcurrency);
    }
    return currency;
};
const InitialState = {
    currency: initialCurrency()
};

export const CurrencyReducer = (state = InitialState, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENCY': {
            localStorage.setItem('currency', JSON.stringify(action.data));
            return {
                currency: action.data
            };
        }

        default:
            return state;
    }
};
