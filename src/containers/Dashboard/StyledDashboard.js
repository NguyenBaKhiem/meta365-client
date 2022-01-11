import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const DashboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 120px;
`;
export const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px;
    margin: 28px 0 50px 0;
    @media ${breakpoints.sm} {
        grid-template-columns: 1fr;
        grid-gap: 16px;
    }
`;
export const InfoCard = styled.div`
    background-color: ${colors.third_bg};
    box-sizing: border-box;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 32px;
`;
export const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    display: none;
    @media ${breakpoints.sm} {
        display: flex;
    }
`;
export const SelectGroup = styled.div`
    position: relative;
    flex: 1 1 100%;
`;
export const Selected = styled.div`
    border: 1px solid;
    border-radius: 4px;
    font-size: 12px;
    color: ${colors.text_body};
    display: flex;
    justify-content: space-between;
    padding: 7px 12px;
    p{
        margin: 0;
    }
`;
export const OptionGroup = styled.div`
    background: #1E2027;
    box-shadow: 0px 8px 22px -6px rgba(91, 94, 101, 0.05), 0px 14px 64px -4px rgba(24, 39, 75, 0.05);
    border-radius: 4px;
    padding: 8px 0;
    position: absolute;
    top: 125%;
    left: 0%;
    width: 100%;
    z-index: 1;
`;
export const Option = styled.div`
    padding: 10px 16px;
    color: ${colors.text_body};
    font-size: 12px;

    &:hover{
        color: ${colors.text_header};
        background-color: ${colors.accent};
    }
`;
export const TableWrap = styled.div`
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 2px 4px 6px rgba(7, 12, 56, 0.1);
    backdrop-filter: blur(34px);
    border-radius: 16px;
    padding:32px 24px;
`;
export const NoData = styled.div`
  background: transparent;
  padding: 28px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 8px;
  }
`;
export const FlexButton = styled.div`
    display: flex;
    justify-content:center;
    margin-top: 40px;
    p{
        margin: 0;
    }
`;