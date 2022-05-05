import React, { Component } from 'react';
import styled from 'styled-components';

const CardBox = styled.div`
    height: 444px;
    width: 386px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
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
    color: #1D1F22;
    font-style: 18px;
    font-weight: 500;
    text-align: left;


`

class Card extends Component {
    render() {
        return (
            <CardBox>
                <MainImage/>
                <Title>Nike</Title>
                <Price>$15.00</Price>

            </CardBox>
        );
    }
}

export default Card;
