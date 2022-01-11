import avatar from "@Assets/images/avatar.png";
import copy_icon from "@Assets/images/copy.png";
import close_icon from "@Assets/images/X.png";
import breakpoints from "@Theme/breakpoints";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMedia } from "react-use";
import { AlignCenter } from "../../components/AdminTable/StyledAdminTable";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { colors } from "../../theme/colors";
import EditorBlog from "./EditorBlog";
import {
  CopyIcon,
  Input,
  ModalBox,
  ModalHeader,
  ModalWrapper,
  ProfileInfo
} from "./StyledBlog";

const AddNewBlog = ({ onSave, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const account = useSelector((state) => state.account);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <ModalHeader>
            <Text color={colors.text_header} type={"header2"}>
              Create Post
            </Text>
            <img
              src={close_icon}
              height="14px"
              style={{ cursor: "pointer",position:"absolute",right:"0" }}
              onClick={() => {
                props.onCloseModal();
                if(title !== "" && content !== "") {
                    onSave({ title, content, status: "private" });
                } 
              }}
              alt=""
            />
          </ModalHeader>
          <ProfileInfo>
            <img src={avatar} alt=""/>
            <div>
              <Text color={colors.accent} type={"body1"}>
                {account.fullName}
              </Text>
              <AlignCenter>
                <Text color={colors.text_header} type={"body1"}>
                  {!belowSM
                    ? account.address
                    : account.address.slice(0, 5) +
                      "..." +
                      account.address.slice(account.address.length - 5)}
                </Text>
                <CopyIcon src={copy_icon} />
              </AlignCenter>
            </div>
          </ProfileInfo>
          <form>
            <Input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <EditorBlog
              onTyping={(value) => {
                setContent(value);
              }}
              data={content}
            />
            <Button
              width={"100%"}
              color={colors.primary}
              disabled={title === "" || content === "" ? true : false}
              onClick={(e) => {
                e.preventDefault();
                onSave({ title, content, status: "public" });
              }}
            >
              <Text
                style={{ margin: "0px" }}
                type={"body"}
                color={colors.text_header}
              >
                Post
              </Text>
            </Button>
          </form>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default AddNewBlog;
