import close_icon from "@Assets/images/X.png";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useState } from "react";
import { useMedia } from "react-use";
import expand_table from "../../assets/images/expand-table.png";
import Text from "../Text";
import {
  CloseIconExpand, Img, ModalBoxTest, ModalWrapper, StyledTable,
  TableTitle,
  TableWrapper
} from "./StyledTable";

const Table = (props) => {
  const belowSM = useMedia(breakpoints.sm);
  const [isExpand, setIsExpand] = useState(false);
  return (
    <>
      <TableWrapper scroll={props.scroll}>
        {props.title && (
          <TableTitle>
            <Text type={"header2"} color={colors.white}>
              {props.title}
            </Text>
            <div>
              {!belowSM && (
                <Img
                  src={expand_table}
                  alt="image expand/close table"
                  onClick={() => {
                    setIsExpand(true);
                  }}
                />
              )}
            </div>
          </TableTitle>
        )}
        <StyledTable scroll={props.scroll} height={props.height}>{props.children}</StyledTable>
        {isExpand && (
          <ModalWrapper>
            <ModalBoxTest>
           
              <CloseIconExpand>
                <Text type={"header2"} color={colors.white}>
                {props.title}
              </Text>
                <img height="24" src={close_icon} alt="close" onClick={() => {setIsExpand(false)}} />
              </CloseIconExpand>
              <StyledTable scroll={props.scroll}>{props.children}</StyledTable>
            </ModalBoxTest>
          </ModalWrapper>
        )}
      </TableWrapper>
    </>
  );
};

export default Table;
