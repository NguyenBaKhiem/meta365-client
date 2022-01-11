import arrow_down from "@Assets/images/arrow-down-img.png";
import busd from "@Assets/images/busd.png";
import icon_close from "@Assets/images/icon-close.png";
import ucc from "@Assets/images/ucc-token-o.png";
import cancel from "@Assets/images/X.png";
import Table from "@Components/Table";
import { contract } from "@Utils/contract";
import React, { useState } from "react";
import styled from "styled-components";
import Text from "../../components/Text";
import { colors } from "../../theme/colors";
import { ModalBoxTest, ModalWrapper, TextHeader } from "../MyLand/BatchSell";
import {
  InputGroup,
  MultipleTable,
  StyledInput,
  Token
} from "../MyLand/StyledMyLand";
import List from "../MyLand/Tab/List";
import { Button, Input, Label, SelectInput } from "../MyLand/Tab/StyleTab";

export const BoxMain = styled.div`
  background: #2c375b;
  box-shadow: inset 0px 4px 2px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
`;
const BatchOffer = (props) => {
  const { onCloseModal, selectedItem, handleDelete } = props;
  const [inputValue, setInputValue] = useState("");
  const [chooseBUSD, setChooseBUSD] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [check, setCheck] = useState(false);

  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() === data.unit) return "BUSD";
      else return "UCC";
    }
  };

  return (
    <ModalWrapper>
      <ModalBoxTest>
        <>
          <TextHeader>
            <Text type={"header2"} color={colors.text_header}>
              Multiple Offer
            </Text>
            <div onClick={onCloseModal}>
              <img src={cancel} alt="" />
            </div>
          </TextHeader>
        </>
        <h2>{selectedItem.length} NFT Selected </h2>
        <MultipleTable>
          <Table
            scroll={true}
            height={selectedItem && selectedItem.length > 0 ? "150px" : "0"}
          >
            <thead>
              <tr>
                <th>Land Code</th>
                <th>NFT ID</th>
                <th style={{textAlign:"center"}}>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              style={{
                overflowY: selectedItem.length === 0 && "auto",
                height: selectedItem.length === 0 && 0,
              }}
            >
              {selectedItem.map((item, index) => (
                <tr key={index}>
                  <td>{item.landCode}</td>
                  <td>{item.id}</td>
                  <td style={{color: "#00B67F", textAlign:"center"}}>{item.currentMarketPrice + " " + CheckTypePrice(item)}</td>
                  <td style={{textAlign:"right"}}>
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
        <Button>OFFER</Button>
        <SelectInput>
            <Input type="checkbox" onClick={() => setCheck(!check)}></Input>
            <Label> By checking this box, I agree to Meta365’s Terms of Service</Label>
        </SelectInput>
      </ModalBoxTest>
    </ModalWrapper>
  );
};

export default BatchOffer;
