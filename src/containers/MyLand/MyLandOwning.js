import React, { useState, useEffect } from "react";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import {
  Flex,
  Grid,
  TextHeader,
  TextDetail,
  Button,
  TextCount,
  FlexCount
} from "./StyledMyLand";
import house from "@Assets/images/house.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "@Components/Card";
import ModelSell from "./ModalSell";

const MyLandOwning = ({ data = [], ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [showModal, setShowModal] = useState(false);
  const [idItem, setIdItem] = useState(null);
  return (
    <Grid>
      {data.length > 0 &&
        data.map((item, index) => {
          return !belowSM ? (
            <Card image={item.land.thumbnail} key={index}>
              <Flex>
                <TextHeader>{item.land.landCode}</TextHeader>
                <Button
                  onClick={() => {
                    setShowModal(!showModal);
                    setIdItem(item._id);
                  }}
                >
                  SELL
                </Button>
              </Flex>
              <FlexCount>
                <TextDetail>{item.description}</TextDetail>
                <TextCount>{item.land.price} UCC</TextCount>
              </FlexCount>
            </Card>
          ) : (
            <Card image={item.land.thumbnail} key={index}>
              <Flex>
                <TextHeader>{item.land.landCode}</TextHeader>
                <TextDetail>Count</TextDetail>
                <TextCount>00:00:00</TextCount>
                <Button>{item.land.price} UCC</Button>
              </Flex>
            </Card>
          );
        })}

      {showModal && (
        <ModelSell
          id={idItem}
          onCloseModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </Grid>
  );
};

export default MyLandOwning;
