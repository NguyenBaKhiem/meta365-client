import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const TableWrapper = styled.div`
  /* border: 1px solid #c0c0c0; */
  box-sizing: border-box;
  border-radius: 16px;
  /* padding: 32px 24px; */
  @media ${breakpoints.sm} {
    ${(props) => props.scroll && "overflow-x: scroll;"}
    }};
  }
`;
export const TableTitle = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
`;
export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 10px;
  thead {
    position: relative;
    display: block;
    width: 100%;
    overflow-y: hidden;
    /* overflow-x: hidden; */
    padding-bottom: 12px;
  }
  th {
    display: block;
    flex-basis: 100%;
    flex-grow: 2;
    padding-bottom: 12px;
    font-family: Open Sans;
    @media ${breakpoints.xs} {
      ${(props) => props.scroll && "max-width: 250px;"}
    }
  }
  tbody {
    display: block;
    position: relative;
    width: 100%;
    overflow-y: scroll;
    ${(props) => (props.height ? `height: ${props.height}` : "height: 150px")};
    padding-right: 20px;
    @media ${breakpoints.xs} {
      height: 184px;
    }
  }
  td {
    padding: 12px 6px;
    border-top: 1px solid #c0c0c0;
    flex-basis: 100%;
    flex-grow: 2;
    display: block;
    overflow-wrap: anywhere;
    &:first-child {
      padding-left: 0px;
    }
    &:nth-child(3) {
      padding-left: 0px;
      p {
        color: ${colors.accent};
      }
    }
    &:last-child {
      padding-right: 0px;
    }
  }
  tr {
    width: 100%;
    display: flex;
  }
`;
export const Img = styled.img`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;
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
  width: 70%;
  transition: 0.5s;
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #c0c0c0;
  box-sizing: border-box;
  backdrop-filter: blur(93px);

  border-radius: 16px;

  @media ${breakpoints.xs} {
    width: 375px;
  }
`;
export const CloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CloseIconExpand = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
  p {
    margin-bottom: 10px;
  }
`;
