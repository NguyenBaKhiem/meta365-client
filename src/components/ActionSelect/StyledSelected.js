import styled from "styled-components";

export const SelectWrapper = styled.div`
    position: relative;
`;
export const OptionList = styled.div`
  position: absolute;
  right: 0%;
  top: 130%;
  background: #000000;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 5px 0;
  width: 85px;
  z-index: 1;
`;
export const Option = styled.div`
  text-align: center;
  padding: 8px 0;
  color: #4482e7;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: rgba(22, 108, 246, 0.2);
  }
`;
export const ShowIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;