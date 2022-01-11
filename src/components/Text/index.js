import React from "react";
import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";

const StyledText = styled.p`
  color: ${(props) => props.color};
  transition: .5s;
  text-overflow: ellipsis;
  ${(props) => getType(props.type)}
  ${(props) => props.customStyle}

`;
const getType = (type) => {
  if (type === "header1") {
    return `
      font-size: 36px;
      line-height: 54px;
      font-weight: 600;
      background: linear-gradient(180deg, #166CF6 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      @media ${breakpoints.xs} {
        line-height: 40px;
    }`;
  } else if (type === "header3") {
    return `
      font-size: 36px;
      line-height: 54px;
      font-weight: 600;
      margin-bottom: 32px;
      @media ${breakpoints.xs} {
        font-size: 24px;
        line-height: 30px;
      }
    `;
  } else if (type === "header2") {
    return `
      font-size: 24px;
      line-height: 32px;
      font-weight: 500;
      margin: 0;
    `;
  } 
  else if (type === "header-faq") {
    return `
    font-family: Poppins;
    font-size: 24px;
    line-height: 54px;
    font-weight: 500;
    margin-bottom: -12px;
    @media ${breakpoints.xs} {
      font-size: 24px;
      line-height: 30px;
    }
  `;
  }else if (type === "body") {
    return `
      font-size: 16px;
      line-height: 22px;
      font-family: Open Sans;
      @media ${breakpoints.xs} {
        font-size: 14px;
      }
    `;
  } else if (type === "body1") {
    return `
      font-size: 14px;
      line-height: 22px;
      font-family: 'Open Sans';
      margin: 0;
    `;
  } else if (type === "body2") {
    return `
      font-size: 12px;
      line-height: 16px;
      font-family: 'Open Sans';
      margin-bottom: 8px;
    `;
  } else if (type === "body3") {
    return `
      font-size: 18px;
      line-height: 24px;
      font-family: 'Open Sans';
      margin-bottom: 8px;
    `;
  }
  else if (type === "body-faq") {
    return `
      font-size: 18px;
      line-height: 24px;
      font-family: 'Open Sans';
      margin: 0px;
    `;
  } else if (type === "subtitle") {
    return `
      font-size: 20px;
      line-height: 28px;
      font-weight: 600;
    `;
  } else if (type === "button") {
    return `
      font-size: 18px;
      line-height: 26px;
      font-weight: 600;
      margin: 0;
      @media ${breakpoints.sm} {
        font-size: 14px;
      }
    `;
  }
};

export default Text = (props) => {
  return (
    <StyledText customStyle={props.customStyle}  color={props.color} type={props.type} className={props.className} style={props.style}>
      {props.children}
    </StyledText>
  );
};
