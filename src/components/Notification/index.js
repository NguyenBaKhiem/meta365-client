import React, { useEffect } from "react";
import {
  Notice,
  NoticeTextHeader,
  NoticeTextContent,
  NoticeClose,
  NoticeCloseImage,
  NoticeText,
  Text,
} from "./StyledNotification";
import close from "../../assets/images/close-notice.png";
import success from "../../assets/images/success-notice.png";
import warning from "../../assets/images/warning-notice.png";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "@Redux/actions/notification";
const Notification = (props) => {
  let color;
  let srcImage;
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const { isShow, stateNotification, message } = notification;
  const onCloseNotification = () => {
    dispatch(hideNotification());
  };
  if (stateNotification === "Error") {
    color = "#DC3545";
    srcImage = close;
  }
  if (stateNotification === "Success") {
    color = "#28A745";
    srcImage = success;
  }
  if (stateNotification === "Warning") {
    color = "#FFC107";
    srcImage = warning;
  }
  useEffect(() => {
    setTimeout(setTimeNotice, 5000);
  }, []);
  const setTimeNotice = () => {
    dispatch(hideNotification());
  };
  return (
    <>
      <Notice color={color}>
        <NoticeClose>
          <NoticeCloseImage onClick={onCloseNotification}>
            <img src={srcImage} alt="Notice" />
          </NoticeCloseImage>
        </NoticeClose>
        <NoticeText>
          <NoticeTextHeader>
            <Text>{stateNotification} !</Text>
          </NoticeTextHeader>
          <NoticeTextContent>
            <Text>{message}</Text>
          </NoticeTextContent>
        </NoticeText>
      </Notice>
    </>
  );
};

export default Notification;
