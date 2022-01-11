import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  ContentRegular,
  TagCode,
  DetailHeader,
  MarketGridDetail,
  ButtonShowMore,
  InfoHeader,
  InfoDetail,
  MarketGridDetailScroll,
  SwapSlide,
} from "../Marketplace/StyledMarketplace";
import { colors } from "@Theme/colors";
import Card from "@Components/Card";
import Button from "@Components/Button";
import { nftServices } from "@Services/nftServices";
import { marketplaceServices } from "@Services";
import CountDown from "../Marketplace/CountDown";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import { loading, unloading } from "@Redux/actions/loading";

const MoreMyLand = () => {
  const belowSM = useMedia(breakpoints.sm);
  const marketSaleType = useSelector((state) => state.market.saleType);
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const fetchOwnedData = (filter = {}) => {
    dispatch(loading())
    nftServices
      .getOwnNFTs({limit:4})
      .then((res) => {
        setData(res.results);
        dispatch(unloading())
      })
      .catch((error) => {
        dispatch(unloading())
      });
  };
  useEffect(() => {
    fetchOwnedData()
  }, []);
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
          {data &&
            data.map((item, index) => {
              return (
                <Card image={item.thumbnail} key={index}>
                  <TagCode>{item.rank}</TagCode>
                  <InfoHeader>
                    <Text type={"body2"} color={colors.text_header}>
                      {`${item.landCode}-${item.nftId}`}
                    </Text>
                    <Text type={"body1"} color={colors.accent}>
                      {item.originalLandPrice + " UCC"}
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

                  <Link to={`/my-land/${item.id}`} key={item.id}>
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
        {data &&
          data.map((item, index) => {
            return (
              <Card image={item.thumbnail} key={index}>
                <TagCode>{item.rank}</TagCode>
                <InfoHeader>
                  <Text type={"body2"} color={colors.text_header}>
                    {`${item.landCode}-${item.nftId}`}
                  </Text>
                  <Text type={"body1"} color={colors.accent}>
                    {item.originalLandPrice + " UCC"}
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
               
                <Link to={`/my-land/${item.id}`} key={item.id}>
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
      <Link to="/my-land">
        <ButtonShowMore>
          <Button width={"100%"} color={colors.primary}>
            SHOW MORE
          </Button>
        </ButtonShowMore>
      </Link>
    </DetailHeader>
  );
};
export default MoreMyLand;
