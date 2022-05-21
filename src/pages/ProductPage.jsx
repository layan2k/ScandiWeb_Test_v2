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

// Main Comtainer
const Container = styled.div`
    height: auto;
`;
// Wrapper
const Wrapper = styled.div`
    padding: 0 100px;
    padding-top: 73px;
    padding-bottom: 178px;
    display: flex;
    @media (max-width: 1400px) {
        padding: 0 95px;
        padding-top: 73px;
        padding-bottom: 178px;
    }
`;
// Left Image Toggle Gallary Design
const Left = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
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
        const data = this.state.data;
        const images = this.state.images;
        const prices = data.prices;
        description = String(data.description);

        const currentCurrency = () => {
            const currentCurrency = this.props.currency;
            let currency = 0;
            switch (currentCurrency.currency) {
                case 'USD':
                    currency = 0;
                    break;
                case 'GBP':
                    currency = 1;
                    break;
                case 'AUD':
                    currency = 2;
                    break;
                case 'JPY':
                    currency = 3;
                    break;
                case 'RUB':
                    currency = 4;
                    break;
                default:
                    currency = 5;
            }
            return currency;
        };
        const displayCurrency = currentCurrency();
        let PriceText = '';
        if (Array.isArray(prices)) {
            PriceText =
                prices[displayCurrency].currency.symbol +
                prices[displayCurrency].amount;
        } else {
            console.log('loading...');
        }

        const SendCart = (data) => {
            this.props.addToCart(data);
            this.props.navigate('/cart');
        };

        if (data.inStock === true) {
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
                            <PDPOptions
                                data={data.attributes}
                                iddet={data.id}
                            />
                            <PriceHeading>PRICE:</PriceHeading>
                            <Price>{PriceText}</Price>
                            <AddToButton onClick={() => SendCart(data.id)}>
                                ADD TO CART
                            </AddToButton>
                            <Desc>
                                {description
                                    .replace('<p>', '')
                                    .replace('</p>', '')
                                    .replace('<h1>', '')
                                    .replace('</h1>', '')}
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
                                <p>Product is Currently Unavailable</p>
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
