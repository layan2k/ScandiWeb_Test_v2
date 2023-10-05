//  PLP - product listing page
// Imports
import React, { Component } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/ProductsMainPage/ProductCard';
import { GetCategory } from '../queries/GetCategory';

// Main Container
const Container = styled.div`
  height: auto;
  padding-bottom: 100px;
`;
// Wrapper
const Wrapper = styled.div`
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1366px) {
    padding: 0 50px;
  }
  @media (max-width: 1280px) {
    padding: 0 25px;
  }
`;
// Category Name Heading
const Header = styled.div`
  margin-top: 80px;
  font-weight: 400;
  font-size: 42px;
`;
// Container For the Products

const CardContainer = styled.div`
  margin-top: 87.82px;
  display: inline-grid;
  justify-content: center;
  align-items: center;
  gap: 80px 56px;
  @media (min-width: 2045px) {
    gap: 113.62px 79.53px;
  }
  grid-template-columns: auto auto auto;
  grid-template-areas:
    '. . .'
    '. . .'
    '. . .';
`;
// Basic Loading  Template whilst waiting for Data from the Backend

const LoadingContainer = styled.div`
  text-align: center;
  font-weight: 700;
  padding: 300px;
`;
const LoadingText = styled.span`
  font-size: 40px;
`;

// Get id and useNavigate from router Custom Functiom
const withParams = Component => {
  return props => <Component {...props} params={useParams()} location = {useLocation()} />;
};

// Class Component
class AllCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  // Method to call our API Data

  fetchProducts = async () => {
    const { id } = this.props.params;
    const response = await GetCategory(id).catch(err => {
      console.log(err);
    });
    this.setState({
      data: response.category.products,
      isLoading: false,
    });
  };

  // renders data when page loads
  componentDidMount() {
    this.fetchProducts();
  }
  // dynamically updates date when props change
  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.fetchProducts();
    }
  }

  render() {
    // variobles to handle api data
    const headtitle = this.props.category;
    const data = this.state.data;
    // Loading ... comes up when the api data is not available or is loading
    if (this.state.isLoading === false) {
      return (
        <Container>
          <Wrapper>
            <Header>{headtitle.charAt(0).toUpperCase() + headtitle.slice(1)}</Header>
            <CardContainer>
              {data.map((res, i) => (
                <Card key={i} data={res} />
              ))}
            </CardContainer>
          </Wrapper>
        </Container>
      );
    } else {
      return (
        <LoadingContainer>
          <LoadingText>Loading....</LoadingText>
        </LoadingContainer>
      );
    }
  }
}

export default withParams(AllCategory);
