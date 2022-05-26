// HandleMiniCartAttri goal is to handle data from the API and
// through it we can pass data to the Cart Attributes
// Component. This is the main entry for the MiniCartAttributes Component.
// imports
import React, { Component } from 'react';
import styled from 'styled-components';
import { getProductsById } from '../../queries/getProductById';
import MiniCartAttributes from './MiniCartAttributes';

// Container to hole the mapped attributes boxes and gives it the required
// spacing between the attribute types
const Container = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

// Main Entry in the HandleMiniCartAttri component
class HandleMiniCartAttri extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  // Method to fetch data from the Backend and parse it a state
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
          <MiniCartAttributes key={i} data={data.items} type={data.type} name={data.name} id={id} />
        ))}
      </Container>
    );
  }
}

export default HandleMiniCartAttri;
