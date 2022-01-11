import React from "react";
import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import home1 from "@Assets/images/home1.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;
const FlexColumn = styled.div`
  display: flex;
  gap: 50px;
  @media ${breakpoints.sm} {
    flex-direction: column;
    gap: 8px;
  }
`;
const FlexRatio = styled.div`
  flex: 1 1 100%;
`;
const FlexCenterExperience = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  @media ${breakpoints.sm} {
    flex-direction: column-reverse;
    gap: 48px;
  }
`;
const BlockImg = styled.img`
  transition: all 2s;
  opacity: 0;
  transform: translate(0, 100px);
  width: 317px;
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
const Tab = styled.div`
  transition: all 3s;
  opacity: 0;
  transform: translate(0, 100px);
`;

const Experience = () => {

  return (
    <ContainerWrapper>
      <div className="container">
        <FlexCenterExperience>
          <BlockImg src={home1} className="tab" />
          <Tab className="tab">
            <Text color={colors.text_header} type={"header3"}>
              Experience and Expertise You Can Trust
            </Text>
            <FlexColumn>
              <FlexRatio>
                <Text color={colors.text_body} type={"body"}>
                  We envision a future of a parallel world. Countries will be
                  reconstructed in Metaverse, where real estate properties will
                  become rare and irreplaceable digital assets. The team at
                  Meta365 pioneers in the emerging NFT space and experts in all
                  existing and soon to be released Metaverse’s.
                </Text>
              </FlexRatio>
              <FlexRatio>
                <Text color={colors.text_body} type={"body"}>
                  Meta365 is committed to providing predictable and sustainable
                  distributions in this Meta365 Land while maximizing value
                  through building the foundation and developing the Metaverse
                  economy globally.
                </Text>
              </FlexRatio>
            </FlexColumn>
          </Tab>
        </FlexCenterExperience>
      </div>
    </ContainerWrapper>
  );
};

export default Experience;
