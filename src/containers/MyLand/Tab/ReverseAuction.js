import arrow_down from "@Assets/images/arrow-down-img.png";
import busd from "@Assets/images/busd.png";
import icon_close from "@Assets/images/icon-close.png";
import location from "@Assets/images/location.png";
import ucc from "@Assets/images/ucc-token-o.png";
import Table from "@Components/Table";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { contract } from "@Utils/contract";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Text from "../../../components/Text";
import { colors } from "../../../theme/colors";
import {
  AlignCenter,
  FormGroup,
  InputBox,
  InputGroup, MultipleTable, MultipleWrapper, StyledInput,
  Token
} from "../StyledMyLand";
import List from "./List";
import {
  Button, Input, Intro, Label, SelectInput, Value, Wrapper
} from "./StyleTab";


const ReverseAuction = ({ isMulti, handleDelete, ...props }) => {
  const navigate = useNavigate();
  const { data } = props;
  const [startingValue, setStartingValue] = useState("");
  const [endingValue, setEndingValue] = useState("");
  const [duration, setDuration] = useState("");
  const [check, setCheck] = useState(false);
  const [chooseBUSD, setChooseBUSD] = useState(true);
  const [isShowStart, setIsShowStart] = useState(false);
  const [isShowEnd, setIsShowEnd] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const getDuration = () => {
    return Date.parse(date + " " + duration);
  };

  const handleSell = async () => {
    const time = Date.now();

    const body = {
      nftId: data.id,
      saleType: "reverseAuction",
      saleData: {
        price: startingValue,
        endedSale: Math.floor(getDuration() / 1000),
        startSale: Math.floor(time / 1000),
        floor: endingValue,
      },
    };
    if (!check)
      return dispatch(
        showNotificationError("Terms and conditions not accepted")
      );
    if (!startingValue)
      return dispatch(showNotificationError("Invalid starting value"));
    if (!endingValue)
      return dispatch(showNotificationError("Invalid ending value"));
    if (startingValue === endingValue)
      return dispatch(
        showNotificationError(
          "Starting value must be greater than ending value"
        )
      );
    if (startingValue < endingValue)
      return dispatch(
        showNotificationError(
          "Starting value must be greater than ending value"
        )
      );
    if (!body.saleData.startSale || !body.saleData.endedSale)
      return dispatch(showNotificationError("Invalid date"));
    if (body.saleData.endedSale - body.saleData.startSale < 0)
      return dispatch(
        showNotificationError("Ending date must be greater than starting date")
      );
    dispatch(loading());
    contract
      .sellNFT(
        data.id,
        chooseBUSD ? contract.BUSD_ADDRESS : contract.TOKEN_ADDRESS,
        ethers.utils.parseEther(startingValue.toString()),
        ethers.utils.parseEther(endingValue.toString()),
        body.saleData.startSale,
        body.saleData.endedSale - body.saleData.startSale,
        false
      )
      .then(() => {
        dispatch(showNotificationSuccess("Transaction success"));
        dispatch(unloading());
        navigate("/my-land");
      })
      .catch((err) => {
        dispatch(unloading());
        console.log( err);
        dispatch(showNotificationError(err.message));
      });
  };
  const handleBatchSell = async () => {
    if (!startingValue || !endingValue)
      return dispatch(showNotificationError("Invalid input value"));
    if (!check)
      return dispatch(
        showNotificationError("Terms and conditions not accepted")
      );
    const time = Date.now();

    dispatch(loading());
    contract
      .batchSell(
        data.map((item) => item.id),
        chooseBUSD
          ? contract.BUSD_ADDRESS.toLowerCase()
          : contract.TOKEN_ADDRESS.toLowerCase(),
        ethers.utils.parseEther(startingValue.toString()),
        ethers.utils.parseEther(endingValue.toString()),
        Math.floor(time / 1000),
        Math.floor(getDuration() / 1000) - Math.floor(time / 1000),
        false,
        data.length
      )
      .then(() => {
        dispatch(showNotificationSuccess("Transaction success"));
        dispatch(unloading());
        navigate("/my-land");
        window.location.reload()
      })
      .catch((err) => {
        dispatch(unloading());
        console.log(err);
        dispatch(showNotificationError(err.message));
      });
  };
  return (
    <>
      <Wrapper>
        {isMulti ? (
          <MultipleWrapper>
            <h1>Multiple Sell</h1>
            <h2>{data.length} NFT Selected</h2>
            <MultipleTable>
              <Table
                scroll={true}
                height={data && data.length > 0 ? "150px" : "0"}
              >
                <thead>
                  <tr>
                    <th>Land Code</th>
                    <th>NFT ID</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    overflowY: data.length === 0 && "auto",
                    height: data.length === 0 && 0,
                  }}
                >
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.landCode}</td>
                      <td>{item.id}</td>
                      <td>
                        <img
                          src={icon_close}
                          onClick={() => handleDelete(item.id)}
                          alt="close"
                        ></img>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </MultipleTable>
          </MultipleWrapper>
        ) : (
          <>
            <Intro>
              <img src={data.images} alt="" />
              <div>
                <h1>{data.landCode}</h1>
                <div>
                  <img src={location} alt="" />
                  <span>{data.location}</span>
                </div>
              </div>
            </Intro>
            <Value>
              <h1>Original New Land Value</h1>
              <h2>{data.originalLandPrice} UCC</h2>
            </Value>
            <Value>
              <h1>Current Market Value</h1>
              <h2>{data.currentMarketPrice} UCC</h2>
            </Value>
          </>
        )}
        <InputBox>
          <Label style={{ width: "20%" }}>Start Price:</Label>
          <InputGroup>
            <StyledInput
              type="number"
              placeholder="0.00000"
              onChange={(e) => setStartingValue(e.target.value)}
            />
            {chooseBUSD ? (
              <Token
                onClick={() => {
                  setIsShowStart(!isShowStart);
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
                  setIsShowStart(!isShowStart);
                }}
              >
                <img width="24" height="24" src={ucc} alt="busd" />
                <Text color={colors.text_header} type={"header2"}>
                  UCC
                </Text>
                <img width="20" height="20" src={arrow_down} alt="down" />
              </Token>
            )}
            {isShowStart && (
              <List setChooseBUSD={setChooseBUSD} setIsShow={setIsShowStart} />
            )}
          </InputGroup>
        </InputBox>
        <InputBox>
          <Label style={{ width: "20%" }}>Ending Price:</Label>
          <InputGroup>
            <StyledInput
              type="number"
              placeholder="0.00000"
              onChange={(e) => setEndingValue(e.target.value)}
            />
            {chooseBUSD ? (
              <Token
                onClick={() => {
                  setIsShowEnd(!isShowEnd);
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
                  setIsShowEnd(!isShowEnd);
                }}
              >
                <img width="24" height="24" src={ucc} alt="busd" />
                <Text color={colors.text_header} type={"header2"}>
                  UCC
                </Text>
                <img width="20" height="20" src={arrow_down} alt="down" />
              </Token>
            )}
            {isShowEnd && (
              <List setChooseBUSD={setChooseBUSD} setIsShow={setIsShowEnd} />
            )}
          </InputGroup>
        </InputBox>
        <InputBox>
          <Label style={{ width: "20%" }}>Time Remaining:</Label>
          <AlignCenter className="flex">
            <FormGroup className="time">
              <input
                type="time"
                placeholder="Time"
                onChange={(e) => setDuration(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="date">
              <input
                type="date"
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
              />
            </FormGroup>
          </AlignCenter>
        </InputBox>
      </Wrapper>
      <Button onClick={() => (isMulti ? handleBatchSell() : handleSell())}>
        SELL
      </Button>
      <SelectInput>
        <Input type="checkbox" onClick={() => setCheck(!check)} />
        <Label>
          By checking this box, I agree to Meta365’s Terms of Service
        </Label>
      </SelectInput>
    </>
  );
};

export default ReverseAuction;
