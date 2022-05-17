// Big Product Image Component
// Import
import React, { Component } from 'react'
import styled from 'styled-components'

// Conatiner
const Container = styled.div`
    width: 682px;
    height: 560px;
`
const Image = styled.img`
    width: 662px;
    height: 540px;
    object-fit: contain;
    transition: all 0.3s ease-in;

`
// Main Entry for our component
export default class BigImage extends Component {
  render() {
    return (
      <Container>
          <Image src={this.props.ima} />

      </Container>
    )
  }
}
