import React, { Component } from 'react';
import styled from 'styled-components';
import TextAttrBox from './subMiniComponents/textAttrBox';


const Container = styled.div`
    margin-top: 43px;
    display: flex;
    flex-direction: column;
`



class PDPOptions extends Component {


    render() {

        const data = this.props.data
        let verifiedArray = []
        if(Array.isArray(data)){
            verifiedArray = data
        }else{
            console.log("loading..")
        }
        return (
            <Container>
                {verifiedArray.map((data, i)=> <TextAttrBox key={i}  data={data.items} name={data.name}/>
                )}
            </Container>
        );
    }
}

export default PDPOptions;
