import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 120px;
`;

export const ProfileLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 180px;
    @media ${breakpoints.sm} {
        grid-template-columns: 1fr;
        grid-gap: 0px;
    }
`;
export const ProfileForm = styled.form`
    margin-top: 45px;
`;
export const InputGroup = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 16px;
`;

export const Label = styled.span`
    display: block;
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    letter-spacing: 0.01em;
    margin-bottom: 10px;
    color: rgba(250, 252, 254, 0.5);
`;

export const Input = styled.input`
    padding: 14px 24px;
    font-size: 14px;
    font-family: 'Open Sans';
    color: ${colors.new_primary};
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid rgba(250, 252, 254, 0.75);
    width: 100%;
    &:focus{
        outline: none;
        border-color: ${colors.new_primary};
    }
`;
export const LogoImg = styled.div`
    @media ${breakpoints.sm} {
        display: none;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
`;