import React from "react";
import {
  ModalWrapperConfirm,
  ModalBoxConfirm,
  FlexModel,
  ButtonConfirm,
  CloseIcon,
} from "./StyledBlog";
import close_icon from "@Assets/images/X.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import Button from "../../components/Button";

const ModalConfirm = (props) => {
  return (
    <>
      <ModalWrapperConfirm>
        <ModalBoxConfirm>
          <FlexModel>
            <Text type="header" color={colors.text_header}>
              Delete Blog ?
            </Text>
                
            <CloseIcon onClick={() => { props.onCloseModal(false); props.setIsDeleteBlog(false); }}>
              <img
                width="10px"
                height="10px"
                src={close_icon}
                alt="close icon"
              />
            </CloseIcon>
          </FlexModel>
          <Text type="header2" color="#D95C74">
            {props.titleBlogDelete ? props.titleBlogDelete : ""}
          </Text>
          <ButtonConfirm>
            <Button
              width="100%"
              color={colors.primary}
              onClick={() => {
                props.onCloseModal(false);
                props.setIsDeleteBlog(true)
              }}
            >
              <Text type="body" color={colors.text_header}>
                Confirm
              </Text>
            </Button>
            <Button
              width="100%"
              color="#1D2852"
              onClick={() => {
                props.onCloseModal(false);
                props.setIsDeleteBlog(false);

              }}
            >
              <Text type="body" color={colors.primary}>
                Cancel
              </Text>
            </Button>
          </ButtonConfirm>
        </ModalBoxConfirm>
      </ModalWrapperConfirm>
    </>
  );
};
export default ModalConfirm;
