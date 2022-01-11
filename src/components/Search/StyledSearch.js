import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  @media ${breakpoints.sm} {
    justify-content: space-between;
    width: 100%;
  }
`;
export const SearchInput = styled.input`
  color: ${colors.text_header};
  font-size: 14px;
  font-family: "Open Sans";
  letter-spacing: 0.01em;
  padding: 14px 60px 14px 10px;
  border-radius: 12px;
  border: none;
  background: #2c375b;
  width: 200px;
  &::placeholder {
    font-style: normal;
    font-family: "Open Sans";
  }
  &:focus {
    border: none;
    outline: none;
  }
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
export const GroupInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  background: #2c375b;
  border-radius: 10px;
  padding: 0px 10px 0px 20px;

  @media ${breakpoints.sm} {
    width: 90%;
  }
`;
export const Icon = styled.img`
  width: 16px;
  @media ${breakpoints.sm} {
    width: 16px;
    top: 14px;
  }
`;
export const SearchButton = styled.button`
  background-color: transparent;
  font-family: "Open Sans";
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  border-radius: 8px;
  padding: 12px 24px;
  gap: 20px;
  position: relative;
  @media ${breakpoints.sm} {
    width: fit-content;
    padding: 12px;
  }
`;
export const HideMobile = styled.div`
  @media ${breakpoints.sm} {
  }
`;
export const Img = styled.img`
  width: 20px;
`;
export const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  position: relative;
`;
export const SortText = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #f6f9ff;
  white-space: nowrap;
  margin: 0px;
  @media ${breakpoints.sm} {
    display: none;
  }
`;
export const SortSelect = styled.div`
  position: absolute;
  top: 140%;
  right: 0;
  background: rgba(38, 60, 107, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  width: 179px;
  z-index: 10;
`;
export const SortOption = styled.div`
  padding: 16px 24px;
  cursor: pointer;
  text-align: left;
  &:hover {
    background: rgba(66, 133, 244, 0.2);
  }
  p {
    margin: 0;
  }
`;
