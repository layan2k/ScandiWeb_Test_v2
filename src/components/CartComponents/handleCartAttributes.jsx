import React, { Component } from 'react';
import styled from 'styled-components';
import { getProductsById } from '../../queries/getProductById';
import CartAttributes from './CartAttributes';

const Container = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`

class HandleCartAttributes extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    fetchData = async() => {
        const id = this.props.id
        const response = await getProductsById(id).catch(err=> console.log(err))
        this.setState({
          data: response.product.attributes,
        })
      }

    componentDidMount () {
        this.fetchData()
    }
    render() {
        const id = this.props.id
        const verifiedArray = this.state.data
        return (
            <Container>
            {verifiedArray.map((data, i)=> <CartAttributes key={i}  data={data.items} type={data.type} name={data.name} id={id}/>
            )}
            </Container>
        );
    }
}

export default HandleCartAttributes;
