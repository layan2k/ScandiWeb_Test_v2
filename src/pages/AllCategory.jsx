//  PLP - product listing page
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Card from '../components/ProductsMainPage/ProductCard';
import { GetCategory } from '../queries/GetCategory';

// Main Container
const Container = styled.div`
    height: auto;
`;
// Wrapper
const Wrapper = styled.div`
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    @media (max-width: 1400px) {
        padding: 0 95px;
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
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
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

// Class Component
class AllCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true
        };
    }

    // Method to call our API Data

    fetchProducts = async () => {
        const response = await GetCategory(this.props.category).catch((err) => {
            console.log(err);
        });
        this.setState({
            data: response.category.products,
            isLoading: false
        });
    };

    fetchProductsForStore = async () => {
        const response = await GetCategory('all').catch((err) =>
            console.log(err)
        );
        this.props.addProducts(response.category.products);
    };

    componentDidMount() {
        this.fetchProducts();
        this.fetchProductsForStore();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.category !== prevProps.category) {
            this.fetchProducts();
        }
    }

    setImage = (position) => {
        return position;
    };

    render() {
        const headtitle = this.props.category;
        const data = this.state.data;
        if (this.state.isLoading === false) {
            return (
                <Container>
                    <Wrapper>
                        <Header>
                            {headtitle.charAt(0).toUpperCase() +
                                headtitle.slice(1)}
                        </Header>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addProducts: (data) => {
            dispatch({ type: 'ADD_PRODUCTS', data: data });
        }
    };
};

export default connect(null, mapDispatchToProps)(AllCategory);
