// Home Component, main entry for our pages
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/NavBar';
import { GetAllCategories } from '../queries/GetAllCategories';
import AllCategory from './AllCategory';
import Cart from './Cart';
import ProductPage from './ProductPage';

// Container for all the Routed Pages , background updates
// when the Mini Cart Component is opened =
const Container = styled.div`
  background-color: ${props => (props.cart === true ? 'rgba(57, 55, 72, 0.22)' : 'none')};
  background-size: cover;
  z-index: 2;
`;

// Class Component
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartOpenCondition: false,
      categoriesData: [],
    };
  }

  fetchAllCategories = async () => {
    const response = await GetAllCategories().catch(err => console.log(err));
    if (response != 'undefined') {
      this.setState({
        categoriesData: response.categories,
      });
    }
  };

  setCategory = () => {
    // Sets initial category
    const categories = this.state.categoriesData;
    let itemArray = [];
    categories.forEach(item => itemArray.push(item.name));
    this.changeCurrentCategory(itemArray[0]);
  };
  // Checks if the cart is opened when page Renders
  componentDidMount() {
    this.setState({
      cartOpenCondition: this.props.cartCondition.isCartOpened,
    });
    this.fetchAllCategories();
  }
  //Updates the state when thw cart is enable therefore allowing a background to dynamically render
  componentDidUpdate(prevProps) {
    if (this.props.cartCondition !== prevProps.cartCondition) {
      this.setState({
        cartOpenCondition: this.props.cartCondition.isCartOpened,
      });
      this.fetchAllCategories();
    }
  }

  render() {
    // variable that handle data
    const category = this.props.category;
    const cartCondition = this.state.cartOpenCondition;
    const loadRoute = category.category;

    return (
      <>
        <Navbar category={category.category} />
        <Container cart={cartCondition}>
          <Routes>
            <Route path="/" element={<Navigate to={`category/${loadRoute}`} />} />
            <Route
              sensitive
              path="category/:id"
              element={<AllCategory category={category.category} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </Container>
      </>
    );
  }
}

// Connection to the redux  store
const mapDispatchToProps = dispatch => {
  return {
    changeCurrentCategory: data => {
      dispatch({ type: 'CHANGE_CATEGORY', data: data });
    },
  };
};
const mapStateProps = state => {
  return {
    category: state.category,
    cartCondition: state.isCartCondition,
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Home);
