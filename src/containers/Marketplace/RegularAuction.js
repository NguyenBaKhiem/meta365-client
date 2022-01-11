import React, { useContext, useEffect } from "react";
import moment from "moment";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";

import {
  Flex,
  MarketGrid,
  TextHeader,
  AlignCenter,
  InfoDetailList,
  InfoHeader,
  InfoDetail,
  TagCode,
  NoData,
} from "./StyledMarketplace";
import { colors } from "@Theme/colors";
import location from "@Assets/images/location.png";
import { Link } from "react-router-dom";
import Card from "@Components/Card";
import Button from "@Components/Button";
import Text from "@Components/Text";
import CountDown from "./CountDown";
import LoadingCard from "../MyLand/LoadingCard";
import { MarketPlaceContext } from "./Context";
import {contract} from "@Utils/contract";

const RegularAuction = ({ data = [] }) => {
  const { marketPlace, setMarketPlace } = useContext(MarketPlaceContext);

  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() == data.unit) return "BUSD";
      else return "UCC";
    }
  };
  return (
    <>
      {data.length > 0 ? (
        <>
          <MarketGrid>
            {data &&
              data.map((item, index) => {
                return (
                  <Card image={item.thumbnail} key={index}>
                    <TagCode>#{item.rank}</TagCode>
                    <InfoHeader>
                      <Text type={"body2"} color={colors.text_header}>
                        {`${item.landCode}-${item._id}`}
                      </Text>
                      <Text style={{margin:"0px"}} type={"body1"} color={colors.accent}>
                        {item.currentMarketPrice} {CheckTypePrice(item)}
                      </Text>
                    </InfoHeader>
                    <InfoDetail>
                      <Text type={"body1"} color={colors.text_body}>
                        Direction
                      </Text>
                      <Text type={"body1"} color={colors.text_header}>
                        {item.direction}
                      </Text>
                    </InfoDetail>
                    <InfoDetail>
                      <Text type={"body1"} color={colors.text_body}>
                        Area
                      </Text>
                      <Text type={"body1"} color={colors.text_header}>
                        {item.squares}
                      </Text>
                    </InfoDetail>
                    <InfoDetail>
                      <Text type={"body1"} color={colors.text_body}>
                        Count down
                      </Text>
                      <Text type={"body1"} color={colors.accent}>
                        <CountDown timeTillDate={item.endedSale} />
                      </Text>
                    </InfoDetail>
                    <div style={{ marginTop: "20px" }}>
                      <Link to={`/detail/${item.id}`}>
                        <Button
                          width={"100%"}
                          color={colors.new_button}
                          onClick={() => {
                            setMarketPlace(item);
                            localStorage.setItem(
                              "marketPlace",
                              JSON.stringify(item)
                            );
                          }}
                        >
                          DETAILS
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
          </MarketGrid>
        </>
      ) : (
        <NoData>
          <Text color={colors.text_header} type="button">
            No items to display
          </Text>
        </NoData>
      )}
    </>
  );
};

export default RegularAuction;
