// MiniImageCard , is used to showcase other pictures
// of the that specific product
// Imports
import React, { Component } from 'react';
import styled from 'styled-components';

// Mini image Container
const ImageContainer = styled.div`
  height: 88px;
  width: 88px;
`;
// Image
const Image = styled.img`
  width: 84;
  height: 84px;
  object-fit: contain;
  position: relative;
  z-index: -1;
`;

// image Class
class MiniImageCard extends Component {
  render() {
    return (
      <ImageContainer>
        <Image src={this.props.data} />
      </ImageContainer>
    );
  }
}

export default MiniImageCard;
