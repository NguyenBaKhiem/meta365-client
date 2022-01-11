import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const TableWrapper = styled.div`
  background: ${colors.second_bg};
  border-radius: 10px;
  width: 100%;
`;

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTable = styled.div`
  table {
    width: 100%;
  }
  th {
    background-color: ${colors.background};
    padding: 14px 18px;
    
    /* text-align: center; */
  }
  td {
    padding: 14px 18px;
    border-top: 1px solid rgba(192, 192, 192, 0.5);
    vertical-align: middle;
    @media ${breakpoints.sm} {
      vertical-align: middle;
    }
    @media ${breakpoints.xs} {
      padding: 14px 14px;

    }
    p {
      margin: 0;
    }
  }
  thead {
    @media ${breakpoints.sm} {
      display: none;
    }
  }
  .subitem {
    background-color: #222235;
    th,
    td {
      background-color: #222235;
    }
    thead {
      /* position: relative;
      display: block; */
      width: 100%;
      overflow-y: hidden;
      padding-bottom: 12px;
    }
    th {
      font-weight: 600;
      display: block;
      flex-basis: 100%;
      flex-grow: 2;
      padding-bottom: 12px;
      border-bottom: 0.5px solid #666565;
    }
    th,
    td {
      &:first-child {
        justify-content: left;
        text-align: left;
        @media ${breakpoints.sm}{
          display: block;
        }
      }
    }
    tbody {
      display: block;
      /* position: relative; */
      width: 100%;
      overflow-y: scroll;
      max-height: 260px;
    }
    td {
      border-top: 0.5px solid #666565;
      flex-basis: 100%;
      /* flex-grow: 2; */
      /* display: block; */
      /* overflow-wrap: anywhere; */
      display: flex;
      align-items: center;
    }
    tr {
      width: 100%;
      display: flex;
    }
  }
`;
export const TablePagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0;
  @media ${breakpoints.sm} {
    justify-content: center;
  }
`;
export const NavigationButton = styled.div`
  background: rgba(0, 182, 127, 0.1);
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.accent};
  }
  img {
    width: 24px;
    height: 24px;
  }
`;
export const Page = styled.div`
  font-size: 14px;
  color: ${colors.text_body};
  padding: 10px 14px;
  font-family: "Inter";
  font-weight: 500;
  cursor: pointer;
`;
