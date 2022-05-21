// Currency  Reducer
// Handles our Currency Actions

// Retrieves State from local storage
const initialCurrency = () => {
    const Getcurrency = localStorage.getItem('currency');
    let currency = 'USD';
    if (Getcurrency) {
        currency = JSON.parse(Getcurrency);
    }
    return currency;
};
// Initial Redux Store State
const InitialState = {
    currency: initialCurrency()
};

// Reducer
export const CurrencyReducer = (state = InitialState, action) => {
    // Switch statements for handling actions when they're called
    switch (action.type) {
        // updates currenct and localstorage state when called
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
