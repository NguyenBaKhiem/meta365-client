import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const PaginationContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 64px;
  @media ${breakpoints.sm} {
    margin-top: 32px;
  }
`;
export const NavigationButton = styled.button`
  background-color: transparent;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;
export const PaginationItem = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${colors.second_bg};
  border-radius: 8px;
  color: #f5f5f5;
  font-size: 16px;
  font-weight: 600;
`;
