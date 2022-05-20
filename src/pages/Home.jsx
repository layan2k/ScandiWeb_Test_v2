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

const Container = styled.div`
    background: ${(props) =>
        props.cart === true ? 'rgba(57, 55, 72, 0.22)' : 'none'};
`;

// Class Component
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartOpenCondition: false
        };
    }

    componentDidMount() {
        this.setState({
            cartOpenCondition: this.props.cartCondition.isCartOpened
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.cartCondition !== prevProps.cartCondition) {
            this.setState({
                cartOpenCondition: this.props.cartCondition.isCartOpened
            });
        }
    }

    render() {
        const category = this.props.category;
        const cartCondition = this.state.cartOpenCondition;
        return (
            <Router>
                <Navbar category={category.category} />
                <Container cart={cartCondition}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <AllCategory category={category.category} />
                            }
                        />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </Container>
            </Router>
        );
    }
}

const mapStateProps = (state) => {
    return {
        category: state.category,
        cartCondition: state.isCartCondition
    };
};

export default connect(mapStateProps)(Home);
