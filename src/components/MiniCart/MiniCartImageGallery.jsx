// MiniCartImage Gallery Component
// imports
import React, { Component } from 'react';
import styled from 'styled-components';

// Main container for Image
const Conatainer = styled.div`
  height: 190px;
  width: 120px;
  margin-left: 8px;
  position: relative;
  z-index: 0;
  max-width: 120px;
`;
// Image
const MainImage = styled.img`
  height: 190px;
  width: 120px;
  object-fit: fill;
`;

// imageGallery Component Main Entry Image Position set to 0
class MiniCartImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageposition: 0,
    };
  }
  render() {
    const images = this.props.picsdata;
    const imagepositions = this.state.imageposition;

    return (
      <Conatainer>
        <MainImage src={images[imagepositions]} />
      </Conatainer>
    );
  }
}

export default MiniCartImageGallery;
