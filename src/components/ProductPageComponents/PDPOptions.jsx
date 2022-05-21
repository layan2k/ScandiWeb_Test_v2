//  PDPOptions Compnent, showcases an Enlarged Image of the Product
// And also gives the user to see other images of that product
// imports
import React, { Component } from 'react';
import styled from 'styled-components';
import TextAttrBox from './AttrBox';

// Main Container
const Container = styled.div`
    margin-top: 43px;
    display: flex;
    flex-direction: column;
`;

// Component Entry
class PDPOptions extends Component {
    render() {
        const data = this.props.data;
        const id = this.props.iddet;
        let verifiedArray = [];
        if (Array.isArray(data)) {
            verifiedArray = data;
        } else {
            console.log('loading..');
        }
        return (
            <Container>
                {verifiedArray.map((data, i) => (
                    <TextAttrBox
                        key={i}
                        data={data.items}
                        type={data.type}
                        name={data.name}
                        id={id}
                    />
                ))}
            </Container>
        );
    }
}

export default PDPOptions;
