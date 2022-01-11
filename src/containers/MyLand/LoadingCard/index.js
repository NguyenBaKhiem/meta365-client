import React from 'react';
import {Wrapper, Description, Image, Button, Title } from './style';

const LoadingCard = (props) => {
    const {i} = props;
    return (
        <Wrapper key={`loading-card-${i}`}>
            <Image/>
            <Title />
            <Description />
            <Button />
        </Wrapper>
    );
}

export default LoadingCard;
