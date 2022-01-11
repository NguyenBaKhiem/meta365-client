import React, { useState, useLocation } from "react";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import {
  Flex,
  Grid,
  TextHeader,
  TextDetail,
  Button,
  TextCount,
  FlexCount,
} from "./StyledMyLand";
import CardDetail from "./Card";

const MyLandSelling = (props) => {
  const { data } = props;
  const belowSM = useMedia(breakpoints.sm);
  const [page, setPage] = useState(1);
  return (
    <Grid>
      {data &&
        data.map((item, index) => (
          <CardDetail key={index} buttonName="SELL" data={item} id={index} />
        ))}
    </Grid>
  );
};

export default MyLandSelling;
