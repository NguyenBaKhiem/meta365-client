import React from "react";
import { ListAllItems, ListAllItem } from "./StyleTab";
import busd from "@Assets/images/busd.png";
import ucc from "@Assets/images/ucc-token-o.png";
import { colors } from "../../../theme/colors";
import Text from "@Components/Text";

const List = (props) => {
  return (
    <ListAllItems>
      <ListAllItem
        onClick={() => {
          props.setChooseBUSD(true); props.setIsShow(false);
        }}
      >
        <img height="20" src={busd} alt="" />
        <Text type={"body"} color={colors.text_header}>
          BUSD
        </Text>
      </ListAllItem>
      <ListAllItem
        onClick={() => {
          props.setChooseBUSD(false); props.setIsShow(false);
        }}
      >
        <img height="20" src={ucc} alt="" />
        <Text type={"body"} color={colors.text_header}>
          UCC
        </Text>
      </ListAllItem>
    </ListAllItems>
  );
};
export default List;
