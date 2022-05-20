// MiniCart Main Components
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { adjustQty, removeFromCart } from '../../redux/action/actions';
import HandleMiniCartAttri from './handleMiniCartAttri';
import MiniCartImageGallery from './MiniCartImageGallery';
import MiniCartPrices from './MiniCartPrices';

// Container
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding-bottom: 32px;
    padding-left: 8px;
    padding-right: 5px;
    max-width: 325px;
`;
// Header AKA My Bag Title
const Header = styled.h1`
    font-size: 16px;
    font-weight: 700;
    display: flex;
    align-items: center;
`;
// Items Container holds our Cart Items
const ItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 55px;
`;
// Our Cart Item
const CartItemContainer = styled.div`
    height: auto;
    width: 100%;
    display: flex;
`;
// Left Side Container Which hold thes the Product Information
const LeftItems = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 136px;
`;
// Our Product Band
const ItemHeader = styled.div`
    margin-top: 16px;
    font-size: 16px;
    font-weight: 300;
`;
// Product Name
const ItemProduct = styled.div`
    margin-top: 8px;
    font-size: 16px;
    font-weight: 300;
`;
// Product Price
const ItemPrice = styled.div`
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
`;
// Our Right Container that contains the Picture and Quantity Controls
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
// Right SIde Container Wrapper
const RightItems = styled.div`
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
`;
// Container with Our Quantity Controls
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

const Gallery = styled.div`
    display: flex;
`;

const Total = styled.div`
    margin-top: 24px;
    width: 100%;
    display: flex;
`;
const TotalProperties = styled.div`
    font-size: 24px;
`;
const TotalValueHeading = styled.div`
    font-weight: 500;
    margin-top: 8px;
`;

const TotalValues = styled.div`
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
    color: #1d1f22;
`;
const TotalValueItems = styled.div`
    margin-top: 12px;
    color: #1d1f22; ;
`;
const BottomButtons = styled.div`
    padding: 0 18.5px;
    display: flex;
    margin-top: 16px;
    justify-content: space-between;
`;

const ViewBagButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 32px;
    width: 140px;
    height: 43px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #1d1f22;
    background: none;
    border: 1px solid #1d1f22;
    cursor: pointer;
`;

const OrderButton = styled.div`
    display: flex;
    margin-left: 12px;
    justify-content: center;
    align-items: center;
    padding: 0 32px;
    width: 140px;
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

class MiniCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartCount: 0,
            total: 0,
            tax: 0
        };
    }

    componentDidMount() {
        const cart = this.props.cart;
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
        let count = 0;
        let total = 0;
        cart.forEach((item) => {
            count += item.qty;
            total += item.prices[displayCurrency].amount * item.qty;
        });

        const tax = 0.21 * total;
        const finalTotal = tax + total;

        this.setState({
            cartCount: count,
            total: parseFloat(finalTotal).toFixed(2),
            tax: parseFloat(tax).toFixed(2)
        });
    }
    componentDidUpdate(prevProps) {
        if (
            this.props.cart !== prevProps.cart ||
            this.props.currency !== prevProps.currency
        ) {
            const cart = this.props.cart;
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
            let count = 0;
            let total = 0;
            cart.forEach((item) => {
                count += item.qty;
                total += item.prices[displayCurrency].amount * item.qty;
            });
            const tax = 0.21 * total;
            const finalTotal = tax + total;

            this.setState({
                cartCount: count,
                total: parseFloat(finalTotal).toFixed(2),
                tax: parseFloat(tax).toFixed(2)
            });
        }
    }
    render() {
        let cart = [];
        cart = this.props.cart;

        const AddQty = (id, qty) => {
            const newQty = qty + 1;
            this.props.changeQuantityDetail(id, newQty);
        };
        const RemoveQty = (id, qty) => {
            const newQty = qty - 1;
            if (qty > 1) {
                this.props.changeQuantityDetail(id, newQty);
            } else if (qty === 1) {
                this.props.removeProduct(id);
            }
        };

        // Currency Handler
        const currentCurrency = () => {
            const currentCurrency = this.props.currency;
            let currency = '$';
            switch (currentCurrency.currency) {
                case 'USD':
                    currency = '$';
                    break;
                case 'GBP':
                    currency = '£';
                    break;
                case 'AUD':
                    currency = 'A$';
                    break;
                case 'JPY':
                    currency = '¥';
                    break;
                case 'RUB':
                    currency = '₽';
                    break;
                default:
                    currency = '$';
            }
            return currency;
        };
        const displayCurrency = currentCurrency();

        return (
            <Container>
                <Header>My Bag, {this.state.cartCount} items</Header>
                {cart.map((data, i) => (
                    <ItemsContainer key={i}>
                        <CartItemContainer>
                            <LeftItems>
                                <ItemHeader>{data.brand}</ItemHeader>
                                <ItemProduct>{data.name}</ItemProduct>
                                <ItemPrice>
                                    <MiniCartPrices
                                        data={data.prices}
                                        qty={data.qty}
                                    />
                                </ItemPrice>
                                <HandleMiniCartAttri id={data.id} />
                            </LeftItems>
                            <RightContainer>
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
                                            <span
                                                style={{ marginBottom: '10px' }}
                                            >
                                                -
                                            </span>
                                        </MinusBox>
                                    </AdjPrice>
                                    <Gallery>
                                        <MiniCartImageGallery
                                            picsdata={data.gallery}
                                        />
                                    </Gallery>
                                </RightItems>
                            </RightContainer>
                        </CartItemContainer>
                    </ItemsContainer>
                ))}
                <Total>
                    <TotalProperties>
                        <TotalValueHeading>Total:</TotalValueHeading>
                    </TotalProperties>
                    <TotalValues>
                        <TotalValueItems>
                            {displayCurrency + this.state.total}
                        </TotalValueItems>
                    </TotalValues>
                </Total>
                <BottomButtons>
                    <Link to="/cart" style={{ textDecoration: 'none' }}>
                        <ViewBagButton>VIEW BAG</ViewBagButton>
                    </Link>
                    <OrderButton>CHECKOUT</OrderButton>
                </BottomButtons>
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

export default connect(mapStateProps, mapDispatchToProps)(MiniCart);
