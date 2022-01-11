import close_icon from "@Assets/images/X.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import React from "react";
import Button from "../../components/Button";
import {
  BlockButton,
  CloseIcon,
  EditForm, ModalBox,
  ModalWrapper,
  TextCenter
} from "./StyledAdminAccount";

const BlockModal = ({ data = {}, onBlock, ...props }) => {
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <CloseIcon>
            <img src={close_icon} onClick={props.onCloseModal} alt="" />
          </CloseIcon>
          <TextCenter>
            <Text color={colors.text_header} type={"header2"}>
            Block User?
            </Text>
          </TextCenter>
          <EditForm>
            <Text color={colors.text_header} type={"body1"}>
              {data.public_address}
            </Text>
            <BlockButton style={{ marginTop: "16px" }}>
              <Button
                color={"rgba(225, 98, 110, 0.2)"}
                width={"100%"}
                onClick={(e) => {
                  e.preventDefault();
                  onBlock();
                }}
              >
                Agree 
              </Button>
            </BlockButton>
            <div style={{ marginTop: "16px" }}>
              <Button
                color={colors.primary}
                width={"100%"}
                onClick={props.onCloseModal}
              >
                Cancel
              </Button>
            </div>
          </EditForm>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default BlockModal;
