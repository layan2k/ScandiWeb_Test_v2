import React, { Component } from 'react';
import styled from 'styled-components';

const Conatainer = styled.div`
    height: 190px;
    width: 120px;
    margin-left: 8px;
    position: relative;
    z-index: 0;
    max-width: 120px;
`;
const MainImage = styled.img`
    height: 190px;
    width: 120px;
    object-fit: fill;
`;

class MiniCartImageGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageposition: 0
        };
    }
    render() {
        const images = this.props.picsdata;
        const imagepositions = this.state.imageposition;

        return (
            <Conatainer>
                <MainImage src={images[imagepositions]} />
            </Conatainer>
        );
    }
}

export default MiniCartImageGallery;
