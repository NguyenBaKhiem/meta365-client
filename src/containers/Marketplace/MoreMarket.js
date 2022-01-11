import Button from "@Components/Button";
import Card from "@Components/Card";
import Text from "@Components/Text";
import { marketplaceServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useMedia } from "react-use";
import CountDown from "./CountDown";
import {
  ButtonShowMore, DetailHeader, InfoDetail, InfoHeader, MarketGridDetailScroll, TagCode
} from "./StyledMarketplace";

const MoreMarket = ({ data }) => {
  const belowSM = useMedia(breakpoints.sm);
  const marketSaleType = useSelector((state) => state.market.saleType);
  const [marketData, setMarketData] = useState([]);
  const land = useSelector((state) => state.land);

  const fetchMarketplace = (filter = {}) => {
    marketplaceServices
      .getMarketPlaceAll({
        chainId: 97,
        limit: 4,
        landId: land.landId,
        ...filter,
      })
      .then((res) => {
        setMarketData(res.results);
      });
  };
  useEffect(() => {
    if (data) {
      fetchMarketplace({ types: data.type });
    }
    return () => {
      setMarketData([]);
    };
  }, [data]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <DetailHeader>
      <div style={{ marginBottom: "10px" }}>
        <Text type={"header2"} color={colors.text_header}>
          More From This Collection
        </Text>
      </div>
      {belowSM && (
        <Slider {...settings}>
          {marketData &&
            marketData.map((item, index) => {
              return (
                <Card image={item.thumbnail} key={index}>
                  <TagCode>{item.rank}</TagCode>
                  <InfoHeader>
                    <Text type={"body2"} color={colors.text_header}>
                      {`${item.landCode}-${item.id}`}
                    </Text>
                    <Text type={"body1"} color={colors.accent}>
                      {item.currentMarketPrice + " UCC"}
                    </Text>
                  </InfoHeader>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Direction
                    </Text>
                    <Text type={"body1"} color={colors.text_body}>
                      {item.direction}
                    </Text>
                  </InfoDetail>
                  <InfoDetail style={{ marginBottom: "6px" }}>
                    <Text type={"body1"} color={colors.text_body}>
                      Area
                    </Text>
                    <Text type={"body1"} color={colors.text_body}>
                      {item.squares}
                    </Text>
                  </InfoDetail>
                  {marketSaleType === "reverse-auction" ||
                    (marketSaleType === "auction" && (
                      <InfoDetail>
                        <Text type={"body1"} color={colors.text_body}>
                          Count down
                        </Text>
                        <Text type={"body1"} color={colors.accent}>
                          <CountDown timeTillDate={item.endedSale} />
                        </Text>
                      </InfoDetail>
                    ))}

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
        </Slider>
      )}

      <MarketGridDetailScroll>
        {marketData &&
          marketData.map((item, index) => {
            return (
              <Card image={item.thumbnail} key={index}>
                <TagCode>{item.rank}</TagCode>
                <InfoHeader>
                  <Text type={"body2"} color={colors.text_header}>
                    {`${item.landCode}-${item.id}`}
                  </Text>
                  <Text type={"body1"} color={colors.accent}>
                    {item.currentMarketPrice + " UCC"}
                  </Text>
                </InfoHeader>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Direction
                  </Text>
                  <Text type={"body1"} color={colors.text_body}>
                    {item.direction}
                  </Text>
                </InfoDetail>
                <InfoDetail style={{ marginBottom: "6px" }}>
                  <Text type={"body1"} color={colors.text_body}>
                    Area
                  </Text>
                  <Text type={"body1"} color={colors.text_body}>
                    {item.squares}
                  </Text>
                </InfoDetail>
                {marketSaleType === "reverse-auction" ||
                  (marketSaleType === "auction" && (
                    <InfoDetail>
                      <Text type={"body1"} color={colors.text_body}>
                        Count down
                      </Text>
                      <Text type={"body1"} color={colors.accent}>
                        <CountDown timeTillDate={item.endedSale} />
                      </Text>
                    </InfoDetail>
                  ))}

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
      </MarketGridDetailScroll>
      <Link to="/marketplace">
        <ButtonShowMore>
          <Button width={"100%"} color={colors.new_button}>
            SHOW MORE
          </Button>
        </ButtonShowMore>
      </Link>
    </DetailHeader>
  );
};
export default MoreMarket;
