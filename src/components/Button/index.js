import React from "react";
import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";

const StyledButton = styled.button`
  border-radius: 8px;
  background: ${(props) => (props.disabled ? "#1D2852" : props.color)};
  color: ${(props) => (props.disabled ? "rgba(118, 131, 182, 0.1)" : "#ececec")};
  border: ${(props) => (props.disabled ? "1px solid rgba(118, 131, 182, 0.5)" : "none")};
  padding: 9px 0px;
  cursor: pointer;
  font-size: 14px;
  line-height: 26px;
  width: ${(prop) => prop.width};
  text-align: center;
  font-weight: 600;
  &>*{
    ${(props) =>
      props.disabled ? "cursor: not-allowed !important;" : ""}
  }
  &:hover{
    ${(props) =>
      props.disabled ? "" : `box-shadow: 0px 0px 16px rgba(5, 100, 253, 0.8);`}
  }
    
  @media ${breakpoints.sm} {
    ${(props) => (props.mobile === "full" ? "width: 100%" : "")};
  }
`;
// size: sm, md

const Button = ({ disabled = false, ...props }) => {
  return (
    <StyledButton
      color={props.color}
      width={props.width}
      mobile={props.mobile}
      onClick={props.onClick}
      disabled={disabled}
      className={props.className}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
