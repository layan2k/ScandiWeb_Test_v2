import React, { Component } from 'react';
import styled from 'styled-components';

const Conatainer = styled.div`
    height: 228px;
    width: 200px;
    margin-left: 24px;
    position: relative;
    z-index: 0;
`
const MainImage = styled.img`
    height: 228px;
    width: 200px;
    object-fit: contain;
`

const ChangeImageControls = styled.div`
    position: absolute;
    display: flex;
    left: 168px;
    bottom:16px ;
    transform: translate(-50%, -50%);
`
const ChangeImageLeft = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 8px;
    background: rgba(0, 0, 0, 0.73);
;

`
const ChangeImageRight = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.73);

`

const ControlIcons = styled.img``


class ImageGallery extends Component {
    constructor(props){
        super(props)
        this.state = {
            imageposition: 0
        }
    }
    render() {
        const images = this.props.picsdata
        const imagepositions = this.state.imageposition
        const NumberOfImages = images.length

        const ChangeLeft = () => {
            const changeValue = imagepositions -1
            const NoIma = NumberOfImages -1
            if(imagepositions > 0){
                this.setState({
                    imageposition : changeValue
                })
            }
            else if(imagepositions === 0){
                this.setState({
                    imageposition: NoIma
                })
            }
        }
        const ChangeRight = () => {
            const changeValue = imagepositions + 1
            if((NumberOfImages -1) > imagepositions){
                this.setState({
                    imageposition: changeValue
                })
            }
            else{
                this.setState({
                    imageposition: 0
                })
            }
        }
        return (
            <Conatainer>
                <MainImage src={images[imagepositions]} />
                {NumberOfImages > 1 &&
               <ChangeImageControls>
                    <ChangeImageLeft onClick={()=> ChangeLeft()}><ControlIcons src='/assets/LeftVector.svg' /></ChangeImageLeft>
                    <ChangeImageRight onClick={()=> ChangeRight()}><ControlIcons src='/assets/RIghtVector.svg' /></ChangeImageRight>
                </ChangeImageControls>}
            </Conatainer>

        );
    }
}

export default ImageGallery;
