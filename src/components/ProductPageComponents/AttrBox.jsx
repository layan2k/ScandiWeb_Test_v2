// Card Attributes , This Component manages how attributes are displayed.
// This the component that sets the attributes for chosen products.
// Even if product is not in cart, your last action will be recalled.
// imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addColorAttri, addTextAttri } from '../../redux/action/actions';

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
  margin-top: 10px;
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;
// That holds the Attribute Boxes
const BoxContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;
// Box That holds the attributes Attribute Txt
// Changes Background if user chooses that text box
const MainBox = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #1d1f22;
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  cursor: pointer;
  background-color: ${props => (props.current === true ? '#1D1F22' : 'white')};
  color: ${props => (props.current === true ? 'white' : 'black')};
  transition: all 0.3s ease-in-out;
  text-decoration: none;
`;
// Container that holds the Color Attribute Boxes
// Adds a border if user selects that box
const ColorConatiner = styled.div`
  height: 36px;
  width: 36px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${props => (props.current === true ? '1px solid #5ECE7B' : 'none')};
  transition: all 0.1s ease-in;
`;
// Color Box
const COlorBox = styled.div`
  height: 32px;
  width: 32px;
  cursor: pointer;
  background-color: ${props => props.background};
`;
// Component Entry
class TextAttrBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedText: 0,
      selectedColor: 0,
    };
  }
  // Handle User Attributes
  setAttributesP = () => {
    const name = this.props.name;
    const someValueArray = this.state;
    const combineAttributes = {
      name,
      ...someValueArray,
    };

    const attributes = combineAttributes;

    this.props.setAttributes(attributes);
  };
  // Loads the cart states to the users chosen attributes on render
  componentDidMount() {
    this.setAttributesP();
  }
  // Rerenders when state is updated
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedText !== prevState.selectedText ||
      this.state.selectedColor !== prevState.selectedColor
    ) {
      this.setAttributesP();
    }
  }

  render() {
    // Variables
    const data = this.props.data;
    const type = this.props.type;
    const name = this.props.name;
    let refinedata = [];
    // Define the data if not undefined, to avoid page crashes due to undefined response
    if (Array.isArray(data)) {
      refinedata = data;
    }

    // Handles the  Text Selction Choices and stores that information in the redux store
    const changeSizeStateIndex = (number, value) => {
      const newid = `${name}+${this.props.id}`;
      this.setState({
        selectedText: number,
      });
    };
    // Handles the user Color Selection Choices and stores that information in the redux store
    const changeColorStateIndex = number => {
      this.setState({
        selectedColor: number,
      });
    };
    // User selction Variables
    const activeColor = this.state.selectedColor;
    const activeText = this.state.selectedText;
    // Logic so that the appropriate attributes are rendered on screen using attribute type
    return (
      <Container>
        {type === 'text' && (
          <ItemContainer>
            <MainHeading>{name}:</MainHeading>
            <BoxContainer>
              {refinedata.map((info, i) => (
                <MainBox
                  title={info.displayValue}
                  current={activeText === i ? true : false}
                  onClick={() => changeSizeStateIndex(i)}
                  key={i}
                >
                  {info.value}
                </MainBox>
              ))}
            </BoxContainer>
          </ItemContainer>
        )}
        {type === 'swatch' && (
          <ItemContainer>
            <MainHeading>{name}:</MainHeading>
            <BoxContainer>
              {refinedata.map((info, i) => (
                <ColorConatiner
                  current={activeColor === i ? true : false}
                  onClick={() => changeColorStateIndex(i)}
                  key={i}
                >
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

export default TextAttrBox;
