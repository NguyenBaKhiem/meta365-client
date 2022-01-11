import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const MarketplaceWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 100px);
`;
export const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
  gap: 16px;
  @media ${breakpoints.sm} {
    justify-content: center;
  }
`;
export const MarketGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 24px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;
export const InfoDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0px;
  gap: 10px;

  p {
    margin: 0px;
  }
  @media ${breakpoints.sm} {
    /* flex-direction : column; */
  }
`;
export const InfoHeader = styled(InfoDetail)`
  border-bottom: 0.8px solid #646f9a;
  padding-bottom: 10px;
  margin-bottom: 6px;
`;
export const Amount = styled.div`
  border: 1px solid ${colors.accent};
  box-sizing: border-box;
  border-radius: 4px;
  padding: 2px 6px;
`;
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;