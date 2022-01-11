
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMedia } from "react-use";
import moment from "moment";
import {
  AlignCenter,
  InfoDetail,
  MarketDetailWrapper,
  MarketLayout,
  SendButton,
  TableCover,
  InfoDetailEnd,
  Border,
  ContentRegular,
  Detail,
  Slide,
  LogoImg,
  SwapSlide,
} from "./StyledMarketplace";
import eye from "@Assets/images/eye.png";
import location from "@Assets/images/location.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import Button from "@Components/Button";
import Table from "@Components/Table";
import breakpoints from "@Theme/breakpoints";
import sort_icon from "@Assets/images/sort-price.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import prev_slide from "@Assets/images/prev-slide.png";
import next_slide from "@Assets/images/next-slide.png";
import ModelTableExpand from "./ModalTableExpand";
import { contract } from "@Utils/contract";
import { marketplaceServices } from "@Services";
import { MarketContext, MarketPlaceContext } from "./Context";


import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
  showNotificationWarning,
} from "@Redux/actions/notification";
import CountDown from "./CountDown";
import { loading, unloading } from "@Redux/actions/loading";
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
const ReverseAuctionDetail = () => {
  const {marketPlace} = useContext(MarketPlaceContext)
  const belowSM = useMedia(breakpoints.sm);
  const { marketId } = useParams();
  const [land, setLand] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const isLogin = useSelector((state) => state.account.isLogin);
  const userAddress = useSelector((state) => state.account.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => {
      setActiveSlide(current);
    },
  };
  const [tableData, setTableData] = useState([
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: "120 UCC",
      date: "Dec 8, 2021, 10:36",
    },
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: "120 UCC",
      date: "Dec 8, 2021, 10:36",
    },
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: "120 UCC",
      date: "Dec 8, 2021, 10:36",
    },
  ]);
  useEffect(() => {
    console.log("lad", land)
    setLand(marketPlace);
  }, []);
  const handleBid = () => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    dispatch(loading());
    contract
      .buyNFT(land.nftId)
      .then(() => {
        // Transaction successful
        dispatch(unloading());
        dispatch(showNotificationSuccess("Transaction success"));
        navigate("/marketplace");
      })
      .catch((error) => {
        dispatch(unloading());
        dispatch(showNotificationError("Transaction failed"));
      });
  };
  return (
    <MarketDetailWrapper>
      <div className="container">
        <Text type={"body"} color={colors.accent}>
          Reverse Auction/
          <span style={{ color: `${colors.text_body}` }}>{land.landCode}</span>
        </Text>

        <MarketLayout>
          <div>
            <SwapSlide>
              <Slide>
                <Slider {...settings}>
                  {land.images &&
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
            {!belowSM && (
              <Detail>
                <Text type={"header2"} color={colors.text_header}>
                  Detail
                </Text>
                <br />
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Created
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {moment(land.landCreated).format("DD/MM/YYYY")}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Direction
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.direction}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Area
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.squares} m2
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Rate
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.rate}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Issued on
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {moment(land.ownershipCerDate).format("DD/MM/YYYY")}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Unit
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.ownershipCerProvider}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Legal document
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.legal}
                  </Text>
                </InfoDetail>
              </Detail>
            )}
          </div>
          <div>
            <InfoDetail>
              <Text type={"header2"} color={colors.text_header}>
                {land.landCode}
              </Text>
              <AlignCenter>
                <a href={`${land.media}`} className="d-flex" target="_blank">
                  <img src={eye} style={{ marginRight: "10px" }} />
                  <Text color={colors.accent} type={"button"}>
                    See on 360tour
                  </Text>
                </a>
              </AlignCenter>
            </InfoDetail>
            <AlignCenter style={{ marginBottom: "20px" }}>
              <img src={location} style={{ marginRight: "5px" }} />
              <Text type={"body1"} color={colors.text_body}>
                {land.location}
              </Text>
            </AlignCenter>
            <Border>
              <InfoDetail>
                <Text type={"body"} color={colors.text_body}>
                  Property Code
                </Text>
                <Text type={"body"} color={colors.text_header}>
                  {land.nftId}
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body"} color={colors.text_body}>
                  Original New Land Value
                </Text>
                <Text type={"body"} color={colors.text_header}>
                  {land.originalLandPrice} UCC
                </Text>
              </InfoDetail>
            </Border>
            <InfoDetailEnd>
              <Text type={"header2"} color={colors.text_header}>
                Count down
              </Text>
              <Text type={"header2"} color={colors.text_header}>
                Recent Bid
              </Text>
            </InfoDetailEnd>
            <InfoDetailEnd>
              <Text type={"header2"} color={colors.accent}>
                <CountDown timeTillDate={land.endedSale} />
              </Text>
              <Text type={"header2"} color={colors.accent}>
                {land.recentPrice} UCC
              </Text>
            </InfoDetailEnd>
            <SendButton>
              {isOwner ? (
                <Button width={"100%"} color={colors.primary} disabled>
                  <Text type={"button"} color={colors.background}>
                    OWNED
                  </Text>
                </Button>
              ) : (
                <Button
                  width={"100%"}
                  color={colors.primary}
                  onClick={handleBid}
                >
                  <Text type={"button"} color={colors.text_header}>
                    BID NOW
                  </Text>
                </Button>
              )}
            </SendButton>
            {belowSM && (
              <div>
                <Text type={"header2"} color={colors.text_header}>
                  Detail
                </Text>
                <br />
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Created
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {moment(land.landCreated).format("DD/MM/YYYY")}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Direction
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.direction}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Area
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.squares} m2
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Rate
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.rate}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Issused on
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {moment(land.ownershipCerDate).format("DD/MM/YYYY")}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Unit
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.ownershipCerProvider}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Legal document
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land.legal}
                  </Text>
                </InfoDetail>
              </div>
            )}
            {belowSM && (
              <ContentRegular>
                <Text type="header2" color={colors.text_header}>
                  Reverse Auction Rules
                </Text>
                <ul>
                  <Text color={colors.text_body} type={"body"}>
                    <li>
                      The seller puts up an item as well as sets a starting and
                      ending price for buyers in a certain period of time. At
                      the end of the auction, the item goes to whoever purchases
                      the item first.
                    </li>
                  </Text>
                  <Text color={colors.text_body} type={"body"}>
                    <li>
                      The winner of the auction will be pronounced after the
                      bidding sessions close.
                    </li>
                  </Text>
                </ul>
              </ContentRegular>
            )}
            <TableCover>
              <Table title={"Offers"}>
                <thead>
                  <tr>
                    <th>
                      <Text color={colors.text_body} type="button">
                        Address
                      </Text>
                    </th>
                    {!belowSM && (
                      <th>
                        <Text color={colors.text_body} type="button">
                          Hash
                        </Text>
                      </th>
                    )}
                    <th>
                      <AlignCenter>
                        <Text color={colors.text_body} type="button">
                          Price
                        </Text>
                        <img src={sort_icon} alt="sort" />
                      </AlignCenter>
                    </th>
                    {!belowSM && (
                      <th>
                        <Text color={colors.text_body} type="button">
                          Time
                        </Text>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody></tbody>
              </Table>
            </TableCover>
          </div>
        </MarketLayout>
        {!belowSM && (
          <ContentRegular>
            <Text type="header2" color={colors.text_header}>
              Reverse Auction Rules
            </Text>
            <ul>
              <Text color={colors.text_body} type={"body"}>
                <li>
                  The seller puts up an item as well as sets a starting and
                  ending price for buyers in a certain period of time. At the
                  end of the auction, the item goes to whoever purchases the
                  item first.
                </li>
              </Text>
              <Text color={colors.text_body} type={"body"}>
                <li>
                  The winner of the auction will be pronounced after the bidding
                  sessions close.
                </li>
              </Text>
            </ul>
          </ContentRegular>
        )}
      </div>
    </MarketDetailWrapper>
  );
};

export default ReverseAuctionDetail;
