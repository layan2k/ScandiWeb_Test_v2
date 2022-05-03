// Navbar Component

// Imports
import React, { Component } from 'react';
import styled from 'styled-components'

// Styling
const Container = styled.div`
    height: 80px;
    max-height: 80px;
`

const Wrapper = styled.div`
    padding: 30px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

`
const MenuItem = styled.div`
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    margin-right: 32px;

`
// icon
const MainImage = styled.img`
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
`
const BackGroundicon = styled.img`
    position: absolute;
    top: 28px;
`
// Currency Change Toggle
const DropDownConatiner = styled.div`
    height: auto;
    cursor: pointer;
    position: relative;
`

const DownIcon = styled.img`
    transform: rotate(180deg);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    transform: rotate(${(props) => ((props.rotate === true) ? 0 : '')});
`
const DropDownHeader = styled.div`
`
const DropDownListContainer = styled.div`
    display: flex;
    position: absolute;
    transition: all 0.3s ease-in-out;
`

const DropDownList = styled.ul`
    width: 114px;
    padding: 0;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    box-sizing: border-box;
    color:#1D1F22;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    &:first-child {
        padding-top: 0.8em;
    }

`
const ListItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    width: 114px;
    height: 45px;
    &:hover{
        background-color: #EEEEEE;
    }
    margin-bottom: 0.8em;
`

// Cart
const CartIconContainer = styled.div`
    margin-left: 22px ;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

`
const CartIcon = styled.img``

const CirclesConatiner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 4px ;


`
const CircleIcon = styled.img``



// Class Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {value: 'USD',
                      isOpen: false,
                      arrow: false
                    }
        this.handleChange= this.handleChange.bind(this)
    }
    // Handle currency change
    handleChange(event) {
        this.setState({value: event.target.value});
        alert.log(event)
    }


    render() {

                // Toggle DropDown
                const toggling = () =>
                {
                    const BoolValue = this.state.isOpen
                    if(BoolValue){
                        this.setState({isOpen: false, arrow: false})
                    }
                    else{
                        this.setState({isOpen: true, arrow: true})

                    }

                }


        return (
            <Container>
                <Wrapper>
                    <Left>
                        <MenuItem>ALL</MenuItem>
                        <MenuItem>CLOTHES</MenuItem>
                        <MenuItem>TECH</MenuItem>

                    </Left>
                    <Center>
                        <MainImage src='/assets/svg_3.svg' />
                        <BackGroundicon src='/assets/svg_2.svg' />
                    </Center>
                    <Right>
                        <DropDownConatiner onClick={toggling} >
                            <DropDownHeader>$ <DownIcon src='/assets/Vector.svg' rotate = {this.state.arrow}/></DropDownHeader>
                            {(this.state.isOpen === true)&&
                            <DropDownListContainer>
                                <DropDownList >
                                    <ListItem value="USD" >$ USD</ListItem>
                                    <ListItem value="GBP" >£ GBP</ListItem>
                                    <ListItem value="RUB" >₽ RUB</ListItem>
                                    <ListItem value="AUD" >A$ AUD</ListItem>
                                </DropDownList>
                            </DropDownListContainer>
                            }
                        </DropDownConatiner>
                        <CartIconContainer>
                            <CartIcon src='/assets/Vector2.svg' />
                            <CirclesConatiner>
                                <CircleIcon src='/assets/Vector3.svg'/>
                                <CircleIcon src='/assets/Vector3.svg'/>
                            </CirclesConatiner>
                        </CartIconContainer>

                    </Right>
                </Wrapper>

            </Container>
        );
    }
}

export default Navbar;
