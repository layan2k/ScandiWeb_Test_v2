//  PLP - product listing page
// Imports
import React, { Component } from 'react'
import styled from 'styled-components'
import Card from '../components/ProductCard'
import { GetCategory } from '../Queries/GetCategory'

// Main Container
const Container = styled.div`
    height: auto;
    margin-top: 80px;
`
// Wrapper
const Wrapper = styled.div `
    padding-left: 100px;
    padding-right: 100px;
    display: flex;
    flex-direction: column;
`
// Category Name Heading
const Header = styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 42px;
`
// Container For the Products

const CardContainer = styled.div`
    margin-top: 87.82px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    width: 100%;
`
// Basic Loading  Template whilst waiting for Data from the Backend

const LoadingContainer = styled.div`
    text-align: center;
    font-weight:700;
    padding: 300px;
`
const LoadingText = styled.span`
    font-size: 40px;
`

// Class Component
export default class AllCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            isLoading:true
        }
    }

// Method to call our API Data

async componentDidMount () {
    await GetCategory(this.props.category).then(res => res.category).then(category => this.setState({
        data: category.products,
        isLoading:false
    }))
}

    async componentDidUpdate (prevProps) {
        if(this.props.category !== prevProps.category){
        await GetCategory(this.props.category).then(res => res.category).then(category => this.setState({
            data: category.products,
            isLoading:false
        }))}
    }

    setImage = (position) =>{
        return position;
    }


  render() {
      const headtitle = this.props.category
      const data = this.state.data
      if(this.state.isLoading === false)
      {
    return (
                    <Container>
                    <Wrapper>
                        <Header>{headtitle.charAt(0).toUpperCase() + headtitle.slice(1)}
                        </Header>
                        <CardContainer>
                            {data.map((res, i) => <Card key={i} data={res} />)}
                        </CardContainer>
                    </Wrapper>
                </Container>

    )
      }
      else{
          return(
              <LoadingContainer><LoadingText>Loading....</LoadingText></LoadingContainer>
          )
      }
  }
}
