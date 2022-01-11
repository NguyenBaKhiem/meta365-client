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
  InputGroup, MultipleTable, MultipleWrapper, StyledInput,
  Token
} from "../StyledMyLand";
import List from "./List";
import {
  Button, Input, Intro, Label, SelectInput, Value, Wrapper
} from "./StyleTab";



const Market = ({ isMulti, handleDelete, ...props }) => {
  const navigate = useNavigate();
  const { data } = props;
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
  const [chooseBUSD, setChooseBUSD] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  const handleSell = async () => {
    if (!inputValue)
      return dispatch(showNotificationError("Invalid input value"));
    if (!check)
      return dispatch(
        showNotificationError("Terms and conditions not accepted")
      );
    const time = Date.now();
    dispatch(loading());
    const body = {
      nftId: data.id,
      saleType: "marketSale",
      saleData: {
        price: inputValue,
        endedSale: Math.floor(time / 1000),
        startSale: Math.floor(time / 1000),
        floor: inputValue,
      },
    };
    contract
      .sellNFT(
        data.id,
        chooseBUSD
          ? contract.BUSD_ADDRESS.toLowerCase()
          : contract.TOKEN_ADDRESS.toLowerCase(),
        ethers.utils.parseEther(inputValue.toString()),
        ethers.utils.parseEther(inputValue.toString()),
        body.saleData.startSale,
        0,
        true
      )
      .then(() => {
        dispatch(showNotificationSuccess("Transaction success"));
        dispatch(unloading());
        navigate("/my-land");
      })
      .catch((err) => {
        dispatch(unloading());
        dispatch(showNotificationError(err.message));
      });
  };
  const handleBatchSell = async () => {
    if (!inputValue)
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
        ethers.utils.parseEther(inputValue.toString()),
        ethers.utils.parseEther(inputValue.toString()),
        Math.floor(time / 1000),
        0,
        true,
        data.length
      )
      .then(() => {
        dispatch(showNotificationSuccess("Transaction success"));
        dispatch(unloading());
        window.location.reload()
        navigate("/my-land");
      })
      .catch((err) => {
        dispatch(unloading());
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
        <div style={{ margin: "30px 0" }}>
          <InputGroup>
            <StyledInput
              type="number"
              placeholder="Input Price"
              onChange={(e) => setInputValue(e.target.value)}
            />
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
            {isShow && (
              <List setChooseBUSD={setChooseBUSD} setIsShow={setIsShow} />
            )}
          </InputGroup>
        </div>
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

export default Market;
