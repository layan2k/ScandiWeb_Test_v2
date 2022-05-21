// Navbar Component

// Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { changeCart } from '../redux/action/actions';
import MiniCart from './MiniCart/MiniCart';

// Styling
const Container = styled.div`
    height: 80px;
    max-height: 80px;
`;

const Wrapper = styled.div`
    padding: 0 100px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1400px) {
        padding: 0 95px;
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
    margin-right: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80px;
    border-bottom: ${(props) => (props.allcat ? '2px solid #5ECE7B' : '')};
`;

const MenuItem = styled.div`
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 400;
    font-size: ${(props) => (props.allcat ? '16px' : '')};
    color: ${(props) => (props.allcat ? '#5ECE7B' : '')};
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
    transform: rotate(${(props) => (props.rotatearrow ? 0 : '')});
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
    padding: 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    box-sizing: border-box;
    color: #1d1f22;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    &:first-child {
        padding-top: 0.8em;
    }
`;
// Dropdown Currency List Item
const ListItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    width: 114px;
    height: 45px;
    &:hover {
        background-color: #eeeeee;
    }
    margin-bottom: 0.8em;
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
    height: auto;
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
    z-index: 1;
    gap: 32px;
`;

// Class Component For  Navbar
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            arrow: false,
            cart: false,
            quantity: 0
        };
        // Ref for clicks outside Container
        this.wrapperRef = React.createRef();
        this.cartRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    // Change currency Handler
    changeCurrency = (data) => {
        this.props.changeCurrentCurrency(data);
    };
    // Change Category Handler
    changeCategory = (data) => {
        this.props.changeCurrentCategory(data);
    };

    // Loads data when the page is firt renderd
    // ,sets  states
    // and monitors mouse movement and clicks
    componentDidMount() {
        const cart = this.props.cart;
        let count = 0;
        cart.forEach((item) => {
            count += item.qty;
        });
        document.addEventListener('mousedown', this.handleClickOutside);

        this.setState({
            quantity: count
        });
    }

    // Loads data when store is updated
    // ,dynamically updates  states
    // and monitors mouse movement and clicks
    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            const cart = this.props.cart;
            let count = 0;
            cart.forEach((item) => {
                count += item.qty;
            });
            document.addEventListener('mousedown', this.handleClickOutside);

            this.setState({
                quantity: count
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    // Method to close Cart and Currency Switcher if clicked out their container
    handleClickOutside(event) {
        if (
            this.wrapperRef &&
            !this.wrapperRef.current.contains(event.target)
        ) {
            this.setState({
                isOpen: false,
                arrow: false
            });
        }
        if (this.cartRef && !this.cartRef.current.contains(event.target)) {
            this.setState({
                cart: false
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
                this.setState({ isOpen: true, arrow: true, cart: false });
            }
        };

        // Toggle cart
        const carttoggle = () => {
            const BoolValue = this.state.cart;
            if (BoolValue) {
                this.setState({ cart: false });
                this.props.changeCartCondtion(false);
            } else {
                this.setState({ cart: true, isOpen: false, arrow: false });
                this.props.changeCartCondtion(true);
            }
        };

        // Function to show active tab
        let { allcat, clothescat, techcat } = false;

        const activetab = () => {
            const currentcategory = this.props.category;
            if (currentcategory === 'all') {
                allcat = true;
            } else if (currentcategory === 'clothes') {
                clothescat = true;
            } else {
                techcat = true;
            }
        };
        activetab();

        // Function that get the current set Currency from the reducer
        // And Sets the current symbol on Display
        const displayCurrency = () => {
            const currentCurrency = this.props.currency;
            let symbol = ' ';
            // Switch Satement to decide which text to display
            switch (currentCurrency.currency) {
                case 'USD':
                    symbol = '$';
                    break;
                case 'GBP':
                    symbol = '£';
                    break;
                case 'AUD':
                    symbol = 'A$';
                    break;
                case 'JPY':
                    symbol = '¥';
                    break;
                case 'RUB':
                    symbol = '₽';
                    break;
                default:
                    symbol = '$';
            }
            return symbol;
        };

        const displayTextCurrency = displayCurrency();

        return (
            <Container>
                <Wrapper>
                    <Left>
                        <MenuItemContainer
                            allcat={allcat}
                            onClick={() => this.changeCategory('all')}
                        >
                            <MenuItem allcat={allcat}> ALL </MenuItem>
                        </MenuItemContainer>
                        <MenuItemContainer
                            allcat={clothescat}
                            onClick={() => this.changeCategory('clothes')}
                        >
                            <MenuItem allcat={clothescat}> CLOTHES </MenuItem>
                        </MenuItemContainer>
                        <MenuItemContainer
                            allcat={techcat}
                            onClick={() => this.changeCategory('tech')}
                        >
                            <MenuItem allcat={techcat}> TECH </MenuItem>
                        </MenuItemContainer>
                    </Left>
                    <Link to={'/'}>
                        <Center>
                            <MainImage src="/assets/svg_3.svg" />
                            <BackGroundicon src="/assets/svg_2.svg" />
                        </Center>
                    </Link>
                    <Right>
                        <DropDownConatiner
                            onClick={toggling}
                            ref={this.wrapperRef}
                        >
                            <DropDownHeader>
                                {displayTextCurrency}{' '}
                                <DownIcon
                                    src="/assets/Vector.svg"
                                    rotatearrow={this.state.arrow}
                                />
                            </DropDownHeader>
                            {this.state.isOpen && (
                                <DropDownListContainer>
                                    <DropDownList>
                                        <ListItem
                                            value="USD"
                                            onClick={() =>
                                                this.changeCurrency('USD')
                                            }
                                        >
                                            $ USD
                                        </ListItem>
                                        <ListItem
                                            value="GBP"
                                            onClick={() =>
                                                this.changeCurrency('GBP')
                                            }
                                        >
                                            £ GBP
                                        </ListItem>
                                        <ListItem
                                            value="AUD"
                                            onClick={() =>
                                                this.changeCurrency('AUD')
                                            }
                                        >
                                            A$ AUD
                                        </ListItem>
                                        <ListItem
                                            value="JPY"
                                            onClick={() =>
                                                this.changeCurrency('JPY')
                                            }
                                        >
                                            ¥ JPY
                                        </ListItem>
                                        <ListItem
                                            value="RUB"
                                            onClick={() =>
                                                this.changeCurrency('RUB')
                                            }
                                        >
                                            ₽ RUB
                                        </ListItem>
                                    </DropDownList>
                                </DropDownListContainer>
                            )}
                        </DropDownConatiner>
                        <CartIconContainer ref={this.cartRef}>
                            <InCart onClick={carttoggle}>
                                {this.state.quantity}
                            </InCart>
                            <CartIcon
                                onClick={carttoggle}
                                src="/assets/Vector2.svg"
                            />
                            <CirclesConatiner onClick={carttoggle}>
                                <CircleIcon src="/assets/Vector3.svg" />
                                <CircleIcon src="/assets/Vector3.svg" />
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

const mapStateProps = (state) => {
    return {
        currency: state.currency,
        cart: state.shop.cart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentCurrency: (data) => {
            dispatch({ type: 'CHANGE_CURRENCY', data: data });
        },
        changeCurrentCategory: (data) => {
            dispatch({ type: 'CHANGE_CATEGORY', data: data });
        },
        changeCartCondtion: (data) => {
            dispatch(changeCart(data));
        }
    };
};

export default connect(mapStateProps, mapDispatchToProps)(Navbar);
