import Button from "@Components/Button";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { colors } from "@Theme/colors";
import { contract } from "@Utils/contract";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountDown from "./CountDown";
import {
  InfoDetailEnd, OfferButtonGroup, SendButton, WrapperButton
} from "./StyledMarketplace";

export default function DetailsAuction({ ...props }) {
  const {
    land,
    type,
    isOwner,
    hasOffer,
    showModal,
    setShowModal,
    setShowSellModal,
    setIsUpdate,
  } = props;
  const account = useSelector((state) => state.account);
  const [allowance, setAllowance] = useState(0);
  const isLogin = useSelector((state) => state.account.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() === data.unit) return "BUSD";
      else return "UCC";
    }
  };
  useEffect(async () => {
    setAllowance(await contract.checkAllowance(account.address));
  }, []);
  const handleApprove = async () => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    dispatch(loading());
    contract
      .approveBUSD()
      .then(() => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Approve BUSD successfully"));
        setAllowance(1);
      })
      .catch((err) => {
        dispatch(unloading());
        dispatch(showNotificationError(err.message));
        console.log(err);
      });
  };
  const handleBuy = async () => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    dispatch(loading());
    contract
      .buyNFT(land.id)
      .then(() => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Transaction success"));
        navigate("/marketplace");
      })
      .catch((error) => {
        dispatch(unloading());
        console.log(error);
        dispatch(showNotificationError(error.data.message));
      });
  };
  const handleBid = () => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    dispatch(loading());
    contract
      .buyNFT(land.id)
      .then(() => {
        // Transaction successful
        dispatch(unloading());
        dispatch(showNotificationSuccess("Transaction success"));
        navigate("/marketplace");
      })
      .catch((error) => {
        console.log(error);
        dispatch(unloading());
        dispatch(showNotificationError(error.message));
      });
  };
  return (
    <>
      {(type === "auction" || type === "reverseAuction") && (
        <>
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
              <CountDown timeTillDate={land ? land.endedSale : ""} />
            </Text>
            <Text type={"header2"} color={colors.accent}>
              {land ? land.currentMarketPrice : ""} {CheckTypePrice(land)}
            </Text>
          </InfoDetailEnd>
        </>
      )}
      {type === "marketSale" && (
        <>
          <InfoDetailEnd>
            <Text type={"header2"} color={colors.text_header}>
              Current Market Value
            </Text>
            <Text type={"header3"} color={colors.accent}>
              {land ? land.currentMarketPrice : ""} {CheckTypePrice(land)}
            </Text>
          </InfoDetailEnd>
        </>
      )}
      {isOwner ? (
        <>
          {type === "holding" ? (
            <SendButton>
              <Button
                width={"100%"}
                color={colors.new_button}
                onClick={() => setShowSellModal(true)}
              >
                <Text type={"button"} color={colors.text_header}>
                  Sell Now
                </Text>
              </Button>
            </SendButton>
          ) : (
            <SendButton>
              <Button
                width={"100%"}
                color={colors.new_button}
                onClick={() => {
                  setShowSellModal(true);
                  setIsUpdate(true);
                }}
              >
                <Text type={"button"} color={colors.text_header}>
                  Update Sale
                </Text>
              </Button>
            </SendButton>
          )}
        </>
      ) : (
        <>
          {type === "auction" && (
            <>
              <SendButton>
                {!hasOffer ? (
                  <Button
                    width={"100%"}
                    color={colors.new_button}
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                  >
                    <Text type={"button"} color={colors.text_header}>
                      OFFER
                    </Text>
                  </Button>
                ) : (
                  <>
                    <OfferButtonGroup>
                      <Button
                        width={"100%"}
                        color={colors.new_button}
                        onClick={() => {
                          setShowModal(!showModal);
                        }}
                      >
                        <Text type={"button"} color={colors.text_header}>
                          UPDATE OFFER
                        </Text>
                      </Button>
                    </OfferButtonGroup>
                  </>
                )}
              </SendButton>
            </>
          )}
          {type === "reverseAuction" && (
            <>
              <SendButton>
                <Button
                  width={"100%"}
                  color={colors.new_button}
                  onClick={handleBid}
                >
                  <Text type={"button"} color={colors.text_header}>
                    BID NOW
                  </Text>
                </Button>
              </SendButton>
            </>
          )}
          {type === "marketSale" && (
            <>
              <SendButton>
                {land && CheckTypePrice(land) === "BUSD" ? (
                  <WrapperButton>
                    <Button
                      width={"50%"}
                      color={colors.new_button}
                      onClick={handleApprove}
                      disabled={allowance}
                    >
                      <Text type={"button"} color={colors.text_header}>
                        Approve
                      </Text>
                    </Button>
                    <Button
                      width={"50%"}
                      color={colors.new_button}
                      onClick={handleBuy}
                      disabled={!allowance}
                    >
                      <Text type={"button"} color={colors.text_header}>
                        Buy Now
                      </Text>
                    </Button>
                  </WrapperButton>
                ) : (
                  <Button
                    width={"100%"}
                    color={colors.new_button}
                    onClick={handleBuy}
                  >
                    <Text type={"button"} color={colors.text_header}>
                      Buy Now
                    </Text>
                  </Button>
                )}
              </SendButton>
            </>
          )}
        </>
      )}
    </>
  );
}
