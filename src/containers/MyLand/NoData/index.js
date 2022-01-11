import React from "react";
import styled from "styled-components";
import Text from "@Components/Text";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { colors } from "../../../theme/colors";

const Wrapper = styled.div`
    margin: 160px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NoNFT = () => {
    return(
        <>
            <Wrapper>
                <Text color="#FFF" type="header2">No items to display   </Text>
                <Link to="/marketplace" style={{marginTop: "16px"}}>
                    <Button color={colors.new_button} width="240px">Go to Marketplace</Button>
                </Link>
            </Wrapper>
        </>
    )
}

export default NoNFT;