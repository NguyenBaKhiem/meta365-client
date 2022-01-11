import feature1 from "@Assets/images/feature1.png";
import feature2 from "@Assets/images/feature2.png";
import feature3 from "@Assets/images/feature3.png";
import feature4 from "@Assets/images/feature4.png";
import Button from "@Components/Button";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React from "react";
import { Link } from "react-router-dom";
import { useMedia } from "react-use";
import styled from "styled-components";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;
const Flex = styled.div`
  display: flex;
  @media ${breakpoints.sm} {
    flex-direction: column;
    gap: 48px;
  }
`;
const Content = styled.div`
  padding-right: 80px;
  flex: 1 1 30%;
  opacity: 0;
  transform: translate(0, 100px);
  transition: all 1.5s;
  @media ${breakpoints.sm} {
    padding-right: 0px;
  }
`;
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 80px;
  grid-row-gap: 48px;
  flex: 1 1 65%;
  border: 1px solid #f5f5f5;
  border-radius: 16px;
  padding: 32px 24px;
  opacity: 0;
  transform: translate(0, 100px);
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    grid-row-gap: 32px;
  }
`;
const FeatureBox = styled.div``;
const Icon = styled.img`
  margin-bottom: 24px;
`;

const Features = () => {
  return (
    <ContainerWrapper>
      <div className="container">
        <Flex>
          <Content className="tab">
            <Text color={colors.text_header} type={"header3"}>
              Features
            </Text>
            <Text color={colors.text_body} type={"body"}>
              Metaverse, ecosystem, platform, with community appreciation,
              economy building, DeFi solutions, NFT collectibles, and a solid
              team behind it all.
            </Text>
            <Link to="/marketplace">
              <Button color={colors.new_button} width={"252px"} mobile={"full"}>
                <Text color={colors.button} type={"button"}>
                  VISIT MARKETPLACE
                </Text>
              </Button>
            </Link>
          </Content>
          <FeatureGrid className="tab" style={{ transition: "all 3s" }}>
            <FeatureBox>
              <Icon src={feature1} width="64px" />
              <Text color={colors.text_header} type={"subtitle"}>
                DEFI SOLUTIONS
              </Text>
              <Text color={colors.text_body} type={"body"}>
                Integrated with DeFi solutions (Staking, token burn, special
                allocations tokens).
              </Text>
            </FeatureBox>
            <FeatureBox>
              <Icon src={feature2} width="64px" />
              <Text color={colors.text_header} type={"subtitle"}>
                PROFIT FROM OUR PLATFORM
              </Text>
              <Text color={colors.text_body} type={"body"}>
                Profit from business activities, use the platform services, or
                create your own one!
              </Text>
            </FeatureBox>
            <FeatureBox>
              <Icon src={feature3} width="64px" />
              <Text color={colors.text_header} type={"subtitle"}>
                OWN YOUR DREAM LAND
              </Text>
              <Text color={colors.text_body} type={"body"}>
                Buy land from an exact copy of the Earth, marketplace for
                trading and selling, land NFT collectibles.
              </Text>
            </FeatureBox>
            <FeatureBox>
              <Icon src={feature4} width="64px" />
              <Text color={colors.text_header} type={"subtitle"}>
                CONNECT IN METAVERSE
              </Text>
              <Text color={colors.text_body} type={"body"}>
                Massive community building, rewards, and appreciation (for
                crypto and mainstream users).
              </Text>
            </FeatureBox>
          </FeatureGrid>
        </Flex>
      </div>
    </ContainerWrapper>
  );
};

export default Features;
