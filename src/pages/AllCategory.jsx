import React, { Component } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import { GetCatergory } from '../Queries/GetCategory'

const Container = styled.div`
    height: auto;
    margin-top: 80px;
`

const Wrapper = styled.div `
    padding-left: 100px;
    padding-right: 100px;
    display: flex;
    flex-direction: column;
`

const Header = styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 42px;
`

const CardContainer = styled.div`
    margin-top: 87.82px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;

`
export default class AllCategory extends Component {

  render() {
      const headtitle = this.props.category

      const fetchFunction = async () => {
        const loadData = await GetCatergory(this.props.category)
         const productdata = loadData.category;
         console.log(productdata.products)
         }
         fetchFunction()


    return (
                    <Container>
                    <Wrapper>
                        <Header>{headtitle.charAt(0).toUpperCase() + headtitle.slice(1)}
                        </Header>
                        <CardContainer>

                            <Card />
                        </CardContainer>
                    </Wrapper>
                </Container>

    )
  }
}
