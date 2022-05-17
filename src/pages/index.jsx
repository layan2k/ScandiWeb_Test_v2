// Home Component, main entry for our pages
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/NavBar';
import AllCategory from './AllCategory';
import Cart from './Cart';
import ProductPage from './ProductPage';

// Class Component
class Home extends Component {
    render() {
        const category = this.props.category
        return (
            <Router>
                <Navbar category={category.category}/>
                <Routes>
                    <Route path='/' element={<AllCategory category={category.category}/>}/>
                    <Route path='/product/:id' element={<ProductPage />}/>
                    <Route path='/cart' element={<Cart/>}/>
                </Routes>
            </Router>
        );
    }
}

const mapStateProps = (state) => {
    return{
        category : state.category
    }
}

export default connect(mapStateProps)(Home)
