// Big Product Image Component
// Import
import React, { Component } from 'react'
import styled from 'styled-components'

// Conatiner
const Container = styled.div`
    width: 682px;
    height: 560px;
    position: relative;
`
const Image = styled.img`
    width: 662px;
    height: 540px;
    object-fit: contain;
    transition: all 0.3s ease-in;

`
const ImageDisabled = styled.img`
    width: 662px;
    height: 540px;
    object-fit: contain;
    transition: all 0.3s ease-in;
    opacity: 0.5;

`
const TextImage = styled.div`
    font-family: "raleway";
    font-size: 48px;
    font-weight: 700;
    color:#d1d3df;
    position: absolute;
    top: 39.52%;
    left: 50%;
    transform: translate(-50%, -50%);
`
// Main Entry for our component
export default class BigImage extends Component {
  render() {
    const data = this.props.data
    if(data.inStock === true){
    return (
      <Container>
          <Image src={this.props.ima} />

      </Container>
    )
  }
  else{
    return (
      <Container>
          <ImageDisabled src={this.props.ima} />
          <TextImage>Out Of Stock</TextImage>
      </Container>
    )
  }
}
}
