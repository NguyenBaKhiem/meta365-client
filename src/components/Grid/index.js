import React from "react";
import styled from "styled-components";

const StyleGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${(props) => (props.col)} ,1fr);
    
`;

const Grid = (props) => {
    return(
        <StyleGrid col={props.col}>
            {props.children}
        </StyleGrid>
    )
} 

export default Grid;