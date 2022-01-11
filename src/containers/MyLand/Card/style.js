import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const Badge = styled.div`
    position: absolute;
    width: 60px;
    height: 23.99px;
    right: 40px;
    top: 36px;
    background: linear-gradient(214.02deg, #4285F4 6.04%, #5B1AE4 92.95%);
    border-radius: 31.8992px;
    display:grid;
    place-content: center;
    & > span{
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #F6F9FF;
    }
`;

export const OnSale = styled.div`
    position: absolute;
    width: 70px;
    height: 30px;
    border-radius: 0px 40px 40px 0px;
    left: 20px;
    display:grid;
    place-content: center;
    top: 220px;
    background:  #00B67F;
    & > span{
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: #FFFFFF;
    }
`;

export const OffSale = styled.div`
    position: absolute;
    width: 70px;
    height: 30px;
    border-radius: 0px 40px 40px 0px;
    left: 20px;
    display:grid;
    place-content: center;
    top: 220px;
    background:  #C4C4C4;
    & > span{
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: black;
    }
`;

export const Title = styled.span`
    display: block;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #F5F5F5;
`;

export const Address = styled.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 8px 0;
    gap: 4px;
    & > span {
        display: block;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.01em;
        color: #C0C0C0;
    }
`;

export const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
    & > span{
        display: block;
        font-size: 14px;
        color: #C0C0C0;
    }
`;

export const Button = styled.button`
    border-radius: 12px;
    background-color: ${colors.primary};
    color: #ececec;
    border: none;
    padding: 9px 15px;
    cursor: pointer;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    font-weight: 600;
    width: 100%;
    margin: 16px 0;
    @media ${breakpoints.sm} {
        font-size: 16px;
    }
`;

