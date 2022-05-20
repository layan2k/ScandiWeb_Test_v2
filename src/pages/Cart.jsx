import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import HandleCartAttributes from '../components/CartComponents/handleCartAttributes'
import CartPrices from '../components/CartComponents/CartPrices'
import ImageGallery from '../components/CartComponents/ImageGallery'
import { adjustQty, removeFromCart } from '../redux/action/actions'

const Container = styled.div`
  margin: 0 100px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  height: auto;
  padding-bottom: 274px;

`
const Header = styled.h1`
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 55px;
`

const CartItemContainer = styled.div`
  height: auto;
  width: 100%;
  border-top: 1px solid #E5E5E5;
  display: flex;
  justify-content: space-between;
`
const LeftItems = styled.div`
  display: flex;
  flex-direction: column;
`
const ItemHeader = styled.div`
  margin-top: 24px;
  font-size: 30px;
  font-weight: 600;
`
const ItemProduct = styled.div`
  margin-top: 16px;
  font-size: 30px;
  font-weight: 400;
`

const ItemPrice = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
`
const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const RightItems = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`
const AdjPrice = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`
const PlusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 45px;
  width: 45px;
  font-size: 45px;
  font-weight: 200;
  border: 1px solid #1D1F22;
  cursor: pointer;
`
const MinusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 45px;
  width: 45px;
  font-size: 45px;
  font-weight: 200;
  border: 1px solid #1D1F22;
  cursor: pointer;
`
const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 48px 0;
  font-size: 24px;
  font-weight: 500;
  height: 45px;
  width: 45px;
`

const Gallery = styled.div`
  display: flex;
`

const Total = styled.div`
  margin-top: 24px;
  width: 100%;
  border-top: 1px solid #E5E5E5;
  display: flex;
`
const TotalProperties = styled.div`
  font-size: 24px;

`
const TPropertyItem = styled.div`
  font-weight: 400;
  margin-top: 8px;
`
const TotalValueHeading = styled.div`
  font-weight: 500;
  margin-top: 8px;
`

const TotalValues = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-left: 20px;
`
const TotalValueItems = styled.div`
  margin-top: 8px;
`

const OrderButton = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 32px;
  width: 279px;
  height: 43px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: #5ECE7B;
  cursor: pointer;
  &:hover{
    background: #1D1F22;
  }
`

class Cart extends Component {
  constructor(props){
    super(props)
    this.state = {
      cartCount: 0,
      total : 0,
      tax: 0
    }
  }


  componentDidMount () {

      const cart = this.props.cart
              // Currency Handler
              const currentCurrency = () => {
                const currentCurrency = this.props.currency
                let currency = 0
                switch (currentCurrency.currency) {
                    case "USD":
                        currency = 0
                        break;
                    case "GBP":
                        currency = 1
                    break
                    case "AUD":
                        currency= 2
                    break
                    case "JPY":
                        currency = 3
                    break
                    case "RUB":
                        currency = 4
                    break
                    default:
                        currency = 5
                }
                return currency
            }
            const displayCurrency = currentCurrency()
        let count= 0
        let total = 0
        cart.forEach(item => {
          count += item.qty
          total += (item.prices[displayCurrency].amount) * item.qty
        });

        const tax = 0.21 * total
        const finalTotal = tax + total

        this.setState({
          cartCount: count,
          total: parseFloat(finalTotal).toFixed(2),
          tax: parseFloat(tax).toFixed(2)
        })
}
  componentDidUpdate (prevProps) {
    if(this.props.cart !== prevProps.cart || this.props.currency !== prevProps.currency ){
      const cart = this.props.cart
              // Currency Handler
              const currentCurrency = () => {
                const currentCurrency = this.props.currency
                let currency = 0
                switch (currentCurrency.currency) {
                    case "USD":
                        currency = 0
                        break;
                    case "GBP":
                        currency = 1
                    break
                    case "AUD":
                        currency= 2
                    break
                    case "JPY":
                        currency = 3
                    break
                    case "RUB":
                        currency = 4
                    break
                    default:
                        currency = 5
                }
                return currency
            }
            const displayCurrency = currentCurrency()
        let count= 0
        let total = 0
        cart.forEach(item => {
          count += item.qty
          total += (item.prices[displayCurrency].amount) * item.qty
        });
        const tax = 0.21 * total
        const finalTotal = tax + total

        this.setState({
          cartCount: count,
          total: parseFloat(finalTotal).toFixed(2),
          tax: parseFloat(tax).toFixed(2)
        })
    }
}
  render() {
    let cart = []
    cart = this.props.cart

    const AddQty = (id, qty) => {
        const newQty = qty + 1
        this.props.changeQuantityDetail(id, newQty)
    }
    const RemoveQty = (id, qty) => {
        const newQty = qty - 1
        if(qty > 1){
        this.props.changeQuantityDetail(id, newQty)
        }else if (qty === 1){
            this.props.removeProduct(id)
        }
    }

              // Currency Handler
              const currentCurrency = () => {
                const currentCurrency = this.props.currency
                let currency = "$"
                switch (currentCurrency.currency) {
                    case "USD":
                        currency = "$"
                        break;
                    case "GBP":
                        currency = "£"
                    break
                    case "AUD":
                        currency= "A$"
                    break
                    case "JPY":
                        currency = "¥"
                    break
                    case "RUB":
                        currency = "₽"
                    break
                    default:
                        currency = "$"
                }
                return currency
            }
            const displayCurrency = currentCurrency()



    return (
      <Container>
        <Header>
        CART
        </Header>
        {cart.map((data, i)=>
        <ItemsContainer key={i}>
      <CartItemContainer>
        <LeftItems>
          <ItemHeader>{data.brand}</ItemHeader>
          <ItemProduct>{data.name}</ItemProduct>
          <ItemPrice><CartPrices data={data.prices} qty={data.qty} /></ItemPrice>
          <HandleCartAttributes id={data.id}/>
        </LeftItems>
        <RightContainer>
          <RightItems>
            <AdjPrice>
              <PlusBox onClick={()=> AddQty(data.id, data.qty)}>+</PlusBox>
              <Quantity>{data.qty}</Quantity>
              <MinusBox onClick={()=>RemoveQty(data.id, data.qty) }><span style={{marginBottom:"10px"}}>-</span></MinusBox>
            </AdjPrice>
            <Gallery>
              <ImageGallery picsdata={data.gallery} />
            </Gallery>
          </RightItems>
        </RightContainer>
      </CartItemContainer>
        </ItemsContainer>
          )}
          <Total>
            <TotalProperties>
              <TPropertyItem>Tax 21%:</TPropertyItem>
              <TPropertyItem>Quantity:</TPropertyItem>
              <TotalValueHeading>Total:</TotalValueHeading>
            </TotalProperties>
            <TotalValues>
              <TotalValueItems>{displayCurrency + this.state.tax}</TotalValueItems>
              <TotalValueItems>{this.state.cartCount}</TotalValueItems>
              <TotalValueItems>{displayCurrency + this.state.total}</TotalValueItems>
            </TotalValues>
          </Total>
          <OrderButton>ORDER</OrderButton>
      </Container>

    )
  }
}

// Export Component + Redux Connection
const mapStateProps = (state) => {
  return{
      currency : state.currency,
      cart: state.shop.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
          changeQuantityDetail : (id, value) => {
              dispatch(adjustQty(id, value))
          },

          removeProduct : (id) => {
            dispatch(removeFromCart(id))
          }
      }
  }

export default connect(mapStateProps, mapDispatchToProps)(Cart)
