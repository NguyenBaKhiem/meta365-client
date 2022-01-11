import React from "react";
import styled from "styled-components";

const StyledBadges = styled.span`
  border-radius: 4px;
  padding: 2px 4px;
  margin-left: 9px;
  font-size: 10px;
  font-family: Poppins;
  ${(props) => getType(props.type)}
`;

const getType = (type) => {
  switch (type) {
    case "draft":
    case "active":
      return `color: #17A2B8; background-color: rgba(23, 162, 184, 0.15);`;
    case "home":
    case "pending":
      return `color: #4B4DED; background-color: rgba(75, 77, 237, 0.15);`;
    case "hot":
    case "terminate":
      return `color: #ED4B9E; background-color:  rgba(237, 75, 158, 0.15);`;
    case "new":
    case "inactive":
      return `color: #0CCE5A; background-color:  rgba(12, 206, 90, 0.15);`;
    default:
      break;
  }
};

const Badges = (props) => {
  return <StyledBadges type={props.type}>{props.children}</StyledBadges>;
};

export default Badges;
