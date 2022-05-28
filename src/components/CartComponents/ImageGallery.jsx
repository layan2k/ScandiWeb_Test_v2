// Image Gallery Component
// imports
import React, { Component } from 'react';
import styled from 'styled-components';
import LeftVector from '../../assets/LeftVector.svg';
import RightVector from '../../assets/RightVector.svg';

// Main container for our Image
const Conatainer = styled.div`
  height: 228px;
  width: 200px;
  margin-left: 24px;
  position: relative;
`;
// Image
const MainImage = styled.img`
  height: 228px;
  width: 200px;
  object-fit: contain;
  position: relative;
  z-index: -1;
`;
// Containers for the Image next and previous controls
const ChangeImageControls = styled.div`
  position: absolute;
  display: flex;
  left: 168px;
  bottom: 16px;
  transform: translate(-50%, -50%);
`;
// Previous Image Control or Jump to the last Image
const ChangeImageLeft = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 8px;
  background: rgba(0, 0, 0, 0.73); ;
`;
// Next Image Control or Jump to the first
const ChangeImageRight = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.73);
`;
// Image Icons
const ControlIcons = styled.img``;

// imageGallery Component Main Entry Image Position set to 0
class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageposition: 0,
    };
  }
  render() {
    const images = this.props.picsdata;
    const imagepositions = this.state.imageposition;
    const NumberOfImages = images.length;
    // Previous Fuction changes to the last if its the first image
    // and changes to previous image if its not the first image
    const ChangeLeft = () => {
      const changeValue = imagepositions - 1;
      const NoIma = NumberOfImages - 1;
      if (imagepositions > 0) {
        this.setState({
          imageposition: changeValue,
        });
      } else if (imagepositions === 0) {
        this.setState({
          imageposition: NoIma,
        });
      }
    };
    // Next Fuction changes to the first if its the last image
    // and changes to next image if its not the last image
    const ChangeRight = () => {
      const changeValue = imagepositions + 1;
      if (NumberOfImages - 1 > imagepositions) {
        this.setState({
          imageposition: changeValue,
        });
      } else {
        this.setState({
          imageposition: 0,
        });
      }
    };
    return (
      // Controls are available the number of images is greater that 1
      <Conatainer>
        <MainImage src={images[imagepositions]} />
        {NumberOfImages > 1 && (
          <ChangeImageControls>
            <ChangeImageLeft onClick={() => ChangeLeft()}>
              <ControlIcons src={LeftVector} />
            </ChangeImageLeft>
            <ChangeImageRight onClick={() => ChangeRight()}>
              <ControlIcons src={RightVector} />
            </ChangeImageRight>
          </ChangeImageControls>
        )}
      </Conatainer>
    );
  }
}

export default ImageGallery;
