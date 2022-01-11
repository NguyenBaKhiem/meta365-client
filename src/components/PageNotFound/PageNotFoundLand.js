import React from "react";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import styled from "styled-components";
import { colors } from "@Theme/colors";
import background_404 from "../../assets/images/background404.png";
import img_404 from "../../assets/images/404.png"
import Button from "@Components/Button";
import { Link } from "react-router-dom";
export const Background = styled.div`
    /* background-image: url(${background_404}); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url(${background_404}), linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
    object-fit: cover;
    height: 100vh;
    @media ${breakpoints.xs} {
        height: unset;
    }
`;
export const Text = styled.p`
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 64px;
    line-height: 72px;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    @media ${breakpoints.sm} {
        font-weight: 500;
        font-size: 24px;
        line-height: 30px;
    }

`;
export const Img = styled.img`
    width: 25%;
    @media ${breakpoints.sm} {
        width : 50%;
    }
`;
export const Flex = styled.div`
    margin: 20px;
    display: flex;
    justify-content: center;
`;
export const Wrap = styled.div`
    margin-top:-420px;
    @media ${breakpoints.sm} {
       margin: 0px;
       height: 100vh;
    }
`;


const PageNotFoundLand = () => {

    return (
        <>
            <Background style={{ width: "100vw" }}>
                <Wrap>
                <Flex>
                 <Text>
                        Page Not Found
                    </Text>
               </Flex>
               <Flex>
                <Img src={img_404} />
                </Flex>
                <Flex>
                        <Link to="/" >
                    <Button width="240px" color={colors.new_button}>Back Homepage</Button>
                    </Link>
                </Flex>
                </Wrap>
            </Background>


        </>
    )
}
export default PageNotFoundLand;