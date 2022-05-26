//Cart Main Components
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import HandleCartAttributes from '../components/CartComponents/handleCartAttributes';
import CartPrices from '../components/CartComponents/CartPrices';
import ImageGallery from '../components/CartComponents/ImageGallery';
import { adjustQty, removeFromCart } from '../redux/action/actions';
import { Link } from 'react-router-dom';
import { GetAllCurrencies } from '../queries/GetAllCurrencies';

// Container
const Container = styled.div`
    padding: 0 100px;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    height: auto;
    padding-bottom: 100px;
    @media (max-width: 1366px) {
        padding: 0 50px;
        padding-bottom: 100px;
        padding-top: 80px;
    }
    @media (max-width: 1280px) {
        padding: 0 25px;
        padding-bottom: 100px;
        padding-top: 80px;
    }
`;
// Cart Haeder
const HeadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Header = styled.h1`
    font-size: 32px;
    font-weight: 700;
    display: flex;
    align-items: center;
`;
// Back To Shop Text
const BackToShopText = styled.div`
    margin-top: 12px;
    color: #1d1f22;
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    &:active {
        color: #5ece7b;
    }
`;
// Items Container holds the  Cart Items
const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 55px;
`;
// Cart Item
const CartItemContainer = styled.div`
    height: auto;
    width: 100%;
    border-top: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
`;
// Left Side Container Which hold thes the Product Information
const LeftItems = styled.div`
    display: flex;
    flex-direction: column;
`;
// Product Brand
const ItemHeader = styled.div`
    margin-top: 24px;
    font-size: 30px;
    font-weight: 600;
`;
// Product Name
const ItemProduct = styled.div`
    margin-top: 16px;
    font-size: 30px;
    font-weight: 400;
`;
// Product Price
const ItemPrice = styled.div`
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
`;
// Right Container that contains the Picture and Quantity Controls
const RightContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
// Right SIde Container Wrapper
const RightItems = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
// Container with Quantity Controls
const AdjPrice = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;
// Add Quantity Button
const PlusBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 45px;
    width: 45px;
    font-size: 45px;
    font-weight: 200;
    border: 1px solid #1d1f22;
    cursor: pointer;
`;
// Remove Quantity Button
const MinusBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 45px;
    width: 45px;
    font-size: 45px;
    font-weight: 200;
    border: 1px solid #1d1f22;
    cursor: pointer;
`;
const MinusPosition = styled.span`
    display: flex;
    margin-bottom: 10px;


`
// Current Product Quantity
const Quantity = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 48px 0;
    font-size: 24px;
    font-weight: 500;
    height: 45px;
    width: 45px;
`;
// Gallery Container
const Gallery = styled.div`
    display: flex;
`;
// Total Container
const Total = styled.div`
    margin-top: 24px;
    width: 100%;
    border-top: 1px solid #e5e5e5;
    display: flex;
`;
// Total Text Containe
const TotalProperties = styled.div`
    font-size: 24px;
`;
// Information text for tax and Quantity
const TPropertyItem = styled.div`
    font-weight: 400;
    margin-top: 8px;
`;
// Total Text as in Total itself
const TotalValueHeading = styled.div`
    font-weight: 500;
    margin-top: 8px;
`;

const TotalValues = styled.div`
    font-size: 24px;
    font-weight: 700;
    margin-left: 20px;
`;
// Product Total Value
const TotalValueItems = styled.div`
    margin-top: 8px;
`;
// Order Button
const OrderButton = styled.div`
    position: relative;
    z-index: -1;
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 32px;
    width: 279px;
    height: 43px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background: #5ece7b;
    cursor: pointer;
    &:hover {
        background: #1d1f22;
    }
`;
// Cart Component
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartCount: 0,
            total: 0,
            tax: 0,
            currencies: [],
        };
    }
                // fetching products for the redux store
                fetchCurrenciesForStore = async () => {
                    const response = await GetAllCurrencies().catch((err) =>
                        console.log(err)
                    );
                    this.setState({
                        currencies: response
                    })
                };
    // Loads data and sets state when first rendered
    componentDidMount() {
        this.fetchCurrenciesForStore()
        // get cart information from the redux store
        const cart = this.props.cart;
        //  Currency Handler To Determine which currency is in use
            const currentCurrency = this.props.currency.currency;
        let count = 0;
        let total = 0;
        // For each to get out products qty and  Product Total
        cart.forEach((item) => {
            count += item.qty;
            total += item.prices[currentCurrency].amount * item.qty;
        });
        // tax and total calculation tax included
        const tax = 0.21 * total;
        const finalTotal = tax + total;
        // sets states
        this.setState({
            cartCount: count,
            total: parseFloat(finalTotal).toFixed(2),
            tax: parseFloat(tax).toFixed(2)
        });
    }
    // Loads data when store is updated
    // and dynamically updates  states
    componentDidUpdate(prevProps) {
        if (
            this.props.cart !== prevProps.cart ||
            this.props.currency !== prevProps.currency
        ) {
            this.fetchCurrenciesForStore()
            // get cart information from the redux store
            const cart = this.props.cart;
            //  Currency Handler To Decide which currency is in use
                const currentCurrency = this.props.currency.currency;
            let count = 0;
            let total = 0;
            // For each to get out products qty and Product Total
            cart.forEach((item) => {
                count += item.qty;
                total += item.prices[currentCurrency].amount * item.qty;
            });
            // tax and total calculation tax included
            const tax = 0.21 * total;
            const finalTotal = tax + total;
            // updates  states
            this.setState({
                cartCount: count,
                total: parseFloat(finalTotal).toFixed(2),
                tax: parseFloat(tax).toFixed(2)
            });
        }
    }

    render() {
        // loads  cart from the redux store
        let cart = [];
        cart = this.props.cart;

        // QTy is quantity
        // Add Qty and update qty in  redux store
        const AddQty = (id, qty) => {
            const newQty = qty + 1;
            this.props.changeQuantityDetail(id, newQty);
        };
        // Deduct Qty and Delete from cart when qty becomes 1
        const RemoveQty = (id, qty) => {
            const newQty = qty - 1;
            if (qty > 1) {
                this.props.changeQuantityDetail(id, newQty);
            } else if (qty === 1) {
                this.props.removeProduct(id);
            }
        };

        // Currency Handler To determine the current symbol been utilizes
            const currentCurrency = this.props.currency;
            const CurrencyIndex = currentCurrency.currency
            const currencies = this.state.currencies.currencies
            let ArrayCurrencies = []
            if (Array.isArray(currencies)===true){
                ArrayCurrencies = currencies.map( item => item.symbol)
            }


        return (
            <Container>
                <HeadingContainer>
                    {/* Cart Header */}
                    <Header>CART</Header>
                    <Link to="/" className='linkto'>
                        <BackToShopText>Back To Shop</BackToShopText>
                    </Link>
                </HeadingContainer>
                {/* Cart Items */}
                {cart.map((data, i) => (
                    <ItemsContainer key={i}>
                        <CartItemContainer>
                            <LeftItems>
                                <ItemHeader>{data.brand}</ItemHeader>
                                <ItemProduct>{data.name}</ItemProduct>
                                <ItemPrice>
                                    <CartPrices
                                        data={data.prices}
                                        qty={data.qty}
                                    />
                                </ItemPrice>
                                <HandleCartAttributes id={data.id} />
                            </LeftItems>
                            <RightContainer>
                                {/* Controls */}
                                <RightItems>
                                    <AdjPrice>
                                        <PlusBox
                                            onClick={() =>
                                                AddQty(data.id, data.qty)
                                            }
                                        >
                                            +
                                        </PlusBox>
                                        <Quantity>{data.qty}</Quantity>
                                        <MinusBox
                                            onClick={() =>
                                                RemoveQty(data.id, data.qty)
                                            }
                                        >
                                            <MinusPosition>
                                                -
                                            </MinusPosition>
                                        </MinusBox>
                                    </AdjPrice>
                                    {/* Gallery */}
                                    <Gallery>
                                        <ImageGallery picsdata={data.gallery} />
                                    </Gallery>
                                </RightItems>
                            </RightContainer>
                        </CartItemContainer>
                    </ItemsContainer>
                ))}
                {/* Total Summary */}
                <Total>
                    <TotalProperties>
                        <TPropertyItem>Tax 21%:</TPropertyItem>
                        <TPropertyItem>Quantity:</TPropertyItem>
                        <TotalValueHeading>Total:</TotalValueHeading>
                    </TotalProperties>
                    <TotalValues>
                        <TotalValueItems>
                            {ArrayCurrencies[CurrencyIndex] + this.state.tax}
                        </TotalValueItems>
                        <TotalValueItems>
                            {this.state.cartCount}
                        </TotalValueItems>
                        <TotalValueItems>
                            {ArrayCurrencies[CurrencyIndex] + this.state.total}
                        </TotalValueItems>
                    </TotalValues>
                </Total>
                {/* Order Button */}
                <OrderButton>ORDER</OrderButton>
            </Container>
        );
    }
}

// Export Component + Redux Connection
const mapStateProps = (state) => {
    return {
        currency: state.currency,
        cart: state.shop.cart
    };
};

// Change Qty and remove products from store
// Function
const mapDispatchToProps = (dispatch) => {
    return {
        changeQuantityDetail: (id, value) => {
            dispatch(adjustQty(id, value));
        },

        removeProduct: (id) => {
            dispatch(removeFromCart(id));
        }
    };
};

export default connect(mapStateProps, mapDispatchToProps)(Cart);
