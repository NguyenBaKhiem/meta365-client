import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";

export const LeaderboardWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 120px;
    padding-top: 40px;
    @media ${breakpoints.sm} {
        padding-bottom: 80px;
    }
`;

export const TableWrapper = styled.div`
    padding: 32px;
    margin-top: 64px;
    border: 1px solid #C4C4C4;
    box-sizing: border-box;
    border-radius: 16px;
    @media ${breakpoints.sm} {
        padding: 24px 16px;
    }
    th, td{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    tbody{
        height: fit-content;
        overflow-y: hidden;
        padding: 0;
    }
`;
export const AlignCenter = styled.div`
    display: flex;
    align-items: center;
`;
export const ArrowIcon = styled.img`
    width: 24px;
    cursor: pointer;
`;

