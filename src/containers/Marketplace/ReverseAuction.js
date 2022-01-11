import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import { MarketContext, MarketPlaceContext } from "./Context";
import {
  MarketGrid,
  InfoDetailList,
  InfoHeader,
  InfoDetail,
  NoData,
  TagCode,
} from "./StyledMarketplace";
import { colors } from "@Theme/colors";
import location from "@Assets/images/location.png";
import { Link, useParams } from "react-router-dom";
import Card from "@Components/Card";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { contract } from "@Utils/contract";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
} from "@Redux/actions/notification";
import { marketplaceServices } from "@Services";
import CountDown from "./CountDown";
import LoadingCard from "../MyLand/LoadingCard";
import { loading, unloading } from "@Redux/actions/loading";
const ReverseAuction = ({ data = [] }) => {
  const setLocal = (data) => {
    localStorage.setItem("reverseMarket", JSON.stringify(data));
  };

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
                  <Card image={item.images[0]} key={index}>
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
                      <Link to={`/detail/${item.marketplaceId}`}>
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

export default ReverseAuction;
