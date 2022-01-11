import home2 from "@Assets/images/home2.png";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React from "react";
import styled from "styled-components";
import Text from "@Components/Text";

const NewWayWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 170px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 100px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
  }
`;
const List = styled.li`
  list-style: none;
  font-size: 20px;
  font-family: "Open Sans";
  color: ${colors.text_body};
  position: relative;
  margin-bottom: 24px;
  &::before {
    content: "• ";
    color: ${colors.accent};
    font-size: 35px;
    position: absolute;
    top: -11px;
    left: -15px;
  }
`;
const NewWayContent = styled.div`
  transition: all 2s;
  opacity: 0;
  transform: translate(0, 100px);
  @media ${breakpoints.sm} {
    grid-row: 1;
  }
`;

const NewWay = () => {

  
  
  return (
    <>
      <NewWayWrapper>
        <div className="container">
          <Grid>
            <div>
              <img src={home2} alt="home" width="100%" />
            </div>
            <NewWayContent className="tab">
              <Text color={colors.text_header} type="header3">
                NFT - A new way to commercial real estate
              </Text>
              <ul>
                <List>Easy to trade and manage</List>
                <List>Publish procedures transparently</List>
                <List>Approachable to everyone</List>
                <List>
                  Simplify and minimize ownership and real estate investment
                </List>
                <List>Co-own or own multiple properties at the same time</List>
              </ul>
            </NewWayContent>
          </Grid>
        </div>
      </NewWayWrapper>
    </>
  );
};

export default NewWay;
