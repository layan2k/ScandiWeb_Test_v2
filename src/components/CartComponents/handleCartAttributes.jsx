// handleCartAttributes goal is to handle data from our API and
// through it so that it can be passed into the Cart Attributes
// Component. This is our main entry for our cart attributes Component.
// imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { getProductsById } from '../../queries/getProductById';
import CartAttributes from './CartAttributes';

// Container to hole the mapped attributes boxes and gives it the required
// spacing between the attribute types
const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

// Main Entry in our HandleCartAttributes component
class HandleCartAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  // Method to fetch data from our Backend and parse it a state
  fetchData = async () => {
    const id = this.props.id;
    const response = await getProductsById(id).catch(err => console.log(err));
    this.setState({
      data: response.product.attributes,
    });
  };

  // gets data when the page is been renderd
  componentDidMount() {
    this.fetchData();
  }
  render() {
    const id = this.props.id;
    const verifiedArray = this.state.data;
    return (
      <Container>
        {verifiedArray.map((data, i) => (
          <CartAttributes key={i} data={data.items} type={data.type} name={data.name} id={id} />
        ))}
      </Container>
    );
  }
}

export default HandleCartAttributes;
