import React from "react";
import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import Text from "@Components/Text";

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
  @media ${breakpoints.sm} {
    text-align: start;
  }
`;
const OwnerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 50px;
  grid-row-gap: 24px;
  margin-top: 48px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;
const OwnerCell = styled.div`
  background-color: ${colors.third_bg};
  padding: 16px 40px 10px 24px;
  border-radius: 16px;
  opacity: 0;
  transform: translate(0, 100px);
`;

const LandOwner = () => {
  return (
    <ContainerWrapper>
      <div className="container">
        <TextCenter>
          <Text color={colors.text_header} type={"header3"}>
            Why should own NFT real estate in Meta365?
          </Text>
          <Text color={colors.text_body} type={"body"}>
            Land owners gain all the advantages with being involved in the
            success of a major metaverse
            <br /> building project from the very beginning.
          </Text>
        </TextCenter>
        <OwnerGrid>
          <OwnerCell className="tab" style={{ transition: "all 1s" }}>
            <Text type={"subtitle"} color={colors.text_header}>
              ECONOMY BUILDING
            </Text>
            <Text type={"body"} color={colors.text_body}>
              Landowners can collect resources and generate NFTs in any way they
              want.
            </Text>
          </OwnerCell>
          <OwnerCell className="tab" style={{ transition: "all 1.5s" }}>
            <Text type={"subtitle"} color={colors.text_header}>
              EXPANDING MARKET
            </Text>
            <Text type={"body"} color={colors.text_body}>
              The number of virtual landowners is expected to rocket
              significantly in the near future.
            </Text>
          </OwnerCell>
          <OwnerCell className="tab" style={{ transition: "all 2s" }}>
            <Text type={"subtitle"} color={colors.text_header}>
              BUSINESS PLATFORM
            </Text>
            <Text type={"body"} color={colors.text_body}>
              The larger this community grows, the more businesses will be
              interested in entering this ecosystem.
            </Text>
          </OwnerCell>
          <OwnerCell className="tab" style={{ transition: "all 2.5s" }}>
            <Text type={"subtitle"} color={colors.text_header}>
              FAIR ALLOCATION
            </Text>
            <Text type={"body"} color={colors.text_body}>
              All transactions in the Meta365 ecosystem will be allocated to
              landowners.
            </Text>
          </OwnerCell>
          <OwnerCell className="tab" style={{ transition: "all 3s" }}>
            <Text type={"subtitle"} color={colors.text_header}>
              NFT COLLECTIBLES
            </Text>
            <Text type={"body"} color={colors.text_body}>
              Landowners can create their own NFT collectible portfolio.
            </Text>
          </OwnerCell>
          <OwnerCell className="tab" style={{ transition: "all 3.5s" }}>
            <Text type={"subtitle"} color={colors.text_header}>
              MARKET VALUE
            </Text>
            <Text type={"body"} color={colors.text_body}>
              The larger the community and the ecosystem grows, the more
              valuable land will become.
            </Text>
          </OwnerCell>
        </OwnerGrid>
      </div>
    </ContainerWrapper>
  );
};

export default LandOwner;
