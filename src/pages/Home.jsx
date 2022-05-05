// Home Page, main entry
// Imports
import React, { Component } from 'react';
import Navbar from '../components/NavBar';
import AllCategory from './AllCategory';

// Class Component
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            category: 'all',
            currency: "USD"
        }
    }
    render() {
        return (
            <>
                <Navbar category={this.state.category}/>
                <AllCategory category={this.state.category}/>
            </>
        );
    }
}

export default Home;

