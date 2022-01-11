import arrow_down from "@Assets/images/arrow-down-img.png";
import busd from "@Assets/images/busd.png";
import checkBox from "@Assets/images/checkedbox.png";
import location from "@Assets/images/location.png";
import ucc from "@Assets/images/ucc-token-o.png";
import uncheckBox from "@Assets/images/uncheckedbox.png";
import close_icon from "@Assets/images/X.png";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import breakpoints from "@Theme/breakpoints";
import { contract } from "@Utils/contract";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import styled from "styled-components";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { colors } from "../../theme/colors";
import { AlignCenter, Token } from "../MyLand/StyledMyLand";
import List from "../MyLand/Tab/List";
import CountDown from "./CountDown";

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalBoxTest = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(59px);
  padding: 24px 32px;
  width: 606px;
  animation: fadein 0.2s linear forwards;
  transition: all 2s;
  transform: translate(0, 500px);

  @media ${breakpoints.xs} {
    width: 375px;
  }
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translate(0, 500px);
    }
    to {
      opacity: 1;
      transform: translate(0, 0px);
    }
  }
`;
export const OfferLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-left: -33px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
`;
export const TextHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${breakpoints.xs} {
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
  }
  p {
    padding-bottom: 20px;
  }
`;
export const ImgLeft = styled.img`
  height: 80px;
  width: 80px;
  /* width: 100%; */
  aspect-ratio: 1/1;
  object-fit: cover;
  margin-bottom: 26px;
`;
export const OfferLayoutLeft = styled.div`
  display: flex;
  justify-content: center;
  gap: 17px;
`;
export const OfferLayoutRight = styled.div``;
export const InfoDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0px;
  }
`;
export const InfoDetailEnd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 10px;
  p {
    margin: 0px;
  }
`;
export const InputOffer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${colors.primary};
  margin-bottom: 25px;
  & > p {
    margin: 14px 10px 0px 0px;
  }
`;
export const Input = styled.input`
  padding: 16px 12px;
  box-sizing: border-box;
  border: unset;
  font-size: 18px;
  font-family: "Open Sans";
  background-color: transparent;
  width: 100%;
  color: ${colors.accent};
  &:focus {
    border: none;
    outline: none;
  }
`;
export const EndModel = styled.div`
  display: flex;
  justify-content: left;
  gap: 3px;
  margin-top: 10px;
  p {
    margin: 0px;
  }
`;

export const OfferLayoutLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -57px;
`;

const ModelMarketOffer = ({ data = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [valueOffer, setValueOffer] = useState();
  const [checkedBox, setCheckedBox] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.account.isLogin);
  const [chooseBUSD, setChooseBUSD] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const onChange = (e) => {
    setValueOffer(e.target.value);
  };

  const onCheck = () => {
    setCheckedBox(!checkedBox);
  };
  const handleOffer = async () => {
    if (!isLogin) return dispatch(showNotificationError("Login first"));
    if (!checkedBox) return dispatch(showNotificationError("Accept Policy"));
    if (!valueOffer || valueOffer<1) return dispatch(showNotificationError("Invalid Input Price"));
    if (data.type === "holding")
      return dispatch(showNotificationError("Not Sale"));
    dispatch(loading());
    let unit;
    if (data.type === "holding")
      unit = chooseBUSD ? contract.BUSD_ADDRESS : contract.TOKEN_ADDRESS;
    // return;
    const time = Date.now();
    contract
      .sendOffer(
        data.id,
        data.type === "holding" ? unit : data.unit,
        ethers.utils.parseEther(valueOffer.toString()),
        Math.floor(time / 1000),
        Math.floor(data.endedSale)
      )
      .then(() => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Transaction success"));
        props.onCloseModal(true);
      })
      .catch((err) => {
        console.log(err);
        dispatch(unloading());
        dispatch(showNotificationError(err.message));
        props.onCloseModal(true);
      });
  };
  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() == data.unit) return "BUSD";
      else return "UCC";
    }
  };
  return (
    <>
      <ModalWrapper>
        <ModalBoxTest>
          <TextHeader>
            <Text type={"header2"} color={colors.text_header}>
              Make an offer
            </Text>
            <img
              src={close_icon}
              height="28px"
              style={{ cursor: "pointer" }}
              onClick={props.onCloseModal}
              alt=""
            />
          </TextHeader>
          <OfferLayout>
            <OfferLayoutLeft>
              <ImgLeft src={data.thumbnail} />
              {belowSM && (
                <OfferLayoutLeftContent>
                  <InfoDetail>
                    <Text type={"header2"} color={colors.text_header}>
                      {data.landCode}
                    </Text>
                  </InfoDetail>
                  <AlignCenter>
                    <img src={location} style={{ marginRight: "5px" }} alt="" />
                    <Text type={"body1"} color={colors.text_body}>
                      {data.location}
                    </Text>
                  </AlignCenter>
                </OfferLayoutLeftContent>
              )}
            </OfferLayoutLeft>
            <OfferLayoutRight>
              {!belowSM && (
                <>
                  <InfoDetail>
                    <Text type={"header2"} color={colors.text_header}>
                      {data.landCode}
                    </Text>
                  </InfoDetail>
                  <AlignCenter>
                    <img src={location} style={{ marginRight: "5px" }} alt="" />
                    <Text type={"body1"} color={colors.text_body}>
                      {data.location}
                    </Text>
                  </AlignCenter>
                </>
              )}
            </OfferLayoutRight>
          </OfferLayout>

          {data.type !== "holding" && (
            <>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                  Original New Land Value
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  {data.originalLandPrice} {CheckTypePrice(data)}
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                  Current Market Value
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  {data.currentMarketPrice} {CheckTypePrice(data)}
                </Text>
              </InfoDetail>
              <InfoDetailEnd>
                <Text type={"body3"} color={colors.text_header}>
                  Count down
                </Text>
                <Text type={"body3"} color={colors.text_header}>
                  Recent Bid
                </Text>
              </InfoDetailEnd>
              <InfoDetailEnd>
                <Text type={"header2"} color={colors.accent}>
                  <CountDown timeTillDate={data.endedSale} />
                </Text>
                <Text type={"header2"} color={colors.accent}>
                  {data.recentPrice}
                </Text>
              </InfoDetailEnd>
            </>
          )}
          <InputOffer>
            <Input placeholder="Input Price" onChange={onChange} />
            {data.unit ? (
              <>
                <Text color={colors.text_header} type={"header2"}>
                  {CheckTypePrice(data)}
                </Text>
              </>
            ) : (
              <>
                {chooseBUSD ? (
                  <Token
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                  >
                    <img width="24" height="24" src={busd} alt="busd" />
                    <Text color={colors.text_header} type={"header2"}>
                      BUSD
                    </Text>
                    <img width="20" height="20" src={arrow_down} alt="down" />
                  </Token>
                ) : (
                  <Token
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                  >
                    <img width="24" height="24" src={ucc} alt="busd" />
                    <Text color={colors.text_header} type={"header2"}>
                      UCC
                    </Text>
                    <img width="20" height="20" src={arrow_down} alt="down" />
                  </Token>
                )}
              </>
            )}

            {isShow && (
              <List setChooseBUSD={setChooseBUSD} setIsShow={setIsShow} />
            )}
          </InputOffer>
          <Button width={"100%"} color={colors.primary} onClick={handleOffer}>
            <Text type={"button"} color={colors.text_header}>
              OFFER
            </Text>
          </Button>
          <EndModel>
            <img
              width="16"
              height="16"
              src={!checkedBox ? uncheckBox : checkBox}
              alt="checked"
              onClick={onCheck}
            />
            <Text type="body2" color={colors.text_body}>
              By checking this box, I agree to Meta365’s Terms of Service
            </Text>
          </EndModel>
        </ModalBoxTest>
      </ModalWrapper>
    </>
  );
};
export default ModelMarketOffer;
