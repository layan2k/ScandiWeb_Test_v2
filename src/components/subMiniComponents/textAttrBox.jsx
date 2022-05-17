import React, { Component } from 'react'
import styled from 'styled-components'

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
`
const Box = styled.div`
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
`

const COlorBox = styled.div`
  height: 32px;
  width: 32px;
  margin-right: 10px;
  cursor: pointer;
  background-color: ${props=> props.background};
  border: ${props=> ((props.current === true) ? "1px solid #5ECE7B" : "none")};
  transition: all 0.3s ease-in-out;
`

export default class TextAttrBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedText: 0,
      selectedColor: 0,
    }
  }

  render() {
      const data = this.props.data
      const name = this.props.name
      let refinedata = []
      if(Array.isArray(data)){
        refinedata = data;
      }
      else{
        console.log("loading data...")
      }

      const changeSizeStateIndex = (number) => {
        this.setState({
          selectedText: number
        })
      }
      const changeColorStateIndex = (number) => {
        this.setState({
          selectedColor: number
        })
      }

      const activeColor = this.state.selectedColor
      const activeText = this.state.selectedText
      console.log(activeText)
    return (
      <Container>
        {(name === "Capacity")&&
        <ItemContainer>
          <MainHeading>{name}:</MainHeading>
          <BoxContainer>
          {refinedata.map((info, i)=>
              <Box current={((activeText === i) ? true : false)} onClick={()=>changeSizeStateIndex(i)} key={i}>{info.value}</Box>
          )}
          </BoxContainer>
        </ItemContainer>}
        {(name === "Size")&&
        <ItemContainer>
          <MainHeading>{name}:</MainHeading>
          <BoxContainer>
          {refinedata.map((info, i)=>
              <Box current={((activeText === i) ? true : false)} onClick={()=>changeSizeStateIndex(i)} key={i}>{info.value} </Box>
          )}
          </BoxContainer>
        </ItemContainer>}
        {(name === "Color")&&
        <ItemContainer>
          <MainHeading>{name}:</MainHeading>
          <BoxContainer>
          {refinedata.map((info, i)=>
              <COlorBox background={info.value}  current={((activeColor === i) ? true : false)} onClick={()=>changeColorStateIndex(i)}  key={i}></COlorBox>
          )}
          </BoxContainer>
        </ItemContainer>}
      </Container>
    )
  }
}
