// Product Page
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BigImage from '../components/ProductPageComponents/BigImage';
import MiniImageCard from '../components/ProductPageComponents/MiniImageCard';
import PDPOptions from '../components/ProductPageComponents/PDPOptions';
import { getProductsById } from '../queries/getProductById';
import { addToCart } from '../redux/action/actions';
import { Markup } from 'interweave';

// Main Comtainer
const Container = styled.div`
    height: auto;
`;
// Wrapper
const Wrapper = styled.div`
    padding: 0 100px;
    padding-top: 73px;
    padding-bottom: 50px;
    display: flex;
    @media (max-width: 1366px) {
        padding: 0 50px;
        padding-top: 73px;
        padding-bottom: 50px
    }
    @media (max-width: 1280px) {
        padding: 0 25px;
        padding-top: 73px;
        padding-bottom: 50px
    }
`;
// Left Image Toggle Gallary Design
const Left = styled.div`
    display: flex;
    flex-direction: column;
    height: 400px;
    overflow-y: ${(props) => (props.imageno) ? 'scroll': 'hidden'};
    overflow-x: hidden;
    align-items: center;
`;
const LeftImg = styled.div`
    cursor: pointer;
    max-width: 100px;
    margin-bottom: 32px;
`;
// Center Image Design
const Center = styled.div`
    margin-left: 10px;
`;
// Right Side Product Design
const Right = styled.div`
    margin-left: 82px;
    display: flex;
    flex-direction: column;
`;
// Product Brand
const Title = styled.div`
    color: #1d1f22;
    font-family: 'Raleway';
    font-size: 30px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;
// Product Name
const ProductName = styled.div`
    font-size: 30px;
    font-weight: 400;
    margin-top: 16px;
    display: flex;
    align-items: center;
`;
// Price Heading
const PriceHeading = styled.div`
    margin-top: 36px;
    font-family: 'Roboto Condensed';
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
`;
// Product Price
const Price = styled.div`
    margin-top: 10px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 24px;
`;
// Add to Cart Button
const AddToButton = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    background-color: #5ece7b;
    color: white;
    cursor: pointer;
`;
// Back To Shop Text
const BackToShopText = styled.div`
    margin-top: 12px;
    color: #1d1f22;
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
    &:active {
        color: #5ece7b;
    }
`;
// Return Home Button
const BackButton = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 16px;
    font-family: 'Raleway';
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    background-color: #1d1f22;
    color: white;
    cursor: pointer;
    &:active {
        background-color: #5ece7b;
    }
    &:hover {
    }
`;
// Product Description
const Desc = styled.div`
    margin-top: 40px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 16px;
    color: #1d1f22;
    max-height: 200px;
    margin-bottom: 100px;
`;

// Get id and useNavigate from router Custom Functiom
const withParams = (Component) => {
    return (props) => (
        <Component {...props} params={useParams()} navigate={useNavigate()} />
    );
};

// Class Component entry
class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            images: [],
            position: 0
        };
        this.fetchData = this.fetchData.bind(this);
    }
    // Method for the API call by params.id
    fetchData = async () => {
        const { id } = this.props.params;
        const response = await getProductsById(id).catch((err) =>
            console.log(err)
        );
        this.setState({
            data: response.product,
            images: response.product.gallery
        });
    };
    // API Product Call byProduct ID , require id as an input
    componentDidMount() {
        this.fetchData();
    }

    render() {
        // variables
        let description = '';
        let ScrollImg = false
        const data = this.state.data;
        const images = this.state.images;
        if(images.length > 1){
                ScrollImg = true
        }
        console.log(images.length)
        const prices = data.prices;
        description = String(data.description);
        const currentCurrency = this.props.currency.currency;

        let PriceText = '';
        if (Array.isArray(prices)) {
            PriceText =
                prices[currentCurrency].currency.symbol +
                prices[currentCurrency].amount;
        } else {
            console.log('loading...');
        }

        //Send Item To Cart Function
        const SendCart = (data) => {
            this.props.addToCart(data);
        };


        if (data.inStock === true) {
            return (
                <Container>
                    <Wrapper>
                        {/* Left Side */}
                        <Left imageno={ScrollImg}>
                            {images.map((data, i) => {
                                return (
                                    <LeftImg
                                        key={i}
                                        onClick={() =>
                                            this.setState({
                                                position: i
                                            })
                                        }
                                    >
                                        <MiniImageCard key={i} data={data} />
                                    </LeftImg>
                                );
                            })}
                        </Left>
                        {/* Center */}
                        <Center>
                            <BigImage
                                data={data}
                                ima={images[this.state.position]}
                            />
                        </Center>
                        {/* Right Side */}
                        <Right>
                            <Title>{data.brand}</Title>
                            <ProductName>{data.name}</ProductName>
                            <PDPOptions
                                data={data.attributes}
                                iddet={data.id}
                            />
                            <PriceHeading>PRICE:</PriceHeading>
                            <Price>{PriceText}</Price>
                            <AddToButton onClick={() => SendCart(data.id)}>
                                ADD TO CART
                            </AddToButton>
                            <BackToShopText
                                onClick={() => this.props.navigate('/')}
                            >
                                Back To Shop
                            </BackToShopText>
                            <Desc>
                                <Markup content={description} />
                            </Desc>
                        </Right>
                    </Wrapper>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Wrapper>
                        {/* Left Side */}
                        <Left>
                            {images.map((data, i) => {
                                return (
                                    <LeftImg
                                        key={i}
                                        onClick={() =>
                                            this.setState({
                                                position: i
                                            })
                                        }
                                    >
                                        <MiniImageCard key={i} data={data} />
                                    </LeftImg>
                                );
                            })}
                        </Left>
                        {/* Center */}
                        <Center>
                            <BigImage
                                data={data}
                                ima={images[this.state.position]}
                            />
                        </Center>
                        {/* Right Side */}
                        <Right>
                            <Title>{data.brand}</Title>
                            <ProductName>{data.name}</ProductName>
                            <PriceHeading>PRICE:</PriceHeading>
                            <Price>{PriceText}</Price>
                            <BackButton
                                onClick={() => this.props.navigate('/')}
                            >
                                BACK TO SHOP ↰
                            </BackButton>
                            <Desc>
                            <Markup content={description} />
                            </Desc>
                        </Right>
                    </Wrapper>
                </Container>
            );
        }
    }
}

// Export Component, connction to the redux store and custom functions
const mapStateProps = (state) => {
    return {
        currency: state.currency,
        products: state.shop.product
    };
};
// Cart dispatching function to the redux store
const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => dispatch(addToCart(id))
    };
};

export default connect(
    mapStateProps,
    mapDispatchToProps
)(withParams(ProductPage));
