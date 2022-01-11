import React from "react";
import { CardBody, CardContainer, CardImg } from "./StyledCard";

const Card = (props) => {
  return (
    <CardContainer>
      <CardImg src={props.image} />
      <CardBody>{props.children}</CardBody>
    </CardContainer>
  );
}

export default Card;
