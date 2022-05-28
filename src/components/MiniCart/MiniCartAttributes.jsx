// MiniCardAttributes , This Component manages how attributes are displayed in the
// mainly when it comes to choosing the right Attribute to display.
// imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Main Container
const Container = styled.div`
  display: flex;
`;
// Container that holds Mapped Items
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
// Type Of Attribute Header
const MainHeading = styled.div`
  margin-top: 8px;
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 7px;
  text-transform: uppercase;
`;
// That holds Attribute Boxes
const BoxContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;
// Box That holds attributes Attribute Txt
const Box = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid #1d1f22;
  min-width: 24px;
  width: auto;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  background-color: ${props => (props.current === true ? '#1D1F22' : 'white')};
  color: ${props => (props.current === true ? 'white' : 'black')};
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  cursor: pointer;
`;
// Container that holds the Color Attribute Boxes
const ColorConatiner = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${props => (props.current === true ? '1px solid #5ECE7B' : 'none')};
  transition: all 0.1s ease-in;
`;
// Color Box
const COlorBox = styled.div`
  height: 16px;
  width: 16px;
  cursor: pointer;
  background-color: ${props => props.background};
`;

// Component Entry
class MiniCartAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedText: 0,
      selectedColor: 0,
    };
  }
  // Method loads attributes that have been chosen by the user

  setAttributes = () => {
    const name = this.props.name;
    const attributes = this.props.attributes;
    const getAttribute = attributes.filter(item => name === item.name);
    this.setState({
      selectedColor: getAttribute[0].selectedColor,
      selectedText: getAttribute[0].selectedText,
    });
  };
  // Loads the cart states to the users chosen attributes on render
  componentDidMount = () => {
    this.setAttributes();
  };

  render() {
    // Variables
    const data = this.props.data;
    const type = this.props.type;
    const name = this.props.name;
    // Define the data if not undefined, to avoid page crashes due to undefined response
    let refinedata = [];
    if (Array.isArray(data)) {
      refinedata = data;
    } else {
      console.log('loading data...');
    }
    // Loading Users Attributes
    const activeColor = this.state.selectedColor;
    const activeText = this.state.selectedText;
    return (
      // Logic so that the appropriate attributes are rendered on screen using attribute type
      <Container>
        {type === 'text' && (
          <ItemContainer>
            <MainHeading>{name}:</MainHeading>
            <BoxContainer>
              {refinedata.map((info, i) => (
                <Box title={info.displayValue} current={activeText === i ? true : false} key={i}>
                  {info.value}
                </Box>
              ))}
            </BoxContainer>
          </ItemContainer>
        )}
        {type === 'swatch' && (
          <ItemContainer>
            <MainHeading>{name}:</MainHeading>
            <BoxContainer>
              {refinedata.map((info, i) => (
                <ColorConatiner current={activeColor === i ? true : false} key={i}>
                  <COlorBox title={info.displayValue} background={info.value}></COlorBox>
                </ColorConatiner>
              ))}
            </BoxContainer>
          </ItemContainer>
        )}
      </Container>
    );
  }
}

// Export the Component and Connecting to the Redux store.
export default MiniCartAttributes;
