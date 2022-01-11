import Binance from "@Assets/images/Binance.png";
import FBC from "@Assets/images/FBC.png";
import FGI from "@Assets/images/FGI.png";
import holding from "@Assets/images/holding.png";
import HUB from "@Assets/images/HUB.png";
import holdings from "@Assets/images/hung-vuong-holdings.png";
import metamask from "@Assets/images/metamask.png";
import next_slide from "@Assets/images/next-slide.png";
import prev_slide from "@Assets/images/prev-slide.png";
import trust_wallet from "@Assets/images/trust-wallet.png";
import VR_360 from "@Assets/images/VR-360-Plus.png";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React from "react";
import { useMedia } from "react-use";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";



const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;
const TextCenter = styled.div`
  text-align: center;
`;
const Logo = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  place-items:center;
  width: 100%;

  }
`;
const LogoImg = styled.img`
@media ${breakpoints.sm} {
    width: 80%;
  }
`;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style, display: "" }}
      onClick={onClick}
      src={next_slide}
      alt="next"
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style }}
      onClick={onClick}
      src={prev_slide}
      alt="next"
    />
  );
};
const Support = () => {
  return (
    <ContainerWrapper>
      <div className="container">
        <TextCenter>
          <Text color={colors.text_header} type={"header3"}>
            Supported By
          </Text>
        </TextCenter>

        <Logo>
            <LogoImg src={HUB} alt="logo" />
            <LogoImg src={holdings} alt="logo" />
            <LogoImg src={holding} alt="logo" />
            <LogoImg src={FGI} alt="logo" />
            <LogoImg src={FBC} alt="logo" />
            <LogoImg src={VR_360} alt="logo" />
            <LogoImg src={Binance} alt="logo" />
            <LogoImg src={metamask} alt="logo" />
            <LogoImg src={trust_wallet} alt="logo" />
        </Logo>
      </div>
    </ContainerWrapper>
  );
};

export default Support;
