import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMedia } from "react-use";
// import Button from "@Components/Button";
import Table from "@Components/Table";
import Text from "@Components/Text";
import sort_icon from "@Assets/images/sort-price.png";
import breakpoints from "@Theme/breakpoints";
import {
  AlignCenter,
  Background,
  DetailImg,
  Flex,
  Icon,
  IconGroup,
  InfoDetail,
  InputGroup,
  MyLandDetailWrapper,
  MyLandLayout,
  Navigation,
  SendButton,
  StyledInput,
  TableCover,
  Button,
  Token,
  FlexStart,
  Badge,
  HeaderDetail,
} from "../StyledMyLand";
import house from "@Assets/images/house.png";
import eye from "@Assets/images/eye.png";
import location from "@Assets/images/location.png";
import { colors } from "@Theme/colors";
import { nftServices } from "@Services/nftServices";
import { marketplaceServices } from "@Services/marketplaceServices";
import { contract } from "@Utils/contract";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { loading, unloading } from "@Redux/actions/loading";

import user_tick from "@Assets/images/user-tick.png";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
  showNotificationWarning,
} from "@Redux/actions/notification";
import ModelSell from "../ModalSell";
import {
  CountdownDiv,
  CountDownTime,
  FlexCountdown,
  WrapCountdown,
  FlexMarketDetailVoting,
  MarketplaceWrapper,
  SwapSlide,
  Slide,
  LogoImg,
  View,
  FlexTitle,
  TagCodeDetail,
  InfoDetailHeader,
  FlexMarketDetailWrap,
  FlexMarketDetail,
  Border,
  OfferButtonGroup,
  MarketDetailWrapper,
  MarketLayout,
  InfoDetailEnd,
} from "../../Marketplace/StyledMarketplace";
import InfoDetails from "../../Marketplace/InfoDetails";
import TableActivity from "../../Marketplace/TableActivity";
import MoreMarket from "../../Marketplace/MoreMarket";
import MoreMyLand from "../MoreMyLand";
import { getItem } from "localforage";
import TableOffer from "../TableOffer";
import VotingModal from "../../Marketplace/VotingModal";
import Slider from "react-slick";
import view_360 from "@Assets/images/360-view.png";
import CountDown from "../../Marketplace/CountDown";
import RegularRule from "../../Marketplace/RegularRule";
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style, display: "" }}
      onClick={onClick}
      src={next_slide}
      alt="next"
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style }}
      onClick={onClick}
      src={prev_slide}
      alt="next"
    />
  );
};
const MyLandDetail = () => {
  const belowSM = useMedia(breakpoints.sm);
  const { pathname } = useLocation();
  const { detailId } = useParams();
  const [land, setLand] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activity, setActivity] = useState([]);
  const dispatch = useDispatch();
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();
  const marketSaleType = useSelector((state) => state.market.saleType);
  const [marketSaleTypes, setMarketSaleTypes] = useState("");
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [nftIdActivity, setNftIdActivity ] =useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const isLogin = useSelector((state) => state.account.isLogin);
  const userAddress = useSelector((state) => state.account.address);
  
  if (!isLogin) {
    navigate("/no-data");
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const tableFields = ["From", "To", "Price", "Date"];
  const nftId = useParams();
  const [tableData, setTableData] = useState([
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: 120,
      date: "9 days ago",
    },
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: 120,
      date: "9 days ago",
    },
  ]);

  // const getNFTActivity = (id) => {
  //   let filter ={
  //     sortBy:"timestamp:desc"
  //   }
  //   setLoading(true);
  //   nftServices
  //     .getNFTActivityFilter(id,filter)
  //     .then((res) => {
  //       setActivity(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <MarketDetailWrapper>
        <div className="container">
          <Text type={"body"} color={colors.accent}>
            My-Land/
            <span style={{ color: `${colors.text_body}` }}>
              {land ? land.landCode : ""}
            </span>
          </Text>
          <MarketLayout>
            <div>
              <SwapSlide>
                <Slide>
                  <Slider {...settings}>
                    {land &&
                      land.images &&
                      land.images.map((img, i) => {
                        return (
                          <div key={i}>
                            <LogoImg src={img} />
                          </div>
                        );
                      })}
                  </Slider>
                </Slide>
              </SwapSlide>
            </div>
            <div>
              <InfoDetailHeader>
                <FlexTitle>
                  <Text type={"header2"} color={colors.text_header}>
                    {land ? land.landCode : ""}
                  </Text>
                  <TagCodeDetail>{land ? land.rank : ""}</TagCodeDetail>
                </FlexTitle>
              </InfoDetailHeader>
              {belowSM && (
                <WrapCountdown
                  style={{ background: "rgba(255, 255, 255, 0.1)" }}
                >
                  {" "}
                  <FlexMarketDetailVoting>
                    <Text type={"body"} color={"#2C375B"}>
                      Voting start in{" "}
                    </Text>
                    <CountDown
                      timeTillDate={land ? land.endedSale : ""}
                      timeTypeObject={true}
                    />
                  </FlexMarketDetailVoting>{" "}
                </WrapCountdown>
              )}
              <div style={{marginTop: "30px"}}>
                 <Border>
                <InfoDetail>
                  <Text type={"body"} color={"#7683B6"}>
                    Token ID
                  </Text>
                  <Text type={"body"} color={colors.text_header}>
                    {land ? land.nftId : ""}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body"} color={"#7683B6"}>
                    Address
                  </Text>
                  <AlignCenter>
                    <Text type={"body"} color={colors.text_header}>
                      {land ? land.location : ""}
                    </Text>
                  </AlignCenter>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body"} color={"#7683B6"}>
                    Original New Land Value
                  </Text>
                  <Text type={"body"} color={colors.text_header}>
                    {land ? land.originalLandPrice : ""} {"UCC"}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body"} color={"#7683B6"}>
                    Owned address
                  </Text>
                  <Text type={"body"} color={colors.text_header}>
                    {land && land.nftOwner
                      ? land.nftOwner.slice(0, 5) +
                        "..." +
                        land.nftOwner.slice(land.nftOwner.length - 5)
                      : "owned address"}
                  </Text>
                </InfoDetail>
              </Border>
              </div>
             

              {marketSaleTypes !== "auction" &&
                marketSaleTypes !== "reverse-auction" && (
                  <>
                    <InfoDetailEnd>
                      <Text type={"header2"} color={colors.text_header}>
                        Current Market Value
                      </Text>
                      <Text type={"header3"} color={colors.accent}>
                        {land ? land.currentMarketPrice : ""} {"UCC"}
                      </Text>
                    </InfoDetailEnd>

                    {!isOwner && (
                        <Button
                          width={"100%"}
                          color={colors.new_button}
                          onClick={() => setShowModal(true)}
                        >
                          <Text type={"button"} color={colors.text_header}>
                            Sell Now
                          </Text>
                        </Button>
                    )}
                  </>
                )}
             
              {belowSM && <InfoDetails data={land} />}
            </div>
          </MarketLayout>
          <MarketLayout>
            {!belowSM && <InfoDetails data={land} />}
            <TableOffer land={land} />
          </MarketLayout>
          <RegularRule />
          <TableActivity data={activity}  nftIdActivity={nftIdActivity}/>
          <MoreMarket></MoreMarket>

        </div>
        {showModal && <ModelSell onCloseModal={() => setShowModal(false)} />}
      </MarketDetailWrapper>
    </>
  );
};

export default MyLandDetail;
