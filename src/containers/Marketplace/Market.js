import Button from "@Components/Button";
import Card from "@Components/Card";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { OffSale, OnSale } from "../MyLand/Card/style";
import {
  InfoDetail,
  InfoHeader,
  MarketGrid, SelectOffer, TagCode
} from "./StyledMarketplace";

const Select = (props) => {
  const [active, setActive] = useState(false);
  const { selectedItem, handleSelectItem, data } = props;
  useEffect(() => {
    if (selectedItem.length === 0) return setActive(false);
    for (let item of selectedItem) {
      setActive(false);
      if (item.id === data.id) {
        setActive(true);
        break;
      }
    }
  }, [selectedItem]);
  return (
    <SelectOffer
      active={active}
      onClick={() => {
        handleSelectItem(data,
          !active
        );
      }}
    ></SelectOffer>
  );
};

const MarketList = ({ data = [], ...props }) => {
  const { selectedItem, handleSelectItem, type } = props;
  const account = useSelector(state => state.account)
  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() === data.unit) return "BUSD";
      else return "UCC";
    }
  };

  return (
    <>
      <MarketGrid>
        {data &&
          data.map((item, index) => {
            return (
              <Card image={item.images[0]} key={index}>
                {(
                  // type === "auction" ||
                  type === "marketSale" ||
                  type === "reverseAuction") && (account.address !== item.owner) && (
                  <Select
                    selectedItem={selectedItem}
                    data={item}
                    handleSelectItem={handleSelectItem}
                  />
                )}
                <TagCode>{item.rank}</TagCode>
                {item.type !== "holding" ? (
                  <OnSale>
                    <span>ONSALE</span>
                  </OnSale>
                ):<OffSale><span>OFFSALE</span></OffSale>}
                <InfoHeader>
                  <Text type={"body2"} color={colors.text_header}>
                    {`${item.landCode}-${item._id}`}
                  </Text>
                  <Text style={{margin:"0px"}} type={"body1"} color={colors.accent}>
                    {item.type !== "holding"
                      ? item.currentMarketPrice + " " + CheckTypePrice(item)
                      : ""}
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
                <InfoDetail style={{ marginBottom: "6px" }}>
                  <Text type={"body1"} color={colors.text_body}>
                    Area
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {item.squares}
                  </Text>
                </InfoDetail>
                <Link to={`/detail/${item.id}`} key={index}>
                  <Button
                    width={"100%"}
                    style={{ marginTop: "20px" }}
                    color={colors.new_button}
                  >
                    DETAILS
                  </Button>
                </Link>
              </Card>
            );
          })}
      </MarketGrid>
    </>
  );
};

export default MarketList;
