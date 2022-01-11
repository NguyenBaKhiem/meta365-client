import React from "react";
import { colors } from "../../../theme/colors";
import { ConfirmModalContainer, ModalWrapper, StopTitle } from "./StyledVoting";
import { contract } from "@Utils/contract";
import {
  showNotificationSuccess,
  showNotificationError,
} from "@Redux/actions/notification";
import { useDispatch } from "react-redux";
import close_icon from "@Assets/images/close-modal.png";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { loading, unloading } from "@Redux/actions/loading";
const ConfirmModal = (props) => {
  const dispatch = useDispatch();

  const vote = (input) => {
    dispatch(loading());
    contract
      .vote(input)
      .then((res) => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Vote success"));
        props.onCloseModal("");
      })
      .catch((err) => {
        console.log(err);
        dispatch(unloading());
        dispatch(showNotificationError("Vote failed"));
        props.onCloseModal("");
      });
  };
  const protest = (input) => {
    dispatch(loading());

    contract
      .protest(input)
      .then((res) => {
        dispatch(unloading());

        dispatch(showNotificationSuccess("Protest success"));
        props.onCloseModal("");
      })
      .catch((err) => {
        dispatch(unloading());

        console.log(err);
        dispatch(showNotificationError("Protest failed"));
        props.onCloseModal("");
      });
  };
  return (
    <>
      <ModalWrapper>
        <ConfirmModalContainer>
          <div className="header">
            <div />
            <Text color={colors.text_header} type="subtitle">
              Voting
            </Text>
            <img
              src={close_icon}
              alt="close"
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.onCloseModal("");
              }}
            />
          </div>
          <StopTitle>
            {props.isAgree ? (
              <Text color={colors.accent} type="header2">
                Agree
              </Text>
            ) : (
              <Text color="#D95C74" type="header2">
                Disagree
              </Text>
            )}
          </StopTitle>
          {props.isAgree ? (
            <Button
              color={colors.new_primary}
              width="100%"
              onClick={() => {
                vote(props.data.delegate);
              }}
            >
              Confirm
            </Button>
          ) : (
            <Button
              color={colors.new_primary}
              width="100%"
              onClick={() => {
                protest(props.data.delegate);
              }}
            >
              Confirm
            </Button>
          )}
          <Button
            color={colors.background2}
            width="100%"
            onClick={() => {
              props.onCloseModal("voting");
            }}
          >
            Cancel
          </Button>
        </ConfirmModalContainer>
      </ModalWrapper>
    </>
  );
};

export default ConfirmModal;
