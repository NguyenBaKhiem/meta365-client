import React, { useState } from "react";
import styled from "styled-components";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import team1 from "@Assets/images/team1.png";
import team2 from "@Assets/images/team2.png";
import team3 from "@Assets/images/team3.png";
import Slider from "react-slick";
import prev_slide from "@Assets/images/arrow-circle-left.png";
import next_slide from "@Assets/images/arrow-circle-right.png";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 120px 0;
  @media ${breakpoints.sm} {
    padding: 80px 0;
  }
  .slick-prev{
    left: -65px;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 64px;
`;

const PositionText = styled.p`
  font-size: 20px;
  line-height: 26px;
  font-family: Poppins;
  color: white;
  margin-bottom: 24px;
`;
const Slide = styled.div`
  width: 100%;
  @media ${breakpoints.sm} {
    display: none;
  }
`;
const MobileWrap = styled.div`
  text-align: center;
  display: none;
  @media ${breakpoints.sm} {
    display: block;
  }
`;
const TeamImg = styled.img`
  margin: 48px 0 22px 0;
  @media ${breakpoints.xs} {
    width: 100%;
  }
`;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      onClick={onClick}
      src={next_slide}
      alt="next"
      style={{...style, display: "", width: "50px", height: "50px"}}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      onClick={onClick}
      src={prev_slide}
      alt="next"
      style={{ ...style, width: "50px", height: "50px"}}
    />
  );
};
const Team = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => {
      setActiveSlide(current);
    },
  };
  return (
    <ContainerWrapper>
      <div className="container">
        <Text color={colors.text_header} type={"header3"}>
          Team
        </Text>
        <Slide>
          <Slider {...settings}>
            <div>
              <Flex>
                <div>
                  <img src={team1} alt="meta365" />
                </div>
                <div>
                  <Text color="white" type="header2">
                    Istvan Csikos
                  </Text>
                  <PositionText>CEO & Founder</PositionText>
                  <Text color="white" type="body1">
                    Very knowledgeable with OTC and startup. Tremendous
                    experience in investment banking & underwriting firms.
                  </Text>
                </div>
              </Flex>
            </div>
            <div>
              <Flex>
                <div>
                  <img src={team2} alt="meta365" />
                </div>
                <div>
                  <Text color="white" type="header2">
                    Hai Nguyen
                  </Text>
                  <PositionText>COO & Co-Founder</PositionText>
                  <Text color="white" type="body1">
                    Forbes 30 Under 30 Asia 2017. Cofounder & CFO Flyer.us,
                    Genesi Creative. TEDxRMIT Speaker 2021.
                  </Text>
                </div>
              </Flex>
            </div>
            <div>
              <Flex>
                <div>
                  <img src={team3} alt="meta365" />
                </div>
                <div>
                  <Text color="white" type="header2">
                    Duc Trinh
                  </Text>
                  <PositionText>CTO & Co-Founder</PositionText>
                  <Text color="white" type="body1">
                    R&D specialist with over 10 years of experience in applying
                    VR/AR technology to enhance life & business.
                  </Text>
                </div>
              </Flex>
            </div>
          </Slider>
        </Slide>
        <MobileWrap>
          <TeamImg src={team1} alt="meta365" />
          <div>
            <Text color="white" type="header2">
              Istvan Csikos
            </Text>
            <PositionText>CEO & Founder</PositionText>
            <Text color="white" type="body1">
              Very knowledgeable with OTC and startup. Tremendous experience in
              investment banking & underwriting firms.
            </Text>
          </div>
          <TeamImg src={team2} alt="meta365" />
          <div>
            <Text color="white" type="header2">
              Hai Nguyen
            </Text>
            <PositionText>COO & Co-Founder</PositionText>
            <Text color="white" type="body1">
              Forbes 30 Under 30 Asia 2017. Cofounder & CFO Flyer.us, Genesi
              Creative. TEDxRMIT Speaker 2021.
            </Text>
          </div>
          <TeamImg src={team3} alt="meta365" />
          <div>
            <Text color="white" type="header2">
              Duc Trinh
            </Text>
            <PositionText>CTO & Co-Founder</PositionText>
            <Text color="white" type="body1">
              R&D specialist with over 10 years of experience in applying VR/AR
              technology to enhance life & business.
            </Text>
          </div>
        </MobileWrap>
      </div>
    </ContainerWrapper>
  );
};

export default Team;
