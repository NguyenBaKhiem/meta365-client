import React, { useEffect } from "react";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import breakpoints from "@Theme/breakpoints";
import styled from "styled-components";
import glass from "@Assets/images/glass.png";
import vr1 from "@Assets/images/vr1.png";
import vr2 from "@Assets/images/vr2.png";
import vr3 from "@Assets/images/vr3.png";
import vr4 from "@Assets/images/vr4.png";
import vr5 from "@Assets/images/vr5.png";
import vr6 from "@Assets/images/vr6.png";
import vr7 from "@Assets/images/vr7.png";

const VRWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 140px 0;
  @media ${breakpoints.sm}{
    margin: 80px 0;
  }
`;
const Center = styled.div`
  display: flex;
  justify-content: center;
  @media ${breakpoints.sm}{
    text-align: center;
  }
`;
const CircleBox = styled.div`
  width: 800px;
  height: 800px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  @media ${breakpoints.sm} {
    width: 300px;
    height: 300px;
  }
`;
const CircleWrapper = styled.div`
  width: 400px;
  height: 800px;
  position: absolute;
  top: 0;
  overflow: hidden;
  @media ${breakpoints.sm} {
    width: 150px;
    height: 300px;
  }
`;
const CirclerWrapperRight = styled(CircleWrapper)`
  right: 0;
`;
const CirclerWrapperLeft = styled(CircleWrapper)`
  left: 0;
`;
const CircleWhole = styled.div`
  width: 798px;
  height: 798px;
  border: 2px solid transparent;
  border-radius: 50%;
  position: absolute;
  top: 0;
  transform: rotate(-135deg);
  @media ${breakpoints.sm} {
    width: 298px;
    height: 298px;
  }
`;
const CircleRight = styled(CircleWhole)`
  border-top: 2px solid teal;
  border-right: 2px solid teal;
  right: 1px;
  /* animation: circleRight 5s linear forwards; */
  animation: none;
  @keyframes circleRight {
    0% {
      transform: rotate(-135deg);
    }
    50%,
    100% {
      transform: rotate(45deg);
    }
  }
`;
const CircleLeft = styled(CircleWhole)`
  border-bottom: 2px solid teal;
  border-left: 2px solid teal;
  left: 1px;
  animation: circleLeft 5s linear forwards;
  @keyframes circleLeft {
    0%,
    50% {
      transform: rotate(-135deg);
    }
    100% {
      -webkit-transform: rotate(45deg);
    }
  }
`;

const CircleBoxSmall = styled(CircleBox)`
  width: 500px;
  height: 500px;
  @media ${breakpoints.sm} {
    width: 180px;
    height: 180px;
  }
`;
const CircleWrapperSmall = styled(CircleWrapper)`
  width: 250px;
  height: 500px;
  @media ${breakpoints.sm} {
    width: 90px;
    height: 180px;
  }
`;
const CirclerWrapperRightSmall = styled(CircleWrapperSmall)`
  right: 0;
`;
const CirclerWrapperLeftSmall = styled(CircleWrapperSmall)`
  left: 0;
`;
const CircleRightSmall = styled(CircleRight)`
  width: 498px;
  height: 498px;
  @media ${breakpoints.sm} {
    width: 178px;
    height: 178px;
  }
`;
const CircleLeftSmall = styled(CircleLeft)`
  width: 498px;
  height: 498px;
  @media ${breakpoints.sm} {
    width: 178px;
    height: 178px;
  }
`;
const ContentBox = styled.div`
  background-color: ${colors.second_bg};
  border: 1px solid #00b67f;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 16px;
  width: 310px;
  position: absolute;
  top: 5px;
  left: 120%;
  opacity: 0;
  transition: 1s;
  @media ${breakpoints.sm}{
    display: none;
  }
  p {
    margin: 0;
  }
`;
const VRImageWrapper = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  display: block;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${colors.accent};
  cursor: pointer;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: none;
  opacity: 0;
  @media ${breakpoints.sm} {
    width: 23px;
    height: 23px;
  }
  &:hover {
    opacity: 1;
    animation: pulse 1s infinite !important;
  }
  &:hover {
    .content-box {
      opacity: 1;
    }
  }
  img {
    @media ${breakpoints.sm} {
      width: 23px;
      height: 23px;
    }
  }
  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 rgba(0, 182, 127, 0.4);
    }
    70% {
      -webkit-box-shadow: 0 0 0 20px rgba(0, 182, 127, 0);
    }
    100% {
      -webkit-box-shadow: 0 0 0 0 rgba(0, 182, 127, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(0, 182, 127, 0.4);
      box-shadow: 0 0 0 0 rgba(0, 182, 127, 0.4);
    }
    70% {
      -moz-box-shadow: 0 0 0 20px rgba(0, 182, 127, 0);
      box-shadow: 0 0 0 20px rgba(0, 182, 127, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(0, 182, 127, 0);
      box-shadow: 0 0 0 0 rgba(0, 182, 127, 0);
    }
  }
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const VRImageWrapper1 = styled(VRImageWrapper)`
  top: 15%;
  left: 3%;
  .content-box{
    top: -6px;
    left: -330px;
  }
`;
const VRImageWrapper2 = styled(VRImageWrapper)`
  top: 25%;
  left: 90%;
`;
const VRImageWrapper3 = styled(VRImageWrapper)`
  top: 92%;
  left: 44%;
  .content-box{
    top: -8px;
  }
`;
const VRImageWrapperLarge = styled(VRImageWrapper)`
  width: 98px;
  height: 98px;
  @media ${breakpoints.sm} {
    width: 35px;
    height: 35px;
  }
  img {
    @media ${breakpoints.sm} {
      width: 35px;
      height: 35px;
    }
  }
`;
const VRImageWrapper4 = styled(VRImageWrapperLarge)`
  top: -6%;
  left: 45%;
  .content-box{
    top: 22px;
  }
`;
const VRImageWrapper5 = styled(VRImageWrapperLarge)`
  top: 53%;
  left: 92%;
`;
const VRImageWrapper6 = styled(VRImageWrapperLarge)`
  top: 86%;
  left: 19%;
  .content-box{
    top: 23px;
    left: -330px;
  }
`;
const VRImageWrapper7 = styled(VRImageWrapperLarge)`
  top: 45%;
  left: -5%;
  .content-box{
    top: 23px;
    left: -330px;
  }
`;
const GlassImg = styled.img`
  @media ${breakpoints.sm}{
    width: 74px;
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
    top: -11px;
    left: -15px;
  }
`;
const ContentMobile = styled.div`
  display: none;
  @media ${breakpoints.sm} {
    display: block;
  }
`;

const VRExperience = () => {
  useEffect(() => {
    document.addEventListener("scroll", function () {
      let pageTop = document.documentElement.scrollTop;
      let pageBottom = pageTop + window.innerHeight;
      let tab = document.querySelector(".vr-tab");
  
      if (tab && tab.offsetTop < pageBottom) {
  
        let circleSmallRight = document.querySelector(".circle-small-right");
        let circleSmallLeft = document.querySelector(".circle-small-left");
        circleSmallRight.style.animation = "circleRight 2s linear forwards";
        circleSmallLeft.style.animation = "circleLeft 2s linear forwards";
  
        let smallVR = document.querySelectorAll(".vr-small");
        smallVR[0].style.animation = `fadein 1s 2s linear forwards`;
        smallVR[1].style.animation = `fadein 1s 2.3s linear forwards`;
        smallVR[2].style.animation = `fadein 1s 2.6s linear forwards`;
        setTimeout(() => {
          for (let item of smallVR) {
            item.style.opacity = "1";
          }
        }, 3000);
  
        let circleRight = document.querySelector(".circle-right");
        let circleLeft = document.querySelector(".circle-left");
        circleRight.style.animation = "circleRight 2s 3s linear forwards";
        circleLeft.style.animation = "circleLeft 2s 3s linear forwards";
  
        let largeVR = document.querySelectorAll(".vr-large");
        largeVR[0].style.animation = `fadein 1s 5s linear forwards`;
        largeVR[1].style.animation = `fadein 1s 5.3s linear forwards`;
        largeVR[2].style.animation = `fadein 1s 5.6s linear forwards`;
        largeVR[3].style.animation = `fadein 1s 5.9s linear forwards`;
        setTimeout(() => {
          for (let item of largeVR) {
            item.style.opacity = "1";
          }
        }, 6000);
        largeVR[0].style.animation = `pulse 1s 6s infinite`;
      }
    });
    return () => {
      document.removeEventListener("scroll", function () {});
    }
  }, [])
  
  return (
    <>
      <VRWrapper>
        <div className="container">
          <Center>
            <Text color={colors.text_header} type="header3">
              VR/AR experience when purchasing NFT real estate
            </Text>
          </Center>
          <Center>
            <CircleBox>
              <CirclerWrapperRight>
                <CircleRight className="circle-right" />
              </CirclerWrapperRight>
              <VRImageWrapper4 className="vr-large show">
                <img src={vr4} alt="meta365" />
                <ContentBox className="content-box show">
                  <Text color={colors.text_body} type="body">
                    Vibrant and authentic experience
                  </Text>
                </ContentBox>
              </VRImageWrapper4>
              <VRImageWrapper5 className="vr-large show">
                <img src={vr5} alt="meta365" />
                <ContentBox className="content-box show">
                  <Text color={colors.text_body} type="body">
                    Reliable and exact images of the real world
                  </Text>
                </ContentBox>
              </VRImageWrapper5>
              <VRImageWrapper6 className="vr-large show">
                <img src={vr6} alt="meta365" />
                <ContentBox className="content-box show">
                  <Text color={colors.text_body} type="body">
                    Unique, iconic and cannot be copied
                  </Text>
                </ContentBox>
              </VRImageWrapper6>
              <VRImageWrapper7 className="vr-large show">
                <img src={vr7} alt="meta365" />
                <ContentBox className="content-box show">
                  <Text color={colors.text_body} type="body">
                    Live feature through Live Camera
                  </Text>
                </ContentBox>
              </VRImageWrapper7>
              <CircleBoxSmall>
                <CirclerWrapperRightSmall>
                  <CircleRightSmall className="circle-small-right" />
                </CirclerWrapperRightSmall>
                <VRImageWrapper1 className="vr-small show">
                  <img src={vr1} alt="meta365" />
                  <ContentBox className="content-box show">
                    <Text color={colors.text_body} type="body">
                      Encourage curiosity of potential buyers
                    </Text>
                  </ContentBox>
                </VRImageWrapper1>
                <VRImageWrapper2 className="vr-small show">
                  <img src={vr2} alt="meta365" />
                  <ContentBox className="content-box show">
                    <Text color={colors.text_body} type="body">
                      Prioritize user experience
                    </Text>
                  </ContentBox>
                </VRImageWrapper2>
                <VRImageWrapper3 className="vr-small show">
                  <img src={vr3} alt="meta365" />
                  <ContentBox className="content-box show">
                    <Text color={colors.text_body} type="body">
                      Users can find information by themselves
                    </Text>
                  </ContentBox>
                </VRImageWrapper3>
                <GlassImg src={glass} alt="glass" />
                <CirclerWrapperLeftSmall>
                  <CircleLeftSmall className="circle-small-left" />
                </CirclerWrapperLeftSmall>
              </CircleBoxSmall>
              <CirclerWrapperLeft>
                <CircleLeft className="circle-left" />
              </CirclerWrapperLeft>
            </CircleBox>
          </Center>
          <ContentMobile>
            <ul>
              <List>Vibrant and authentic experience</List>
              <List>Reliable and exact images of the real world</List>
              <List>Unique, iconic and cannot be copied</List>
              <List>Live feature through Live Camera</List>
              <List>Encourage curiosity of potential buyers</List>
              <List>Prioritize user experience</List>
              <List>Users can find information by themselves</List>
            </ul>
          </ContentMobile>
        </div>
        <div className="vr-tab" ></div>
      </VRWrapper>
    </>
  );
};

export default VRExperience;
