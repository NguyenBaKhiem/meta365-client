import copy_icon from "@Assets/images/copy.png";
import close_icon from "@Assets/images/X.png";
import Checkbox from "@Components/Checkbox";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import React, { useCallback, useState } from "react";
import { useMedia } from "react-use";
import Button from "../../components/Button";
import {
  AlignCenter,
  BlockButton,
  CloseIcon,
  CopyIcon,
  EditForm,
  FormGroup, ModalBox,
  ModalWrapper,
  TextCenter
} from "./StyledAdminAccount";

const EditAccount = ({ data = {}, onUpdate, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [role, setRole] = useState(data.role)
  const onChecked = (e) => {
    setRole(e)
  }

  const rendercheckBox = useCallback(()=>{
    return (
      <>
        {props.roles &&
          props.roles.map((item, index) => (
            <FormGroup key={index}>
              <AlignCenter>
                <Checkbox
                  checked={role === Object.keys(item)[0]}
                  onClick={() => onChecked(Object.keys(item)[0])}
                >
                  <Text color={colors.text_header} type={"body"}>
                    {Object.keys(item)[0] === "editCreator"
                      ? "Admin"
                      : Object.keys(item)[0]}
                  </Text>
                </Checkbox>
              </AlignCenter>
              <Text color={colors.primary} type={"body1"}>
                {Object.values(item)[0]}
              </Text>
            </FormGroup>
          ))}
      </>
    );
  },[role])
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <CloseIcon>
            <img src={close_icon} onClick={props.onCloseModal} alt="" />
          </CloseIcon>
          <TextCenter>
            <Text color={colors.text_header} type={"header2"}>
              {data.fullName ? data.fullName : "updating..."}
            </Text>
          </TextCenter>
          <TextCenter>
            <Text color={colors.text_header} type={"body1"}>
              {data.publ}
            </Text>
            <CopyIcon src={copy_icon} />
          </TextCenter>
          <EditForm>
            <Text color={"rgba(250, 252, 254, 0.75)"} type={"body1"}>
              Access
            </Text>
            {rendercheckBox()}
            <div style={{ marginTop: "24px" }}>
              <Button
                color={colors.primary}
                width={"100%"}
                onClick={(e) => {
                  e.preventDefault();
                  onUpdate({role: role});
                }}
              >
                save
              </Button>
            </div>
            {belowSM && (
              <BlockButton
                style={{ marginTop: "16px" }}
                onClick={props.isBlock}
              >
                <Button color={"rgba(225, 98, 110, 0.2)"} width={"100%"}>
                  BLOCK
                </Button>
              </BlockButton>
            )}
          </EditForm>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default EditAccount;
