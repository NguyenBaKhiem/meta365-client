import React, { useEffect, useState } from "react";
import moment from "moment";
import { Detail, InfoDetail } from "./StyledMarketplace";
import { colors } from "@Theme/colors";
import Text from "@Components/Text";

const InfoDetails = (data) => {
  const [land,setLand] =useState();
  useEffect(()=>{
    setLand(data.data) ;
  },[data])
  const detail = [
    {
      title: "Created date",
      value: land ? moment(land.landCreatedAt).format("DD/MM/YYYY") : "",
    },
    {
      title: "Direction",
      value: land ? land.direction : "",
    },
    {
      title: "Area",
      value: land ? land.squares : "",
    },
    {
      title: "Map scale",
      value: land ? land.rate : "",
    },
    {
      title: "Issued on",
      value: land ? moment(land.ownershipCerDate).format("DD/MM/YYYY") : "",
    },
    {
      title: "Issuer",
      value: land ? land.ownershipCerProvider : "",
    },
    {
      title: "Legal document",
      value: land ? land.legal : "",
    },
  ];
  return (
    <Detail>
      <Text type={"header2"} color={colors.text_header}>
        Detail
      </Text>
      <br />
      {detail.map((item, index) => (
        <InfoDetail key={index}>
          <Text type={"body1"} color={colors.text_body}>
            {item.title}
          </Text>
          <div style={{ display: "inline-block", textAlign: "right" }}>
            <Text type={"body1"} color={colors.text_header}>
              {item.value}
            </Text>
          </div>
        </InfoDetail>
      ))}
    </Detail>
  );
};
export default InfoDetails;
