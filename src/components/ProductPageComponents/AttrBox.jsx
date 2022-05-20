import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addColorAttri, addTextAttri } from '../../redux/action/actions'

const Container = styled.div`
  display: flex;
`
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MainHeading = styled.div`
  margin-top: 10px;
  font-family: 'Raleway';
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 8px;
  text-transform: uppercase;
`
const BoxContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`
const Box = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #1D1F22;
  width: 63px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  cursor: pointer;
  background-color: ${props=> ((props.current === true) ? "#1D1F22" : "white")};
  color: ${props=> ((props.current === true) ? "white" : "black")};
  transition: all 0.3s ease-in-out;
  text-decoration: none;
`
const ColorConatiner = styled.div`
    height: 36px;
    width: 36px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${props=> ((props.current === true) ? "1px solid #5ECE7B" : "none")};
    transition: all 0.1s ease-in;
`
const COlorBox = styled.div`
  height: 32px;
  width: 32px;
  cursor: pointer;
  background-color: ${props=> props.background};
`

class TextAttrBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedText: 0,
      selectedColor: 0,
    }
  }

  setAttributes = () => {
    const name = this.props.name
    const attributes = this.props.attributes
    const id = `${name}+${this.props.id}`
    attributes.map((item)=> (id === item.id)? this.setState({selectedText : item.textattri, selectedColor : (item.colorattr)? item.colorattr : 0 }): item)

  }

  componentDidMount (){
    this.setAttributes()
  }

  render() {
      const data = this.props.data
      const type = this.props.type
      const name = this.props.name
      let refinedata = []
      if(Array.isArray(data)){
        refinedata = data;
      }
      else{
        console.log("loading data...")
      }

      const changeSizeStateIndex = (number, value) => {
        const newid = `${name}+${this.props.id}`
        this.props.changeTextDetail(newid, number)
        this.setState({
          selectedText: number
        })
      }
      const changeColorStateIndex = (number) => {
        this.props.changeColorDetails(this.props.id, number)
        this.setState({
          selectedColor: number
        })
      }

      const activeColor = this.state.selectedColor
      const activeText = this.state.selectedText
    return (
      <Container>
        {(type === "text")&&
        <ItemContainer>
          <MainHeading>{name}:</MainHeading>
          <BoxContainer>
          {refinedata.map((info, i)=>
              <Box title={info.displayValue} current={((activeText === i) ? true : false)} onClick={()=>changeSizeStateIndex(i)} key={i}>{info.value}</Box>
          )}
          </BoxContainer>
        </ItemContainer>}
        {(type === "swatch")&&
        <ItemContainer>
          <MainHeading>{name}:</MainHeading>
          <BoxContainer>
          {refinedata.map((info, i)=>
              <ColorConatiner current={((activeColor === i) ? true : false)} onClick={()=>changeColorStateIndex(i)}  key={i}>
              <COlorBox title={info.displayValue} background={info.value} ></COlorBox>
              </ColorConatiner>
          )}
          </BoxContainer>
        </ItemContainer>}
      </Container>
    )
  }
}

const mapStateProps = (state) => {
  return{
      attributes: state.shop.attributes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
          changeTextDetail : (id, value) => {
              dispatch(addTextAttri(id, value))
          },
          changeColorDetails : (id, value)=>{
              dispatch(addColorAttri(id, value))
          }
      }
  }

export default connect(mapStateProps, mapDispatchToProps)(TextAttrBox)