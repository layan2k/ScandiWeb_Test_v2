// Big Product Image Component
// Import
import React, { Component } from 'react';
import styled from 'styled-components';

// Conatiner
const Container = styled.div`
    width: 682px;
    height: 560px;
    position: relative;
`;
// Image
const Image = styled.img`
    width: 662px;
    height: 540px;
    object-fit: contain;
    transition: all 0.3s ease-in;
    position: relative;
    z-index: -1;
`;
// Out Of Stock Image
// Opacity at 50%
const ImageDisabled = styled.img`
    width: 662px;
    height: 540px;
    object-fit: contain;
    transition: all 0.3s ease-in;
    opacity: 0.5;
    position: relative;
    z-index: -1;
`;
// Image Text out of stock on top of Main Image
const TextImage = styled.div`
    font-family: 'raleway';
    font-size: 48px;
    font-weight: 700;
    color: #d1d3df;
    position: absolute;
    top: 39.52%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
// Component Entry
export default class BigImage extends Component {
    // Decides the appropriate Component to export
    // Depending on the product Stoxk
    render() {
        const data = this.props.data;
        if (data.inStock === true) {
            return (
                <Container>
                    <Image src={this.props.ima} />
                </Container>
            );
        } else {
            return (
                <Container>
                    <ImageDisabled src={this.props.ima} />
                    <TextImage>Out Of Stock</TextImage>
                </Container>
            );
        }
    }
}
