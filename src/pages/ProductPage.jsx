// Product Page
// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import BigImage from '../components/BigImage';
import MiniImageCard from '../components/MiniImageCard';
import PDPOptions from '../components/PDPOptions';
import { getProductsById } from '../Queries/getProductById';

// Main Comtainer
const Container = styled.div`
  height: auto;
  margin-top: 80px;
`
// Wrapper
const Wrapper = styled.div`
  margin: 0 100px;
  display: flex;
  margin-bottom: 178px;
`
// Left Image Toggle Gallary Design
const Left = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`
const LeftImg = styled.div`
  cursor: pointer;
  max-width: 100px;
  margin-bottom: 32px;
`
// Center Image Design
const Center = styled.div`
  margin-left: 10px;
`
// Right Side Product Design
const Right = styled.div`
margin-left: 82px;
  display: flex;
  flex-direction: column;

`
const Title = styled.div`
  font-family: 'Raleway';
  font-size: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
`
const ProductName = styled.div`
  font-size: 30px;
  font-weight: 400;
  margin-top: 16px;
  display: flex;
  align-items: center;

`

const PrizeHeading = styled.div`
  margin-top: 36px;
  font-family: 'Roboto Condensed';
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
`
const Price = styled.div`
  margin-top: 10px;
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 24px;
`
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
  background-color:#5ECE7B;
  color: white;
  cursor: pointer;
`
const Desc = styled.div`
  margin-top: 40px;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  color: #1D1F22;
`


// Get id from router Custom Functiom
const withParams = (Component) =>{
  return props => <Component {...props} params={useParams()} />
}

// Class Component entry
class ProductPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      images: [],
      position: 0,
    }
  }
  // API Product Call byProduct ID , require id as an input
 async componentDidMount () {
   const {id}  = this.props.params
   await getProductsById(id).then(res => res.product).then(product => this.setState({
    data: product,
    images: product.gallery,
}))}


  render() {
    let description = ''
    const data = this.state.data
    const images = this.state.images
    const prices = data.prices
    description = String(data.description)

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
  let PriceText = ''
  if(Array.isArray(prices)){
    PriceText = prices[displayCurrency].currency.symbol+prices[displayCurrency].amount
  }
  else{
    console.log("non array")
  }


    return (
      <Container>
        <Wrapper>
          {/* Left Side */}
          <Left>
            {images.map((data, i)=> {
              return(
                <LeftImg key={i} onClick={()=>this.setState({
                  position: i
                })}>
                  <MiniImageCard key={i} data={data} />
                </LeftImg>
              )
            }
            )}
          </Left>
          {/* Center */}
          <Center>
            <BigImage ima={images[this.state.position]}/>

          </Center>
          {/* Right Side */}
          <Right>
            <Title>{data.brand}</Title>
            <ProductName>{data.name}</ProductName>
            <PDPOptions data={data.attributes} />
            <PrizeHeading>PRICE:</PrizeHeading>
            <Price>
              {PriceText}
            </Price>
            <AddToButton>ADD TO CART</AddToButton>
            <Desc>{description.replace("<p>", "").replace("</p>", "").replace("<h1>", "").replace("</h1>", "")}</Desc>

          </Right>
        </Wrapper>
      </Container>
    )
  }
}

// Export Component
const mapStateProps = (state) => {
  return{
      currency : state.currency
  }
}

export default connect(mapStateProps)(withParams(ProductPage))