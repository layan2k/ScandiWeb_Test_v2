// Product Card for or Product Listing page (PLD)
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addToCart } from '../../redux/action/actions';

// Add To Cart Circle that contains the Cart Icon
const CartCircle = styled.div`
    background: #5ece7b;
    height: 52px;
    width: 52px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0px;
    bottom: 72px;
    text-align: center;
    transform: translate(-50%, -50%);
`;
// Cart Icon Main Container
const CartIconContainer = styled.div`
    position: relative;
    margin-left: 22px;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    right: 12px;
`;
// main Cart Icon  svg
const CartIcon = styled.img`
    color: white;
`;

// Container For Cart Icon wheels
const CirclesConatiner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 4px;
`;
// Cart wheels svg
const CircleIcon = styled.img`
    color: white;
`;

// Instock Card Design
const CardBox = styled.div`
    margin-bottom: 103px;
    height: 444px;
    max-height: 444px;
    max-width: 386px;
    width: 386px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 0;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        box-shadow: rgba(168, 172, 176, 0.19) 0px 4px 35px;
    }
    &:hover ${CartCircle} {
        display: flex;
    }
`;
// Main Product Image design
const MainImage = styled.img`
    width: 356px;
    height: 338px;
    object-fit: fill;
    z-index: 0;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    }
`;
// Product Title
const Title = styled.h2`
    font-family: 'raleway';
    font-weight: 300;
    font-size: 18px;
    text-align: left;
    color: #1d1f22;
    margin-top: 24px;
`;
// Price
const Price = styled.h2`
    font-family: 'raleway';
    color: #1d1f22;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
`;
// Out Of Stock Card Design

const CardBoxDisabled = styled.div`
    font-family: 'raleway';
    margin-bottom: 103px;
    height: 444px;
    max-height: 444px;
    max-width: 386px;
    width: 386px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    &:hover {
        box-shadow: rgba(168, 172, 176, 0.19) 0px 4px 35px;
    }
`;
// Disabled Image Opacity at 50%
const DisableImage = styled.img`
    width: 356px;
    height: 338px;
    object-fit: fill;
    opacity: 0.5;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    }
`;
// Out Of Stock Text In the Center
const StockTitle = styled.h1`
    font-family: 'raleway';
    font-size: 24px;
    font-weight: 400;
    color: #8d8f9a;
    position: absolute;
    top: 39.52%;
    left: 50%;
    transform: translate(-50%, -50%); ;
`;
// Product Title For Disabled Card
const DisabledTitle = styled.h2`
    font-family: 'raleway';
    font-weight: 300;
    font-size: 18px;
    text-align: left;
    color: #8d8f9a;
    margin-top: 24px;
`;
// Disbled Card Prices
const DisabledPrices = styled.h2`
    font-family: 'raleway';
    color: #8d8f9a;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
`;
// Card Component Entry
class Card extends Component {
    render() {
        // Variables to manage our data
        const data = this.props.data;
        const images = data.gallery;
        const prices = data.prices;

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

        // Stock Available Card
        if (data.inStock === true) {
            return (
                <CardBox>
                    <Link
                        to={`product/${data.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <MainImage src={images[0]} />
                        <Title>{data.name}</Title>
                        <Price>
                            {prices[displayCurrency].currency.symbol +
                                prices[displayCurrency].amount}
                        </Price>
                    </Link>
                    {/* Add to Icon Cart Appears only when the product does not have any attributes to  */}
                    {data.attributes.length === 0 && (
                        <CartCircle
                            onClick={() => this.props.addToCart(data.id)}
                            value="ADD TO CART"
                        >
                            <CartIconContainer>
                                <CartIcon src="/assets/CartVector.svg" />
                                <CirclesConatiner>
                                    <CircleIcon src="/assets/WheelWhiteVector.svg" />
                                    <CircleIcon src="/assets/WheelWhiteVector.svg" />
                                </CirclesConatiner>
                            </CartIconContainer>
                        </CartCircle>
                    )}
                </CardBox>
            );
        }
        // Out of Stock Card
        else {
            return (
                <CardBoxDisabled>
                    <Link
                        to={`product/${data.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <DisableImage src={images[0]} />
                        <StockTitle>OUT OF STOCK</StockTitle>
                        <DisabledTitle>{data.name}</DisabledTitle>
                        <DisabledPrices>
                            {prices[displayCurrency].currency.symbol +
                                prices[displayCurrency].amount}
                        </DisabledPrices>
                    </Link>
                </CardBoxDisabled>
            );
        }
    }
}

// Utilization Of our Redux Store

// Getting the currency state from Redux
const mapStateProps = (state) => {
    return {
        currency: state.currency
    };
};

// Adding Item to our cart
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => dispatch(addToCart(id))
    };
};

//   exporting Our Component and connecting it to Our Store
export default connect(mapStateProps, mapDispatchToProps)(Card);
