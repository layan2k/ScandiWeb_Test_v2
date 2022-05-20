import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
`;
const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainHeading = styled.div`
    margin-top: 8px;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 7px;
    text-transform: uppercase;
`;
const BoxContainer = styled.div`
    display: flex;
    box-sizing: border-box;
`;
const Box = styled.div`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 14px;
    font-weight: 400;
    border: 1px solid #1d1f22;
    min-width: 24px;
    width: auto;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    background-color: ${(props) =>
        props.current === true ? '#1D1F22' : 'white'};
    color: ${(props) => (props.current === true ? 'white' : 'black')};
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    cursor: pointer;
`;
const ColorConatiner = styled.div`
    height: 20px;
    width: 20px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${(props) =>
        props.current === true ? '1px solid #5ECE7B' : 'none'};
    transition: all 0.1s ease-in;
`;
const COlorBox = styled.div`
    height: 16px;
    width: 16px;
    cursor: pointer;
    background-color: ${(props) => props.background};
`;

class MiniCartAttributes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedText: 0,
            selectedColor: 0
        };
    }
    setAttributes = () => {
        const name = this.props.name;
        const attributes = this.props.attributes;
        const id = `${name}+${this.props.id}`;
        attributes.map((item) =>
            id === item.id
                ? this.setState({
                      selectedText: item.textattri,
                      selectedColor: item.colorattr ? item.colorattr : 0
                  })
                : item
        );
    };

    componentDidMount() {
        this.setAttributes();
    }
    componentDidUpdate(prevProps) {
        if (
            this.props.attributes !== prevProps.attributes ||
            this.props.attributes !== prevProps.attributes
        ) {
            this.fetchProducts();
        }
    }

    render() {
        const data = this.props.data;
        const type = this.props.type;
        const name = this.props.name;
        let refinedata = [];
        if (Array.isArray(data)) {
            refinedata = data;
        } else {
            console.log('loading data...');
        }

        const activeColor = this.state.selectedColor;
        const activeText = this.state.selectedText;
        return (
            <Container>
                {type === 'text' && (
                    <ItemContainer>
                        <MainHeading>{name}:</MainHeading>
                        <BoxContainer>
                            {refinedata.map((info, i) => (
                                <Box
                                    title={info.displayValue}
                                    current={activeText === i ? true : false}
                                    key={i}
                                >
                                    {info.value}
                                </Box>
                            ))}
                        </BoxContainer>
                    </ItemContainer>
                )}
                {type === 'swatch' && (
                    <ItemContainer>
                        <MainHeading>{name}:</MainHeading>
                        <BoxContainer>
                            {refinedata.map((info, i) => (
                                <ColorConatiner
                                    current={activeColor === i ? true : false}
                                    key={i}
                                >
                                    <COlorBox
                                        title={info.displayValue}
                                        background={info.value}
                                    ></COlorBox>
                                </ColorConatiner>
                            ))}
                        </BoxContainer>
                    </ItemContainer>
                )}
            </Container>
        );
    }
}

const mapStateProps = (state) => {
    return {
        attributes: state.shop.attributes
    };
};

export default connect(mapStateProps)(MiniCartAttributes);
