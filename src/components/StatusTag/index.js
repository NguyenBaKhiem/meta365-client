import React, { useEffect, useState } from "react";
import styled from "styled-components";
import breakpoints from "@Theme/breakpoints";

const StyledStatusTag = styled.div`
  padding: 10px 30px;
  background: rgba(68, 216, 249, 0.1);
  border-radius: 20px;
  color: #44d8f9;
  font-size: 14px;
  line-height: 20px;
  width: fit-content;
  @media ${breakpoints.sm} {
    padding: 7px 12px;
    font-size: 12px;
    white-space: nowrap;
  }
`;
const StatusTag = (props) => {
  const [style, setStyle] = useState({});
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (props.status == "deleted" || props.status == "2") {
      setStatus("Deleted");
      setStyle({
        background: "rgba(198, 69, 77, 0.2)",
        color: "#C6454D",
      });
    }
    if (props.status == "public" || props.status == "1") {
      setStatus("Published");
      setStyle({
        background: "rgba(68, 216, 249, 0.2)",
        color: "#44D8F9",
      });
    }
    if (props.status == "private" || props.status == "3") {
      setStatus("Drafted");
      setStyle({
        background: "rgba(142, 142, 161, 0.2)",
        color: "#8E8EA1",
      });
    }
  }, [props]);

  return <StyledStatusTag style={style}>{status ? status : "Status tag"}</StyledStatusTag>;
};
export default StatusTag;
