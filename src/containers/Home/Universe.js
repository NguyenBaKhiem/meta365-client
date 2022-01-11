import React from "react";
import styled from "styled-components";
import universe_video from "@Assets/video/final.mp4";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import Text from "@Components/Text";
import universe_img from "@Assets/images/universe.png"

const Wrapper = styled.div`
  position: relative;
  margin-top: 120px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;
const UniverseVideo = styled.video`
  width: 100%;
  @media ${breakpoints.sm} {
    display: none;
  }
`;
const Title = styled.h1`
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #00b67f;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;
  color: white;
  text-align: center;
  @media ${breakpoints.sm} {
    display: none;
  }
`;
const UniverseWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding-top: 34px;
  width: 100%;
  @media ${breakpoints.sm}{
      position: unset;
  }
`;
const MobileWrapper = styled.div`
  display: none;
  @media ${breakpoints.sm} {
    display: block;
  }
`;
const List = styled.li`
  list-style: none;
  font-size: 20px;
  font-family: "Open Sans";
  color: ${colors.text_body};
  position: relative;
  margin-bottom: 24px;
  &::before {
    content: "• ";
    color: ${colors.accent};
    font-size: 35px;
    position: absolute;
    top: -6px;
    left: -15px;
  }
`;

const Universe = () => {
  return (
    <>
      <Wrapper>
        <UniverseVideo src={universe_video} autoPlay loop playsInline muted />
        <UniverseWrapper>
          <div className="container">
            <Title>THE UNIVERSE OF META365</Title>
            <MobileWrapper>
                <div style={{marginBottom: "48px"}}>
              <Text color="white" type="header2">
                THE UNIVERSE OF META365
              </Text>
              </div>
              <ul>
                <List>
                  <Text color={colors.text_body} type="body">
                    NFT Marketplace- Quickly transfer real estate ownership
                  </Text>
                </List>
                <List>
                  <Text color={colors.text_body} type="body">
                    VR & AR - Experience superficial real estate
                  </Text>
                </List>
                <List>
                  <Text color={colors.text_body} type="body">
                    Blockchain - Ensure transparency and ownership
                  </Text>
                </List>
                <List>
                  <Text color={colors.text_body} type="body">
                    Artificial Intelligence - Integrate AI into VR AR in the
                    future
                  </Text>
                </List>
              </ul>
              <img src={universe_img} alt="meta365" width="100%" />
            </MobileWrapper>
          </div>
        </UniverseWrapper>
      </Wrapper>
    </>
  );
};

export default Universe;
