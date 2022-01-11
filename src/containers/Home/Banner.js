import banner_img_mobile from "@Assets/images/banner-home-mobile.png";
import solid from "@Assets/images/solid.png";
import banner_img from "@Assets/video/final.mp4";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoints.sm} {
    height: fit-content;
  }
`;
const BannerVideo = styled.video`
  width: 100%;
  height: calc(100vh - 105px); 
  object-fit: cover; 
  @media ${breakpoints.sm} {
    display: none;
  }
`;
const BannerImgMobile = styled.img`
  width: 100%;
  display: none;
  @media ${breakpoints.sm} {
    display: block;
  }
`;
const BannerContainer = styled.div`
  position: absolute;
  bottom: 87px;
  width: 100%;
  text-align: center;
  animation: fadein 1s linear forwards;
  animation-delay: 7s;
  opacity: 0;
  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(500px);
    }
    50% {
      opacity: 0.5;
      transform: translateY(200px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @media ${breakpoints.sm} {
    text-align: start;
    position: static;
    animation-delay: 0s;

  }
`;
const Solid = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Banner = () => {
  return (
    <>
      <BannerWrapper>
        <BannerVideo src={banner_img} type="video/mp4"  autoPlay muted loop />
        <BannerImgMobile src={banner_img_mobile} />
        <Solid src={solid} />
        <BannerContainer className="container">
          <Text color={colors.gradient_text} type={"header1"}>
          Meta365 - Quickly own your real estate in NFT with VR
          </Text>
          <Link to="land">
          </Link>
        </BannerContainer>
      </BannerWrapper>
    </>
  );
}

export default Banner;