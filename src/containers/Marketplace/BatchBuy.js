import busd from "@Assets/images/busd.png";
import icon_close from "@Assets/images/icon-close.png";
import ucc from "@Assets/images/ucc-token-o.png";
import cancel from "@Assets/images/X.png";
import Table from "@Components/Table";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationError, showNotificationSuccess
} from "@Redux/actions/notification";
import { contract } from "@Utils/contract";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Text from "../../components/Text";
import { colors } from "../../theme/colors";
import { ModalBoxTest, ModalWrapper, TextHeader } from "../MyLand/BatchSell";
import {
  MultipleTable
} from "../MyLand/StyledMyLand";
import { Button, Input, Label, SelectInput } from "../MyLand/Tab/StyleTab";
import { Price, TotalWrapper } from "./StyledMarketplace";

export const BoxMain = styled.div`
  background: #2c375b;
  box-shadow: inset 0px 4px 2px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
`;
const BatchBuy = (props) => {
  const { onCloseModal, selectedItem, handleDelete } = props;
  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  const [check, setCheck] = useState(false);
  const [totalUCC, setTotalUCC] = useState(0);
  const [totalBUSD, setTotalBUSD] = useState(0);
  const handleBatchBuy = async (nft) =>{
    if (!check)
      return dispatch(
        showNotificationError("Terms and conditions not accepted")
      );
      dispatch(loading());
      contract.batchBuy(nft.map(item=>item.id), account.ref).then(()=>{
        dispatch(showNotificationSuccess("Transaction success"));
        dispatch(unloading());
        onCloseModal()
        window.location.reload()
      }).catch((err)=>{
        dispatch(unloading());
        dispatch(showNotificationError(err.message));
      })
  }
  const CheckTypePrice = (data) => {
    if (data) {
      if (contract.BUSD_ADDRESS.toLowerCase() === data.unit) return "BUSD";
      else return "UCC";
    }
  };

  const totalPrice = () => {
    setTotalUCC(0);
    setTotalBUSD(0);
    for (let item of selectedItem) {
      if (CheckTypePrice(item) === "BUSD")
        setTotalBUSD((pre) => pre + item.currentMarketPrice);
      else setTotalUCC((pre) => pre + item.currentMarketPrice);
    }
  };

  useEffect(() => {
    totalPrice();
  }, [selectedItem]);

  return (
    <ModalWrapper>
      <ModalBoxTest>
          <TextHeader>
            <Text type={"header2"} color={colors.text_header}>
              Multiple Buy
            </Text>
            <div onClick={onCloseModal}>
              <img src={cancel} alt="" />
            </div>
          </TextHeader>
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
                <th style={{ textAlign: "center" }}>Price</th>
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
                  <td style={{ color: "#00B67F", textAlign: "center" }}>
                    {item.currentMarketPrice + " " + CheckTypePrice(item)}
                  </td>
                  <td style={{ textAlign: "right" }}>
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
        <TotalWrapper>
          <span>Total Price</span>
          <div>
            <Price>
              {totalUCC} UCC
              <img src={ucc} alt="" />
            </Price>
            <Price>
              {totalBUSD} BUSD <img src={busd} alt="" />
            </Price>
          </div>
        </TotalWrapper>
        <Button onClick={()=>handleBatchBuy(selectedItem)}>BUY</Button>
        <SelectInput>
          <Input type="checkbox" onClick={() => setCheck(!check)}></Input>
          <Label>
            {" "}
            By checking this box, I agree to Meta365’s Terms of Service
          </Label>
        </SelectInput>
      </ModalBoxTest>
    </ModalWrapper>
  );
};

export default BatchBuy;
