import location from "@Assets/images/location.png";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError,
  showNotificationSuccess
} from "@Redux/actions/notification";
import { contract } from "@Utils/contract";
import { ethers } from "ethers";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Text from "../../../components/Text";
import { colors } from "../../../theme/colors";
import { InputGroup, StyledInput, Token } from "../StyledMyLand";
import {
  Button,
  Input,
  Intro,
  Label,
  SelectInput,
  Value,
  Wrapper
} from "./StyleTab";

const Market = ({ ...props }) => {
  const navigate = useNavigate();
  const { data } = props;
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  const handleSell = async () => {
    if (!inputValue || inputValue<1) 
      return dispatch(showNotificationError("Invalid input value"));
    if (!check)
      return dispatch(
        showNotificationError("Terms and conditions not accepted")
      );
    dispatch(loading());
    contract
      .updateOrder(data.id, ethers.utils.parseEther(inputValue.toString()))
      .then(() => {
        dispatch(showNotificationSuccess("Update success"));
        dispatch(unloading());
        navigate("/my-land");
      })
      .catch((err) => {
        dispatch(unloading());
        dispatch(showNotificationError(err.message));
      });
  };
  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() === data.unit) return "BUSD";
      else return "UCC";
    }
  };
  return (
    <>
      <Wrapper>
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
          <h2>{data.originalLandPrice} {CheckTypePrice(data)}</h2>
        </Value>
        <Value>
          <h1>Current Market Value</h1>
          <h2>{data.currentMarketPrice} {CheckTypePrice(data)}</h2>
        </Value>
        <div style={{ margin: "30px 0" }}>
          <InputGroup>
            <StyledInput
              type="number"
              placeholder="Input Price"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Token>
              <Text color={colors.text_header} type={"header2"}>
                {CheckTypePrice(data)}
              </Text>
            </Token>
          </InputGroup>
        </div>
      </Wrapper>
      <Button onClick={handleSell}>SELL</Button>
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
