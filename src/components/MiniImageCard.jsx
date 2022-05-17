import React, { Component } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
    height: 87.61px;
    width: 88px;
    padding: 3px;
`
const Image = styled.img`
    width: 84;
    height:83.61px ;
    object-fit: cover;
`

class MiniImageCard extends Component {
    render() {
        return (
            <ImageContainer>
                <Image src={this.props.data}/>
            </ImageContainer>
        );
    }
}

export default MiniImageCard;
