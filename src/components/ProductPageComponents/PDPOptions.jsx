//  PDPOptions Compnent, showcases an Enlarged Image of the Product
// And also gives the user to see other images of that product
// imports
import React, { Component } from 'react';
import styled from 'styled-components';
import TextAttrBox from './AttrBox';

// Main Container
const Container = styled.div`
  margin-top: 43px;
  display: flex;
  flex-direction: column;
`;

// Component Entry
class PDPOptions extends Component {
  constructor(props) {
    super(props);
    this.AttributeArray = [];
    this.state = {
      arrayItems: this.AttributeArray,
    };
  }

  getAttributes = data => {
    const InArray = this.AttributeArray.find(item => (item.name === data.name ? true : false));
    if (InArray) {
      this.AttributeArray = this.AttributeArray.filter(object => object.name != data.name);
      this.AttributeArray.push(data);
    } else {
      this.AttributeArray.push(data);
    }
    this.props.handleAttributes(this.AttributeArray);
  };

  render() {
    const data = this.props.data;
    const id = this.props.iddet;
    let verifiedArray = [];
    if (Array.isArray(data)) {
      verifiedArray = data;
    } else {
      console.log('loading..');
    }
    return (
      <Container>
        {verifiedArray.map((data, i) => (
          <TextAttrBox
            key={i}
            data={data.items}
            type={data.type}
            name={data.name}
            id={id}
            setAttributes={this.getAttributes}
          />
        ))}
      </Container>
    );
  }
}

export default PDPOptions;
