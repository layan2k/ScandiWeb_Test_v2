// Home Component, main entry for our pages
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/NavBar';
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
    };
  }
  // Checks if the cart is opened when page Renders
  componentDidMount() {
    this.setState({
      cartOpenCondition: this.props.cartCondition.isCartOpened,
    });
  }
  //Updates the state when thw cart is enable therefore allowing a background to dynamically render
  componentDidUpdate(prevProps) {
    if (this.props.cartCondition !== prevProps.cartCondition) {
      this.setState({
        cartOpenCondition: this.props.cartCondition.isCartOpened,
      });
    }
  }

  render() {
    // variable that handle data
    const category = this.props.category;
    const cartCondition = this.state.cartOpenCondition;
    return (
      <Router>
        <Navbar category={category.category} />
        <Container cart={cartCondition}>
          <Routes>
            <Route path="/" element={<AllCategory category={category.category} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </Router>
    );
  }
}

// Connection to the redux  store
const mapStateProps = state => {
  return {
    category: state.category,
    cartCondition: state.isCartCondition,
  };
};

export default connect(mapStateProps)(Home);
