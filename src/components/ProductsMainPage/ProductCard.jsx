// Product Card for or Product Listing page (PLD)
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    cursor: pointer;
    transition: all 0.3s ease-in-out ;
    &:hover{
    box-shadow: rgba(168, 172, 176, 0.19) 0px 4px 35px;
    }

`

const MainImage = styled.img`
    width: 356px;
    height: 338px;
    object-fit: cover;
`
const Title = styled.h2`
    font-family: "raleway";
    font-weight: 300;
    font-size: 18px;
    text-align: left;
    color: #1D1F22;
    margin-top: 24px;

`
const Price = styled.h2`
    font-family: "raleway";
    color: #1D1F22;
    font-size: 18px;
    font-weight: 500;
    text-align: left;

`
// Out Of Stock Card Design

const CardBoxDisabled = styled.div`
    font-family: "raleway";
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
    &:hover{
    box-shadow: rgba(168, 172, 176, 0.19) 0px 4px 35px;
    }
`
const DisableImage = styled.img`
    width: 356px;
    height: 338px;
    object-fit: cover;
    opacity: 0.5;
`

const StockTitle = styled.h1`
    font-family: "raleway";
    font-size: 24px;
    font-weight: 400;
    color:#8D8F9A;
    position: absolute;
    top: 39.52%;
    left: 50%;
    transform: translate(-50%, -50%);
;

`
const DisabledTitle = styled.h2`
    font-family: "raleway";
    font-weight: 300;
    font-size: 18px;
    text-align: left;
    color: #8D8F9A;
    margin-top: 24px;

`
const DisabledPrices = styled.h2`
    font-family: "raleway";
    color: #8D8F9A;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
`

class Card extends Component {
    render() {
        // Variables to manage our data
        const data =this.props.data
        const images = data.gallery
        const prices = data.prices

        // Currency Handler
        const currentCurrency = () => {
            const currentCurrency = this.props.currency
            let currency = 0
            switch (currentCurrency.currency) {
                case "USD":
                    currency = 0
                    break;
                case "GBP":
                    currency = 1
                break
                case "AUD":
                    currency= 2
                break
                case "JPY":
                    currency = 3
                break
                case "RUB":
                    currency = 4
                break
                default:
                    currency = 5
            }
            return currency
        }
        const displayCurrency = currentCurrency()

        // In stock Card
        if (data.inStock===true){
        return (
            <CardBox>
                <Link to={`product/${data.id}`} style={{textDecoration:"none"}}>
                <MainImage src={images[0]}/>
                <Title>{data.name}</Title>
                <Price>{prices[displayCurrency].currency.symbol+prices[displayCurrency].amount}</Price>
                </Link>
            </CardBox>
            );
        }
        // Out of Stock Card
        else{
            return(
            <CardBoxDisabled>
                <Link to={`product/${data.id}`} style={{textDecoration:"none"}}>
                <DisableImage src={images[0]} />
                <StockTitle>OUT OF STOCK</StockTitle>
                <DisabledTitle>{data.name}</DisabledTitle>
                <DisabledPrices>{prices[displayCurrency].currency.symbol+prices[displayCurrency].amount}</DisabledPrices>
                </Link>
            </CardBoxDisabled>
            );
        }


    }
}

// Get Global Variable from Redux
const mapStateProps = (state) => {
    return{
        currency : state.currency
    }
}

export default connect(mapStateProps)(Card)
