import Table from "@Components/Table";
import breakpoints from "@Theme/breakpoints";
import React from "react";
import { useMedia } from "react-use";
import styled from "styled-components";
import { colors } from "../../theme/colors";

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
  transition: 0.5s;
`;
export const ModalBoxTest = styled.div`
  border-radius: 16px;
  background-color: ${colors.second_bg};
  width: 70%;
  transition: 0.5s;

  @media ${breakpoints.xs} {
    width: 375px;
  }
`;

const ModelTableExpand = (props) => {
  return (
    <>
      <ModalWrapper>
        <ModalBoxTest>
          <Table
            onCloseTableExpand={props.onCloseTableExpand}
            expand={props.expand}
            title={props.title}
            fields={props.tableFields}
            data={props.tableData}
          />
        </ModalBoxTest>
      </ModalWrapper>
    </>
  );
};
export default ModelTableExpand;
