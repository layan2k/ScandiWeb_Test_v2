// Navbar Component

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GetAllCategories } from '../queries/GetAllCategories';
import { GetAllCurrencies } from '../queries/GetAllCurrencies';
import { changeCart } from '../redux/action/actions';
import MiniCart from './MiniCart/MiniCart';
import './Navbar.css';
// Import Images
import svg_3 from '../assets/svg_3.svg';
import svg_2 from '../assets/svg_2.svg';
import Vector from '../assets/Vector.svg';
import Vector2 from '../assets/Vector2.svg';
import Vector3 from '../assets/Vector3.svg';

// Styling
const Container = styled.div`
  height: 80px;
  max-height: 80px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 0 100px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1366px) {
    padding: 0 50px;
  }
  @media (max-width: 1280px) {
    padding: 0 25px;
  }
`;
// Left Side Container
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
// Center Side Container
const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
// Right Side Container
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
// Left Side Menu Designt

const MenuItemContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

const MenuItem = styled.span`
  font-family: 'Raleway';
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Center logo (icons)
const MainImage = styled.img`
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
`;
const BackGroundicon = styled.img`
  position: absolute;
  top: 23px;
`;
// Right Side design
// Currency Change Toggle
const DropDownConatiner = styled.div`
  height: auto;
  cursor: pointer;
  position: relative;
  z-index: 1;
`;
// DownIcon container ,Rotates up when Currency Dropdown is opens
// and up when it closes
const DownIcon = styled.img`
  transform: rotate(180deg);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  transform: rotate(${props => (props.rotatearrow ? 0 : '')});
`;
// Current Currency Symbol + Lable
const DropDownHeader = styled.div`
  margin-right: 10px;
`;
// Main Container for drop down
const DropDownListContainer = styled.div`
  display: flex;
  position: absolute;
  background-color: white;
  transition: all 0.3s ease-in-out;
`;
// Dropdown ul (Wrapper in Container)
const DropDownList = styled.ul`
  width: 114px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  color: #1d1f22;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;
// Dropdown Currency List Item
const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-weight: 500;
  width: 114px;
  height: 45px;
  &:hover {
    background-color: #eeeeee;
  }
  margin-top: 0.8em;
`;

// Cart
const CartIconContainer = styled.div`
  position: relative;
  margin-left: 22px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
`;
// Cart qty
const InCart = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1d1f22;
  color: white;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  left: 25px;
  bottom: -2px;
  transform: translate(-50%, -50%);
`;
// Cart svg
const CartIcon = styled.img`
  z-index: 1;
`;
// Cart wheels container
const CirclesConatiner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 4px;
`;
// Cart wheel svg
const CircleIcon = styled.img``;
// MinCart card
const CartCard = styled.div`
  width: 325px;
  border-radius: 0px;
  padding: 0 5px;
  position: absolute;
  margin-top: 50px;
  margin-right: 200px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 5;
  gap: 32px;
  @media (max-width: 1366px) {
    margin-right: 300px;
  }
  @media (max-width: 1280px) {
    margin-right: 350px;
  }
`;

// Class Component For  Navbar
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      arrow: false,
      cart: this.props.cartCondition,
      quantity: 0,
      currencies: [],
      categoriesData: [],
    };
    // Ref for clicks outside Container
    this.wrapperRef = React.createRef();
    this.cartRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  // Change currency Handler
  changeCurrency = data => {
    this.props.changeCurrentCurrency(data);
  };
  // Change Category Handler
  changeCategory = data => {
    this.props.changeCurrentCategory(data);
  };
  // fetching currencies for the redux store
  fetchCurrenciesForStore = async () => {
    const response = await GetAllCurrencies().catch(err => console.log(err));
    this.setState({
      currencies: response,
    });
  };

  fetchAllCategories = async () => {
    const response = await GetAllCategories().catch(err => console.log(err));
    this.setState({
      categoriesData: response.categories,
    });
  };

  // Loads data when the page is firt renderd
  // ,sets  states
  // and monitors mouse movement and clicks
  componentDidMount() {
    this.fetchCurrenciesForStore();
    this.fetchAllCategories();
    const cart = this.props.cart;
    let count = 0;
    cart.forEach(item => {
      count += item.qty;
    });
    document.addEventListener('mousedown', this.handleClickOutside);

    this.setState({
      quantity: count,
      cart: this.props.cartCondition,
    });
  }

  // Loads data when store is updated
  // ,dynamically updates  states
  // and monitors mouse movement and clicks
  componentDidUpdate(prevProps) {
    if (
      this.props.cart !== prevProps.cart ||
      this.props.cartCondition !== prevProps.cartCondition
    ) {
      this.fetchCurrenciesForStore();
      this.fetchAllCategories();
      const cart = this.props.cart;
      let count = 0;
      cart.forEach(item => {
        count += item.qty;
      });
      document.addEventListener('mousedown', this.handleClickOutside);

      this.setState({
        quantity: count,
        cart: this.props.cartCondition,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  // Method to close Cart and Currency Switcher if clicked out their container
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        isOpen: false,
        arrow: false,
      });
    }
    if (this.cartRef && !this.cartRef.current.contains(event.target)) {
      this.setState({
        cart: false,
      });
      this.props.changeCartCondtion(false);
    }
  }

  render() {
    // Toggle DropDown
    const toggling = () => {
      const BoolValue = this.state.isOpen;
      if (BoolValue) {
        this.setState({ isOpen: false, arrow: false });
      } else {
        this.setState({ isOpen: true, arrow: true });
        this.props.changeCartCondtion(false);
      }
    };

    // Toggle cart
    const carttoggle = () => {
      const BoolValue = this.state.cart;
      if (BoolValue) {
        this.props.changeCartCondtion(false);
      } else {
        this.setState({ isOpen: false, arrow: false });
        this.props.changeCartCondtion(true);
      }
    };

    const categories = this.state.categoriesData;

    // Function that get the current set Currency from the reducer
    // And Sets the current symbol on Display
    const currentCurrency = this.props.currency;
    const CurrencyIndex = currentCurrency.currency;
    const currencies = this.state.currencies.currencies;
    let ArrayCurrencies = [];
    if (Array.isArray(currencies) === true) {
      ArrayCurrencies = currencies.map(item => item.symbol);
    }
    return (
      <Container>
        <Wrapper>
          <Left>
            {categories.map((data, i) => {
              return (
                <NavLink
                  key={i}
                  to={`/category/${data.name}`}
                  className={nav => (nav.isActive ? 'active' : 'navlinkto')}
                >
                  <MenuItemContainer onClick={() => this.changeCategory(data.name)}>
                    <MenuItem> {data.name}</MenuItem>
                  </MenuItemContainer>
                </NavLink>
              );
            })}
          </Left>
          <Link to={'/'}>
            <Center>
              <MainImage src={svg_3} />
              <BackGroundicon src={svg_2} />
            </Center>
          </Link>
          <Right>
            <DropDownConatiner onClick={toggling} ref={this.wrapperRef}>
              <DropDownHeader>
                {ArrayCurrencies[CurrencyIndex]}{' '}
                <DownIcon src={Vector} rotatearrow={this.state.arrow} />
              </DropDownHeader>
              {this.state.isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    {currencies.map((item, i) => (
                      <ListItem key={i} value={item.label} onClick={() => this.changeCurrency(i)}>
                        {`${item.symbol} ${item.label}`}
                      </ListItem>
                    ))}
                  </DropDownList>
                </DropDownListContainer>
              )}
            </DropDownConatiner>
            <CartIconContainer ref={this.cartRef}>
              <InCart onClick={carttoggle}>{this.state.quantity}</InCart>
              <CartIcon onClick={carttoggle} src={Vector2} />
              <CirclesConatiner onClick={carttoggle}>
                <CircleIcon src={Vector3} />
                <CircleIcon src={Vector3} />
              </CirclesConatiner>
              {this.state.cart && (
                <CartCard>
                  <MiniCart />
                </CartCard>
              )}
            </CartIconContainer>
          </Right>
        </Wrapper>
      </Container>
    );
  }
}

const mapStateProps = state => {
  return {
    currency: state.currency,
    cart: state.shop.cart,
    cartCondition: state.isCartCondition.isCartOpened,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeCurrentCurrency: data => {
      dispatch({ type: 'CHANGE_CURRENCY', data: data });
    },
    changeCurrentCategory: data => {
      dispatch({ type: 'CHANGE_CATEGORY', data: data });
    },
    changeCartCondtion: data => {
      dispatch(changeCart(data));
    },
  };
};

export default connect(mapStateProps, mapDispatchToProps)(Navbar);
