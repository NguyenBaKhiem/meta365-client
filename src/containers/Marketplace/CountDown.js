import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  CountDownTime,
  FlexCountdown,
  CountdownDiv,
} from "./StyledMarketplace";

const CountDown = ({ timeTillDate = 0, timeTypeObject = false }) => {
  const [dateData, setDateData] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().valueOf();
      const duration = moment.duration(timeTillDate * 1000 - now, 'milliseconds');
      if (timeTillDate * 1000 - now < 0) {
        setDateData({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      } else {
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        setDateData({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeTillDate]);
  if (timeTypeObject) {
    return (
      <CountDownTime>
        <FlexCountdown>
          <CountdownDiv>{dateData ? dateData.days : "00"}</CountdownDiv>
          <div style={{ marginTop: "5px" }}>:</div>
          <CountdownDiv>{dateData ? dateData.hours : "00"}</CountdownDiv>
          <div style={{ marginTop: "5px" }}>:</div>
          <CountdownDiv>{dateData ? dateData.minutes : "00"}</CountdownDiv>
          <div style={{ marginTop: "5px" }}>:</div>
          <CountdownDiv>{dateData ? dateData.seconds : "00"}</CountdownDiv>
        </FlexCountdown>
      </CountDownTime>
    );
  } else {
    return `${dateData.days}:${dateData.hours}:${dateData.minutes}:${dateData.seconds}`;
  }
};

export default CountDown;
