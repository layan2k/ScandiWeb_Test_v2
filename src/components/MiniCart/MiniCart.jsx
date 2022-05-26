// MiniCart Main Components
// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GetAllCurrencies } from '../../queries/GetAllCurrencies';
import { adjustQty, removeFromCart } from '../../redux/action/actions';
import HandleMiniCartAttri from './handleMiniCartAttri';
import MiniCartImageGallery from './MiniCartImageGallery';
import MiniCartPrices from './MiniCartPrices';

// Container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  padding-bottom: 32px;
  padding-left: 8px;
  padding-right: 5px;
  max-width: 325px;
`;
// Header AKA My Bag Title
const Header = styled.h1`
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;
// Items Container holds the  Cart Items
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 55px;
`;
const CartItemsContainerBox = styled.div`
  max-height: 350px;
  overflow-y: scroll;
  overflow-x: hidden;
`;
// Cart Item
const CartItemContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
`;
// Left Side Container Which hold thes the Product Information
const LeftItems = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 136px;
`;
// Product Brand
const ItemHeader = styled.div`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 300;
`;
// Product Name
const ItemProduct = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 300;
`;
// Product Price
const ItemPrice = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
`;
// Right Container that contains the Picture and Quantity Controls
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
// Right SIde Container Wrapper
const RightItems = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  align-items: center;
`;
// Container with Quantity Controls
const AdjPrice = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
// Add Quantity Button
const PlusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 45px;
  width: 45px;
  font-size: 45px;
  font-weight: 200;
  border: 1px solid #1d1f22;
  cursor: pointer;
`;

// Remove Quantity Button
const MinusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 45px;
  width: 45px;
  font-size: 45px;
  font-weight: 200;
  border: 1px solid #1d1f22;
  cursor: pointer;
`;
// Current Product Quantity
const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 48px 0;
  font-size: 24px;
  font-weight: 500;
  height: 45px;
  width: 45px;
`;
// Gallery Container
const Gallery = styled.div`
  display: flex;
`;
// Total Container
const Total = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
`;
// Total Text Containe
const TotalProperties = styled.div`
  font-size: 24px;
`;
// Total Text Headings
const TotalValueHeading = styled.div`
  font-family: 'Roboto';
  font-weight: 500;
  margin-top: 8px;
  font-size: 16px;
`;
// Product Total Value Container
const TotalValues = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-left: 20px;
  color: #1d1f22;
`;
// Product Total Value
const TotalValueItems = styled.div`
  margin-top: 8px;
  color: #1d1f22; ;
`;
// Buttons Container
const BottomButtons = styled.div`
  padding: 0 18.5px;
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
`;
// View bag Button
const ViewBagButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
  width: 140px;
  height: 43px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1d1f22;
  background: none;
  border: 1px solid #1d1f22;
  cursor: pointer;
`;
// Checkout Button
const OrderButton = styled.div`
  display: flex;
  margin-left: 12px;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
  width: 140px;
  height: 43px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: #5ece7b;
  cursor: pointer;
  &:hover {
    background: #1d1f22;
  }
`;

// MiniCart Component entry
class MiniCart extends Component {
  // Initialize States
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
      total: 0,
      tax: 0,
      currencies: [],
    };
  }
  // fetching products for the redux store
  fetchCurrenciesForStore = async () => {
    const response = await GetAllCurrencies().catch(err => console.log(err));
    this.setState({
      currencies: response,
    });
  };
  // Loads data and sets state when first rendered
  componentDidMount() {
    this.fetchCurrenciesForStore();
    // get cart information from the redux store
    const cart = this.props.cart;
    //  Currency Handler To Determine which currency is in use
    const currentCurrency = this.props.currency.currency;

    // Currency Handler is used to determine which position our Values are in the Array
    let count = 0;
    let total = 0;
    // For each to get out products qty and  Product Total
    cart.forEach(item => {
      count += item.qty;
      total += item.prices[currentCurrency].amount * item.qty;
    });
    // tax and total calculation tax included
    const tax = 0.21 * total;
    const finalTotal = tax + total;
    // sets states
    this.setState({
      cartCount: count,
      total: parseFloat(finalTotal).toFixed(2),
      tax: parseFloat(tax).toFixed(2),
    });
  }

  // Loads data when store is updated
  // and dynamically updates  states
  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart || this.props.currency !== prevProps.currency) {
      this.fetchCurrenciesForStore();
      // get cart information from the redux store
      const cart = this.props.cart;
      //  Currency Handler To Decide which currency is in use
      const currentCurrency = this.props.currency.currency;

      // Currency Handler is used to determine which positions our Values are in the Array
      let count = 0;
      let total = 0;
      // For each to get out products qty and Product Total
      cart.forEach(item => {
        count += item.qty;
        total += item.prices[currentCurrency].amount * item.qty;
      });
      // tax and total calculation tax included
      const tax = 0.21 * total;
      const finalTotal = tax + total;
      // updates  states
      this.setState({
        cartCount: count,
        total: parseFloat(finalTotal).toFixed(2),
        tax: parseFloat(tax).toFixed(2),
      });
    }
  }
  render() {
    // loads  cart from the redux store
    let cart = [];
    cart = this.props.cart;
    // QTy is quantity
    // Add Qty and update qty in  redux store
    const AddQty = (id, qty) => {
      const newQty = qty + 1;
      this.props.changeQuantityDetail(id, newQty);
    };
    // Deduct Qty and Delete from cart when qty becomes 1
    const RemoveQty = (id, qty) => {
      const newQty = qty - 1;
      if (qty > 1) {
        this.props.changeQuantityDetail(id, newQty);
      } else if (qty === 1) {
        this.props.removeProduct(id);
      }
    };

    // Currency Handler To determine the current symbol been utilizes
    // get currency values from the redux store
    const currentCurrency = this.props.currency;
    const CurrencyIndex = currentCurrency.currency;
    const currencies = this.state.currencies.currencies;
    let ArrayCurrencies = [];
    if (Array.isArray(currencies) === true) {
      ArrayCurrencies = currencies.map(item => item.symbol);
    }
    return (
      <Container>
        {/* Total Qty */}
        <Header>My Bag, {this.state.cartCount} items</Header>
        {/* Cart Items */}
        <CartItemsContainerBox>
          {cart.map((data, i) => (
            <ItemsContainer key={i}>
              <CartItemContainer>
                <LeftItems>
                  <ItemHeader>{data.brand}</ItemHeader>
                  <ItemProduct>{data.name}</ItemProduct>
                  <ItemPrice>
                    <MiniCartPrices data={data.prices} qty={data.qty} />
                  </ItemPrice>
                  <HandleMiniCartAttri id={data.id} />
                </LeftItems>
                <RightContainer>
                  <RightItems>
                    {/* Controls */}
                    <AdjPrice>
                      <PlusBox onClick={() => AddQty(data.id, data.qty)}>+</PlusBox>
                      <Quantity>{data.qty}</Quantity>
                      <MinusBox onClick={() => RemoveQty(data.id, data.qty)}>
                        <span style={{ marginBottom: '10px' }}>-</span>
                      </MinusBox>
                    </AdjPrice>
                    {/* Gallery */}
                    <Gallery>
                      <MiniCartImageGallery picsdata={data.gallery} />
                    </Gallery>
                  </RightItems>
                </RightContainer>
              </CartItemContainer>
            </ItemsContainer>
          ))}
        </CartItemsContainerBox>
        {/* Total Summary */}
        <Total>
          <TotalProperties>
            <TotalValueHeading>Total:</TotalValueHeading>
          </TotalProperties>
          <TotalValues>
            <TotalValueItems>{ArrayCurrencies[CurrencyIndex] + this.state.total}</TotalValueItems>
          </TotalValues>
        </Total>
        {/* View and Checkout Buttons */}
        <BottomButtons>
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <ViewBagButton>VIEW BAG</ViewBagButton>
          </Link>
          <OrderButton>CHECKOUT</OrderButton>
        </BottomButtons>
      </Container>
    );
  }
}

// Export Component + Redux Connection
const mapStateProps = state => {
  return {
    currency: state.currency,
    cart: state.shop.cart,
  };
};

// Change Qty and remove products from store
// Function
const mapDispatchToProps = dispatch => {
  return {
    changeQuantityDetail: (id, value) => {
      dispatch(adjustQty(id, value));
    },

    removeProduct: id => {
      dispatch(removeFromCart(id));
    },
  };
};

export default connect(mapStateProps, mapDispatchToProps)(MiniCart);
