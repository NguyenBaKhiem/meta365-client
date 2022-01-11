import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  Amount,
  InfoDetail,
  InfoHeader,
  MarketGrid,
  TagCode,
} from "./StyledMarketplace";
import Card from "@Components/Card";
import house from "@Assets/images/house.png";
import star from "@Assets/images/star.png";
import Button from "@Components/Button";
import { colors } from "@Theme/colors";

const MarketLand = (data) => {
  const [landData, setLandData] = useState(null);

  useEffect(() => {
    setLandData(data)
  }, [data]);

  return (
    <>
      <MarketGrid>
        {landData &&
          landData.map((item, index) => {
            return (
              <Card image={item.thumbnail}>
                <InfoHeader>
                  <Text type={"button"} color={colors.text_header}>
                    {`${item.landCode}`}
                  </Text>
                  <Amount>
                    <Text type={"body2"} color={colors.accent}>
                      {item.numOfNft + "NFT"}
                    </Text>
                  </Amount>
                </InfoHeader>
                <InfoDetail>
                  <Text type={"body2"} color={colors.sub_text}>
                    Price
                  </Text>
                  <Text type={"body2"} color={colors.text}>
                    {item.price}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body2"} color={colors.sub_text}>
                    Project
                  </Text>
                  <Text type={"body2"} color={colors.text}>
                    {item.projectName}
                  </Text>
                </InfoDetail>
                {/* <InfoDetail style={{ marginBottom: "6px" }}>
                  <Text type={"body2"} color={colors.text}>
                    Voting starts in
                  </Text>
                  <AlignCenter>
                    <img src={star} alt="star" />
                    <Text type={"body2"} color={colors.secondary}>
                    23:21:56
                    </Text>
                  </AlignCenter>
                </InfoDetail> */}
                <Button
                  width={"100%"}
                  style={{ marginTop: "20px" }}
                  color={colors.new_button}
                    onClick={() => props.showLandDetail(item.landCode)}
                >
                  SHOW NFTS
                </Button>
              </Card>
            );
          })}
      </MarketGrid>
    </>
  );
};

export default MarketLand;
