import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const TableFilter = styled.div`
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(192, 192, 192, 0.5);
  border-radius: 10px 10px 0 0;
  background-color: ${colors.second_bg};
  @media ${breakpoints.sm} {
    flex-direction: column;
    padding: 0;
    gap: 12px;
    border: none;
    margin-bottom: 27px;
  }
`;
export const SearchGroup = styled.div`
  position: relative;
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
export const SearchInput = styled.input`
  width: 266px;
  padding: 10px 40px 10px 16px;
  background-color: ${colors.background};
  color: #d6d7e3;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
export const SearchIcon = styled.img`
  position: absolute;
  top: 9px;
  right: 4%;
`;
export const SelectGroup = styled.div`
  position: relative;
  width: 185px;
  @media ${breakpoints.sm} {
    width: 50%;
  }
`;
export const Selected = styled.div`
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background-color: ${colors.background};
  margin-right: 24px;
`;
export const SelectedAction = styled(Selected)`
  padding: 0;
  margin: 0;
  cursor: pointer;
  p {
    margin: 10px 16px;
  }
`;

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const FilterGroup = styled(AlignCenter)`
  @media ${breakpoints.sm} {
    width: 100%;
  }
`;
export const ApplyButton = styled.div`
  padding: 12px;
  background: ${colors.primary};
  border-radius: 0px 8px 8px 0px;
  color: ${colors.text_header};
  font-size: 12px;
  cursor: pointer;
`;

export const OptionList = styled.div`
  position: absolute;
  left: 0%;
  top: 130%;
  background: #000000;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 5px 0;
  width: 100%;
`;
export const Option = styled.div`
  padding: 8px 20px;
  color: #4482e7;
  cursor: pointer;
  &:hover {
    background: rgba(22, 108, 246, 0.2);
  }
`;