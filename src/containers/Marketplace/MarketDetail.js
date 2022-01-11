import view_360 from "@Assets/images/360-view.png";
import location from "@Assets/images/location.png";
import next_slide from "@Assets/images/next-slide.png";
import prev_slide from "@Assets/images/prev-slide.png";
import profile from "@Assets/images/profile-2user.png";
import total from "@Assets/images/total.png";
import Text from "@Components/Text";
import { marketplaceServices } from "@Services";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";
import { useMedia } from "react-use";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ModelSell from "../MyLand/ModalSell";
import CountDown from "./CountDown";
import DetailsAuction from "./DetailsAuction";
import InfoDetails from "./InfoDetails";
import ModelMarketOffer from "./ModelMarketOffer";
import MoreMarket from "./MoreMarket";
import RegularRule from "./RegularRule";
import {
  AlignCenter,
  Border,
  FlexMarketDetail,
  FlexMarketDetailVoting,
  FlexMarketDetailWrap,
  FlexTitle,
  InfoDetail,
  InfoDetailHeader,
  LogoImg,
  MarketDetailWrapper,
  MarketLayout,
  Slide,
  SwapSlide,
  TagCodeDetail,
  View,
  WrapCountdown
} from "./StyledMarketplace";
import TableActivity from "./TableActivity";
import TableOffer from "./TableOffer";
import VotingModal from "./VotingModal";
import ConfirmModal from "./VotingModal/ConfirmModal";
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

const MarketDetail = () => {
  const belowSM = useMedia(breakpoints.sm);
  const { detailId } = useParams();
  const [land, setLand] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isSetOffer, setIsSetOffer] = useState(false);
  const account = useSelector((state) => state.account);
  const [hasOffer, setHasOffer] = useState(false);
  const [nftIdActivity, setNftIdActivity] = useState(0);
  const { pathname } = useLocation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const [tableData, setTableData] = useState([
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: "120 UCC",
      date: "Dec 8, 2021, 10:36",
    },
  ]);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const getMarketDetail = (id) => {
    marketplaceServices
      .getMarketDetail(id)
      .then((res) => {
        setLand(res);
        setNftIdActivity(res.id);
      })
      .catch((error) => {
        // navigate("/no-data");
        console.log(error);
      });
  };

  useEffect(() => {
    getMarketDetail(detailId);

  }, [detailId]);

  const isSetOfferModal = (value) => {
    setIsSetOffer(value);
    setHasOffer(true);
  };
  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() === data.unit) return "BUSD";
      else return "UCC";
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (land) {
      if (account.address === land.owner) setIsOwner(true);
      if (land.id) {
        let newTable = [];
        if (land.length) {
          for (let item of land) {
            newTable.push({
              who:
                item.buyer.slice(0, 5) +
                "..." +
                item.buyer.slice(item.buyer.length - 5),
              id:
                item.id.slice(0, 5) + "..." + item.id.slice(item.id.length - 5),
              offersPrice: item.price + CheckTypePrice(land),
              timestamp: moment(item.endedSale).format("HH:mm:ss DD/MM/YYYY"),
            });
          }
        }
        setTableData(newTable);
      }
    }
  }, [land]);
  return (
    <MarketDetailWrapper>
      <div className="container">
        <Text type={"body"} color={colors.accent}>
          Market/
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
                <View
                  onClick={() => {
                    window.open(`${land ? land.media : ""}`);
                  }}
                >
                  <img width="32" height="32" src={view_360} alt="" />
                </View>
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
              {!belowSM && land.inVoting && isOwner && (
                <FlexMarketDetailVoting
                  onClick={() => {
                    setShowVotingModal("voting");
                  }}
                >
                  <Text type={"body3"} color={"#2C375B"}>
                    Voting will be ended in
                  </Text>
                  <CountDown
                    timeTillDate={
                      land ? land.voteStartTime + land.voteDuration : ""
                    }
                    timeTypeObject={true}
                  />
                </FlexMarketDetailVoting>
              )}
            </InfoDetailHeader>

            <FlexMarketDetailWrap>
              <FlexMarketDetail>
                <AlignCenter
                  style={{ marginBottom: "20px", marginRight: "30px" }}
                >
                  <img src={profile} style={{ marginRight: "5px" }} alt="" />
                  <Text type={"body1"} color={"#7683B6"}>
                    {land && land.totalOwner} owners
                  </Text>
                </AlignCenter>
                <AlignCenter
                  style={{ marginBottom: "20px", marginRight: "30px" }}
                >
                  <img src={total} style={{ marginRight: "5px" }} alt="" />
                  <Text type={"body1"} color={"#7683B6"}>
                    {land && land.totalNft} Total
                  </Text>
                </AlignCenter>
              </FlexMarketDetail>
            </FlexMarketDetailWrap>
            {belowSM && land.inVoting && (
              <WrapCountdown style={{ background: "rgba(255, 255, 255, 0.1)" }}>
                <FlexMarketDetailVoting>
                  <Text type={"body"} color={"#2C375B"}>
                    Voting start in
                  </Text>

                  <CountDown
                    timeTillDate={
                      land ? land.voteStartTime + land.voteDuration : ""
                    }
                    timeTypeObject={true}
                  />
                </FlexMarketDetailVoting>
              </WrapCountdown>
            )}
            <Border>
              <InfoDetail>
                <Text type={"body"} color={"#7683B6"}>
                  Token ID
                </Text>
                <Text type={"body"} color={colors.text_header}>
                  {land ? land.id : ""}
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body"} color={"#7683B6"}>
                  Address
                </Text>
                <AlignCenter>
                  <img src={location} style={{ marginRight: "5px" }} alt="" />
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
                  {land ? land.originalLandPrice : ""} {CheckTypePrice(land)}
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body"} color={"#7683B6"}>
                  Owner address
                </Text>
                <Text type={"body"} color={colors.text_header}>
                  {land && land.owner
                    ? land.owner.slice(0, 5) +
                      "..." +
                      land.owner.slice(land.owner.length - 5)
                    : "owned address"}
                </Text>
              </InfoDetail>
            </Border>

            {land && (
              <DetailsAuction
                type={land.type}
                land={land}
                isOwner={isOwner}
                hasOffer={hasOffer}
                showModal={showModal}
                showSellModal={showSellModal}
                setShowModal={setShowModal}
                setShowSellModal={setShowSellModal}
                setIsUpdate={setIsUpdate}
              />
            )}
            {belowSM && <InfoDetails data={land} />}
          </div>
        </MarketLayout>
        <MarketLayout>
          {!belowSM && <InfoDetails data={land} />}
          <TableOffer land={land} setHasOffer={setHasOffer} />
        </MarketLayout>
        <RegularRule />
        <TableActivity nftIdActivity={land.id} />
        <MoreMarket data={land} />
      </div>
      {showModal && (
        <ModelMarketOffer
          onCloseModal={() => {
            setShowModal(false);
          }}
          isSetOfferModal={isSetOfferModal}
          data={land}
        />
      )}
      {showSellModal && (
        <ModelSell onCloseModal={() => setShowSellModal(false)} data={land} isUpdate={isUpdate} sellType={land.type} />
      )}
      {showVotingModal === "voting" && (
        <VotingModal onCloseModal={setShowVotingModal} data={land} />
      )}
      {showVotingModal === "agree" && (
        <ConfirmModal
          isAgree={true}
          onCloseModal={setShowVotingModal}
          data={land}
        />
      )}
      {showVotingModal === "disagree" && (
        <ConfirmModal
          isAgree={false}
          onCloseModal={setShowVotingModal}
          data={land}
        />
      )}
    </MarketDetailWrapper>
  );
};

export default MarketDetail;
